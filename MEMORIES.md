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
- 首页 Dashboard 顶部菜单样式已独立到 `src/frontend/src/components/dashboard/DashboardMenu.css.ts`，`Group` 根节点增加了分组容器皮肤和图标悬停反馈，后续首页菜单视觉调整优先改这里。
- 首页快速上手模块已下线。`DashboardWidgetLibrary.tsx` 移除了 `gstart` 内置卡片，`DashboardLayout.tsx` 默认示例布局仅保留 `news`，避免空仪表盘时再次出现快速上手区块。
- 主布局头部样式已升级。`src/frontend/src/main.css.ts` 新增了 Header 行、左右分组、消息区和导航按钮样式，`Header.tsx` 与 `NavHoverMenu.tsx` 已接入，当前 `main_layoutHeader` 采用圆角分区和高对比 Tabs 激活态。
- Header 配色已按 UI 约束去蓝紫化。`main.css.ts` 中 Header 暗色背景与 Tabs 激活态不再使用蓝紫渐变，当前为中性灰 + 琥珀方案，并统一右侧 ActionIcon 的中性色。
- `main.css.ts` 中 `Tabs` 文本样式必须用 `globalStyle(`${tabs} .mantine-Tabs-tabLabel`, ...)`，不能写在 `style({ selectors: { '& .child': ... } })`，否则 vanilla-extract 在 Vite HMR 会直接报 `Invalid selector` 覆盖层。
- `NewsWidget.tsx` 不能在 `Table.Tbody` 里直接放 `Alert`。空态必须包在 `Table.Tr > Table.Td` 里，否则 React 控制台会报 `tbody cannot contain div`。
- React Router 已在 `src/frontend/src/views/DesktopAppView.tsx` 的 `BrowserRouter` 启用 `future.v7_relativeSplatPath`，用于提前对齐 v7 的 splat 相对路径解析并消除对应 Future Flag 警告。
- React Router 已在 `src/frontend/src/views/DesktopAppView.tsx` 的 `BrowserRouter` 启用 `future.v7_startTransition`，用于提前对齐 v7 的 `React.startTransition` 更新调度并消除对应 Future Flag 警告。
- 简体中文术语已将“零件”统一替换为“货物”，覆盖 `src/frontend/src/locales/zh_Hans/messages.po` 与 `src/backend/InvenTree/locale/zh_Hans/LC_MESSAGES/django.po`；前端需执行 `yarn run compile` 生成最新 `messages.ts`。
- `InvenTreeTableHeader.tsx` 的 `activeFilters` 渲染循环必须提供 `key`，否则 React 19 会在控制台报 `Each child in a list should have a unique "key" prop`，当前已用 `active-filter-${filter.name}-${idx}` 修复。
- 货币名称显示逻辑已改到 `src/backend/InvenTree/common/currency.py` 的 `currency_display_name`。当前按请求语言动态调用 Babel 的 `get_currency_name`，简体中文界面会显示 `USD - 美元` 这类中文币种名称，失败时回退英文名。
- 全局组件统一样式入口定在 `src/frontend/src/styles/overrides.css`，覆盖 Input/Select/Combobox/Button/ActionIcon/Paper/Card/Modal/Tabs/Table/Notification。`src/frontend/src/theme.ts` 只保留稳定 defaultProps 和基础视觉参数，避免在 theme styles 里写伪类选择器引发 React 控制台 `Unsupported style property` 报警。
- 系统主配色已切换为 Santas Gray 调色板。14 阶色值定义在 `src/frontend/src/styles/overrides.css` 的 `:root` 变量，`theme.ts` 与 `main.css.ts` 已改为优先消费这些变量，后续视觉迭代按这套色阶推进。
- `src/frontend/src/contexts/ThemeContext.tsx` 已将 `primaryColor` 固定为 `santasGray`，避免用户本地主题色把全局配色拉回蓝色，确保 Santas Gray 方案在实际界面稳定生效。
- `InvenTreeTable` 默认 `minHeight` 已从 300 提升到 460（`src/frontend/src/tables/InvenTreeTable.tsx`），用于提升 PanelGroup 场景下的有效内容高度，减少大面积空白观感。
- QC 工作流的 `web_ui` job 会在 `invoke update` 中执行 `compilemessages`，该链路依赖 `msgfmt`。`apt-dependency` 需要包含 `gettext`，否则会报 `Can't find msgfmt` 并在 `Environment Setup` 失败。当前已在 `.github/workflows/qc_checks.yaml` 补齐 `gettext`。
- About 模态框的链接区已下线。`src/frontend/src/components/modals/AboutInvenTreeModal.tsx` 不再渲染 `Links` 标题和外链表格，`fillTable` 也已移除仅供链接区使用的 `alwaysLink` 分支。
- 登录页 `SplashScreen` 仍需兼容后端自定义开屏配置。`server.customize.splash` 现在会通过 `generateUrl` 注入到容器 `backgroundImage`，以保持 `INVENTREE_CUSTOM_SPLASH` 链路和 Playwright customization 用例可用。
