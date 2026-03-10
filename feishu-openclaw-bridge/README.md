# Feishu ↔ OpenClaw Bridge (MVP)

一个最小可用的飞书桥接骨架：

- 接收飞书事件回调
- 处理 URL challenge
- 文本消息去重
- 私聊 / 群聊会话映射
- 调用 OpenClaw 适配层（当前为占位实现）
- 将回复发回飞书（当前为日志占位）

## 当前状态

这是 **MVP 骨架**，已经把核心结构搭好，但为了避免瞎接不存在的 API，以下部分先保留为适配层占位：

- `src/openclaw/client.js`：把消息送进 OpenClaw 的具体实现
- `src/feishu/client.js`：把消息回发到飞书的具体 API 调用
- `src/feishu/verify.js`：飞书签名/加密校验（当前先保留基础占位）

## 目录结构

```text
src/
  index.js
  config.js
  feishu/
    client.js
    parser.js
    verify.js
    webhook.js
  logic/
    router.js
    trigger.js
  openclaw/
    client.js
  store/
    sqlite.js
```

## 本地启动

```bash
cd feishu-openclaw-bridge
copy .env.example .env
npm install
npm run dev
```

默认监听：`http://127.0.0.1:8787`

## 推荐联调顺序

1. 在飞书开放平台创建自建应用 / 机器人
2. 开启事件订阅
3. 把回调地址指向：
   - `POST /webhook/feishu`
4. 先完成 challenge 校验
5. 再打通“接收消息 → OpenClaw → 回复飞书”

## 飞书侧建议先开通的能力

- 接收消息事件
- 发送消息
- 群聊中被 @ 时触发
- 读取必要的基础身份字段

## MVP 规则

- 私聊：默认转发
- 群聊：仅在 `@机器人` 或 `/ai ` 前缀时转发
- 一人一个会话；一群一个会话
- 使用 SQLite 保存会话映射和去重信息

## 下一步你要填的内容

### 1. `.env`

至少填：

- `FEISHU_APP_ID`
- `FEISHU_APP_SECRET`
- `FEISHU_VERIFICATION_TOKEN`
- `OPENCLAW_GATEWAY_TOKEN`

### 2. `src/feishu/client.js`

补上：

- 获取 tenant_access_token
- 调用飞书消息发送 API

### 3. `src/openclaw/client.js`

补上：

- 如何为某个飞书会话创建 / 复用 OpenClaw session
- 如何把消息发送给 OpenClaw
- 如何取回最终回复

## 说明

当前这版重点是把桥接工程的“骨架和边界”先固定住，避免后面结构混乱。你如果愿意，我下一步可以继续把：

1. 飞书 API 客户端补全
2. OpenClaw 对接层补全
3. 再给你一份飞书开放平台配置清单
