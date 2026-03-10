import crypto from 'node:crypto';
import { config } from '../config.js';

export function verifyChallenge(body) {
  if (body?.type === 'url_verification' && body?.challenge) {
    return { challenge: body.challenge };
  }
  return null;
}

export function verifyBasicToken(body) {
  if (!config.feishu.verificationToken) return true;
  const token = body?.token;
  return !token || token === config.feishu.verificationToken;
}

export function verifySignaturePlaceholder(_req) {
  // TODO: 接入飞书正式签名校验 / 加密解密逻辑。
  // 这里先留占位，避免误实现。
  return true;
}

export function decryptIfNeeded(body) {
  // TODO: 若启用 encryptKey，在这里完成解密。
  return body;
}

export function stableHash(input) {
  return crypto.createHash('sha256').update(String(input)).digest('hex');
}
