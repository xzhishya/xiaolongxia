import express from 'express';
import { config, assertConfig } from './config.js';
import { createDb } from './store/sqlite.js';
import { createFeishuWebhookRouter } from './feishu/webhook.js';

const app = express();
const db = createDb();
const missing = assertConfig();

app.use(express.json({ limit: '1mb' }));
app.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'feishu-openclaw-bridge' });
});

app.use('/webhook/feishu', createFeishuWebhookRouter({ db }));

app.listen(config.port, '127.0.0.1', () => {
  console.log(`[bridge] listening on http://127.0.0.1:${config.port}`);
  if (missing.length) {
    console.warn(`[bridge] missing env: ${missing.join(', ')}`);
  }
});
