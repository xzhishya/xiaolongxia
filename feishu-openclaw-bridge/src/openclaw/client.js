import crypto from 'node:crypto';

function fakeSessionKey(conversationKey) {
  return `feishu-${crypto.createHash('md5').update(conversationKey).digest('hex').slice(0, 12)}`;
}

export function createOpenClawClient() {
  return {
    async sendUserMessage({ conversationKey, existingSessionKey, text, meta }) {
      // TODO: 在这里接入 OpenClaw 的真实会话 / 发送消息 API。
      console.log('[openclaw.sendUserMessage]', {
        conversationKey,
        existingSessionKey,
        text,
        meta,
      });

      return {
        sessionKey: existingSessionKey || fakeSessionKey(conversationKey),
        text: `桥接骨架已收到你的消息：${text}\n\n下一步需要把 src/openclaw/client.js 接到真实的 OpenClaw 接口上。`,
      };
    },
  };
}
