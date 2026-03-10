# 飞书开放平台配置清单

## 1. 创建应用

在飞书开放平台创建一个自建应用（企业内使用最方便）。

你需要记录：
- App ID
- App Secret
- Verification Token
- Encrypt Key（如果启用事件加密）

把它们填进 `.env`。

## 2. 机器人能力

确保应用具备机器人消息能力，至少要能：
- 接收消息事件
- 发送文本消息
- 在群聊中被 @ 时工作

## 3. 事件订阅

事件回调 URL 指向：

```text
https://你的域名/webhook/feishu
```

如果本机联调，可先用内网穿透工具临时暴露一个 HTTPS 地址。

## 4. challenge 校验

飞书首次配置事件订阅时，会发 challenge 请求。
当前骨架已支持基础 challenge 回包。

## 5. 事件范围建议

MVP 只先开消息相关事件即可。
不要一开始全开，免得噪音太多。

## 6. 群聊触发规则

当前代码默认：
- 私聊：直接触发
- 群聊：`@机器人` 或 `/ai ` 前缀时触发

## 7. 安全建议

- OpenClaw 网关继续保持 `127.0.0.1` 访问，不要直接暴露公网
- 对 webhook 做签名校验
- 初期建议加用户 / 群白名单
- 飞书凭证不要提交到 git

## 8. 联调顺序

1. 填 `.env`
2. `npm install`
3. `npm run dev`
4. 用飞书事件订阅完成 challenge
5. 发送一条私聊消息测试 webhook 是否进来了
6. 再补全 `src/feishu/client.js`
7. 再补全 `src/openclaw/client.js`
