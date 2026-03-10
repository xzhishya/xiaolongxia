import dotenv from 'dotenv';

dotenv.config();

function splitCsv(value) {
  return String(value || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

export const config = {
  port: Number(process.env.PORT || 8787),
  logLevel: process.env.LOG_LEVEL || 'info',
  feishu: {
    appId: process.env.FEISHU_APP_ID || '',
    appSecret: process.env.FEISHU_APP_SECRET || '',
    verificationToken: process.env.FEISHU_VERIFICATION_TOKEN || '',
    encryptKey: process.env.FEISHU_ENCRYPT_KEY || '',
    allowOpenIds: splitCsv(process.env.ALLOW_OPEN_IDS),
    allowChatIds: splitCsv(process.env.ALLOW_CHAT_IDS),
    defaultChannel: process.env.DEFAULT_CHANNEL || 'feishu',
  },
  openclaw: {
    baseUrl: process.env.OPENCLAW_BASE_URL || 'http://127.0.0.1:18789',
    gatewayToken: process.env.OPENCLAW_GATEWAY_TOKEN || '',
  },
};

export function assertConfig() {
  const missing = [];
  if (!config.feishu.appId) missing.push('FEISHU_APP_ID');
  if (!config.feishu.appSecret) missing.push('FEISHU_APP_SECRET');
  if (!config.feishu.verificationToken) missing.push('FEISHU_VERIFICATION_TOKEN');
  if (!config.openclaw.gatewayToken) missing.push('OPENCLAW_GATEWAY_TOKEN');
  return missing;
}
