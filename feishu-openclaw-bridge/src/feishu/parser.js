export function parseIncomingEvent(body) {
  const event = body?.event || {};
  const sender = event?.sender || {};
  const message = event?.message || {};
  let text = '';

  try {
    const content = JSON.parse(message.content || '{}');
    text = content.text || '';
  } catch {
    text = '';
  }

  return {
    eventId: body?.header?.event_id || body?.event_id || null,
    eventType: body?.header?.event_type || body?.event_type || null,
    chatType: message.chat_type || null,
    chatId: message.chat_id || null,
    messageId: message.message_id || null,
    text: String(text || '').trim(),
    mentions: message.mentions || [],
    senderOpenId: sender?.sender_id?.open_id || null,
    senderUserId: sender?.sender_id?.user_id || null,
  };
}
