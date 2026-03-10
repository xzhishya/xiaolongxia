import { shouldTrigger, normalizePrompt } from './trigger.js';

function buildConversationKey(parsed) {
  if (parsed.chatType === 'p2p') return `im:p2p:${parsed.senderOpenId}`;
  return `im:group:${parsed.chatId}`;
}

export async function routeMessage({ db, parsed, openclawClient, feishuClient }) {
  const trigger = shouldTrigger(parsed);
  if (!trigger.ok) {
    return { handled: false, reason: trigger.reason };
  }

  const prompt = normalizePrompt(parsed);
  if (!prompt) {
    return { handled: false, reason: 'empty-prompt' };
  }

  const conversationKey = buildConversationKey(parsed);
  const session = db.getSession(conversationKey);
  const response = await openclawClient.sendUserMessage({
    conversationKey,
    existingSessionKey: session?.session_key || null,
    text: prompt,
    meta: {
      source: 'feishu',
      chatType: parsed.chatType,
      senderOpenId: parsed.senderOpenId,
      chatId: parsed.chatId,
      messageId: parsed.messageId,
    },
  });

  if (response.sessionKey) {
    db.setSession({
      key: conversationKey,
      sessionKey: response.sessionKey,
      chatType: parsed.chatType,
      userOpenId: parsed.senderOpenId,
      chatId: parsed.chatId,
    });
  }

  await feishuClient.replyText({
    parsed,
    text: response.text || '收到，但 OpenClaw 适配层还没返回正式文本。',
  });

  return { handled: true, reason: trigger.reason, sessionKey: response.sessionKey || null };
}
