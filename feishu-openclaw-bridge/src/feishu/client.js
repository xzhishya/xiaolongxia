export function createFeishuClient() {
  return {
    async replyText({ parsed, text }) {
      // TODO: 接入飞书发送消息 API。
      console.log('[feishu.replyText]', {
        chatId: parsed.chatId,
        messageId: parsed.messageId,
        text,
      });
    },
  };
}
