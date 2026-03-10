import express from 'express';
import { verifyBasicToken, verifyChallenge, verifySignaturePlaceholder, decryptIfNeeded } from './verify.js';
import { parseIncomingEvent } from './parser.js';
import { createFeishuClient } from './client.js';
import { createOpenClawClient } from '../openclaw/client.js';
import { routeMessage } from '../logic/router.js';

export function createFeishuWebhookRouter({ db }) {
  const router = express.Router();
  const feishuClient = createFeishuClient();
  const openclawClient = createOpenClawClient();

  router.post('/', async (req, res) => {
    try {
      if (!verifySignaturePlaceholder(req)) {
        return res.status(401).json({ ok: false, error: 'invalid-signature' });
      }

      const challenge = verifyChallenge(req.body);
      if (challenge) {
        return res.json(challenge);
      }

      const body = decryptIfNeeded(req.body);
      if (!verifyBasicToken(body)) {
        return res.status(401).json({ ok: false, error: 'invalid-token' });
      }

      const parsed = parseIncomingEvent(body);
      if (!parsed.eventId) {
        return res.json({ ok: true, ignored: 'missing-event-id' });
      }

      if (db.hasProcessedEvent(parsed.eventId)) {
        return res.json({ ok: true, ignored: 'duplicate-event' });
      }

      db.markProcessedEvent(parsed.eventId);
      const result = await routeMessage({ db, parsed, openclawClient, feishuClient });
      return res.json({ ok: true, result });
    } catch (error) {
      console.error('[feishu.webhook.error]', error);
      return res.status(500).json({ ok: false, error: error.message || 'internal-error' });
    }
  });

  return router;
}
