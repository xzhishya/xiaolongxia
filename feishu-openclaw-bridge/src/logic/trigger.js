export function shouldTrigger(parsed) {
  const text = parsed.text || '';

  if (parsed.chatType === 'p2p') {
    return { ok: true, reason: 'private-chat' };
  }

  const hasCommandPrefix = text.startsWith('/ai ');
  const hasMention = Array.isArray(parsed.mentions) && parsed.mentions.length > 0;

  if (hasCommandPrefix || hasMention) {
    return { ok: true, reason: hasCommandPrefix ? 'prefix' : 'mention' };
  }

  return { ok: false, reason: 'ignored-group-message' };
}

export function normalizePrompt(parsed) {
  return (parsed.text || '').replace(/^\/ai\s+/i, '').trim();
}
