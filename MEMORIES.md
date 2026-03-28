# MEMORIES.md

记录项目长期有效的自定义改动与协作记忆，避免知识随会话丢失。

## 2026-03-28
- 新增项目级协作协议文件 `AGENTS.md`，明确需求先登记待办、完成后勾选、长期改动要沉淀。
- 新增任务追踪文件 `PLANS.md`，采用 `TODO / IN_PROGRESS / DONE` 流转，并使用可勾选任务格式。
- 约定后续所有自定义改动在完成后都要补写到本文件，保留可复用结论与关键决策。
- `prod` 已整合登录页样式升级，登录页背景不再依赖后端 `customize.splash` 图片链路，改为前端 `AuthLayout.css.ts` 提供的深色渐变背景和品牌卡片布局。
- `prod` 目前只保留英文和简体中文。前端 locale 目录只剩 `en` 与 `zh_Hans`，后端 locale 目录只剩 `en` 与 `zh_Hans`，`.linguirc` 和后端 `LOCALES` 已同步收敛。
- 前端语言归一化逻辑已经兼容 `zh_Hans`、`zh-hans`、`zh`、`zh_cn`，旧用户如果本地或资料里残留其他语言码，会自动回退到英文。
- 已手工整合 `d22158e6b3`、`ac1ecf30f8`、`a3fc1b1cfd` 的有效内容到 `prod`，避免直接 cherry-pick 与当前语言收敛改动互相覆盖。
- 本轮仓库提交为 `48c09232d5 feat!: refresh auth ui and restrict locale support`，随后已与远端 `fork/prod` 合并到 `717a538847` 并推送。
- `prod` 的 Mantine `Select` 通用样式已集中到 `src/frontend/src/theme.ts`，通过 `ThemeContext` 合并用户主题时一并带入，后续下拉框外观优先改这里。
- 登录页语言切换已从内联展开改为 `Popover` 弹层，弹层皮肤定义在 `src/frontend/src/pages/Auth/AuthLayout.css.ts`，避免再次出现虚线框和布局抖动。
- 新增语言下拉空状态文案 `No languages found`，英文与简体中文词条已同步到 `src/frontend/src/locales/en/messages.po` 和 `src/frontend/src/locales/zh_Hans/messages.po`。
- 登录页主题样式已升级为亮暗双模式。`src/frontend/src/pages/Auth/AuthLayout.css.ts` 通过 `vars.lightSelector / vars.darkSelector` 分支控制背景、品牌区、卡片和弹层皮肤，并补充了登录表单字段的亮暗模式覆盖。
- 登录页浅色模式可读性问题已修正。`AuthLayout.css.ts` 不再依赖 `createVar` 做登录输入框换肤，改成按 `[data-mantine-color-scheme='light'|'dark']` 的 `globalStyle` 明确覆盖 label、input、placeholder 和输入区图标颜色，避免出现浅色界面下灰底灰字。
- 全局字体已统一为中文友好栈，入口在 `src/frontend/src/theme.ts`，当前正文与标题统一使用以 `Noto Sans SC` 为首的字体链。
- 品牌文案已收敛为 `库存管理系统`。前端入口标题、登录品牌名、导航/关于文案、插件提示与后端 `INVENTREE_INSTANCE` 默认值、`InfoView.server` 返回值、OpenAPI 标题已同步替换；对历史值 `InvenTree` 与 `InvenTree Demo` 分别保留兼容映射到 `库存管理系统` 和 `库存管理系统演示`。
