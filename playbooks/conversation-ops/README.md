# Conversation Ops - 执行版

这套执行版用于规范销售、售前、项目推进过程中的每一次沟通资料采集、归档、整理与复盘。

## 目标

每次沟通尽量沉淀以下材料：

1. `meta.md` - 基本元信息
2. `transcript.txt` - 纯文字稿
3. `minutes.md` - 会议纪要
4. `raw-audio.*` - 原始录音（条件允许时）
5. `attachments/` - 相关附件

## 标准目录

按客户 / 项目 / 日期会议 存档：

```text
conversation-data/
  客户名/
    项目名/
      2026-03-09-需求沟通会/
        meta.md
        transcript.txt
        minutes.md
        raw-audio.mp3
        customer-needs.md
        risk-review.md
        team-observation.md
        next-step-plan.md
        attachments/
```

## 每次沟通后的标准动作

### 10 分钟内
- 建立会议目录
- 补齐 `meta.md`
- 保存 `transcript.txt`
- 保存原始录音
- 收集附件

### 30 分钟内
- 生成 `minutes.md`
- 生成人员、风险、需求、下步计划四个分析文件
- 更新项目级总台账

## 命名规则

### 会议目录名

格式：

`YYYY-MM-DD-会议类型`

例如：
- `2026-03-09-需求沟通会`
- `2026-03-10-项目周例会`
- `2026-03-12-投标答疑会`

### 文件固定名

- `meta.md`
- `transcript.txt`
- `minutes.md`
- `raw-audio.mp3` / `raw-audio.m4a` / `raw-audio.wav`
- `customer-needs.md`
- `risk-review.md`
- `team-observation.md`
- `next-step-plan.md`

## 项目级汇总文件

每个项目建议固定维护：

- `project-master-actions.md`
- `risk-register.md`
- `customer-demand-history.md`
- `weekly-exec-report.md`

## 推荐使用方式

- 单场整理：优先使用 `meeting-action-items`
- 周度汇总：优先使用 `weekly-status-report`
- RFP/需求文档：优先使用 `rfp-solution-analyzer`

## 执行纪律

- 没有全文稿时，也要保留尽可能完整的要点记录
- 没有确认的信息标 `TBD` 或 `待确认`
- 不要把猜测写成结论
- 对客户承诺必须单独标记
- 行动项必须带负责人和时间，没有就标缺失
