# 下一步实施清单

## 已完成

- [x] 建立桥接项目结构
- [x] 建立飞书 webhook 路由
- [x] 建立 SQLite 会话映射与去重表
- [x] 建立群聊/私聊触发规则
- [x] 建立 OpenClaw 适配层占位
- [x] 建立飞书发送消息适配层占位

## 待完成

### P0：先跑通
- [ ] 复制 `.env.example` 为 `.env`
- [ ] 填写飞书应用凭证
- [ ] 安装依赖：`npm install`
- [ ] 本地启动：`npm run dev`
- [ ] 暴露 HTTPS webhook 地址给飞书
- [ ] 完成 challenge 验证

### P1：飞书发送能力
- [ ] 在 `src/feishu/client.js` 中实现 tenant_access_token 获取
- [ ] 实现发送文本消息
- [ ] 优先支持“回复原消息”或“发到对应 chat_id”

### P1：OpenClaw 对接能力
- [ ] 在 `src/openclaw/client.js` 中确认可用接口
- [ ] 建立“飞书会话 ↔ OpenClaw session”稳定映射
- [ ] 实现发送消息并获取回复

### P2：补强安全与稳态
- [ ] 飞书签名校验
- [ ] 如启用加密，补全 decrypt
- [ ] 白名单控制
- [ ] 更完整日志
- [ ] 错误重试策略

### P3：增强能力
- [ ] 图片消息
- [ ] 文件消息
- [ ] 流式回复
- [ ] 群聊更细粒度触发规则
