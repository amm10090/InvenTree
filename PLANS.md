# PLANS.md

用于记录当前 work tree 的任务流转。新需求先进入 `TODO`，执行时进入 `IN_PROGRESS`，完成后进入 `DONE` 并勾选。

## TODO

## IN_PROGRESS

## DONE
- [x] 2026-03-28 统一系统字体并将品牌名替换为库存管理系统
  - 完成时间：2026-03-28
  - 验收结果：全局字体已切换到以 `Noto Sans SC` 为首的中文友好字体栈；登录页、页面标题、关于弹窗、导航文案、插件提示、后端默认实例名与信息接口已改为 `库存管理系统`
  - 关联文件：`src/frontend/src/theme.ts`、`src/frontend/index.html`、`src/frontend/src/pages/Auth/Layout.tsx`、`src/frontend/src/hooks/UseInstanceName.tsx`、`src/frontend/src/components/nav/PageTitle.tsx`、`src/frontend/src/defaults/defaultHostList.tsx`、`src/frontend/src/defaults/actions.tsx`、`src/frontend/src/defaults/links.tsx`、`src/frontend/src/components/nav/MainMenu.tsx`、`src/frontend/src/components/dashboard/DashboardWidgetLibrary.tsx`、`src/frontend/src/pages/Index/Settings/AdminCenter/PluginManagementPanel.tsx`、`src/frontend/src/components/items/InvenTreeLogo.tsx`、`src/frontend/src/components/modals/AboutInvenTreeModal.tsx`、`src/backend/InvenTree/common/setting/system.py`、`src/backend/InvenTree/InvenTree/version.py`、`src/backend/InvenTree/InvenTree/urls.py`、`src/backend/InvenTree/InvenTree/api.py`、`src/backend/InvenTree/InvenTree/setting/spectacular.py`、`src/backend/InvenTree/InvenTree/test_api.py`
  - 验证方式：`cd src/frontend && ./node_modules/.bin/tsc --noEmit`、`yarn run extract`、`yarn run compile`、`yarn run build` 通过
- [x] 2026-03-28 修复登录页浅色模式输入框与标签可读性问题
  - 完成时间：2026-03-28
  - 验收结果：浅色模式下登录表单标签、输入框背景、边框、占位符与图标颜色已切到浅色高对比方案，不再出现灰底灰字
  - 关联文件：`src/frontend/src/pages/Auth/AuthLayout.css.ts`
  - 验证方式：`cd src/frontend && ./node_modules/.bin/tsc --noEmit` 通过
- [x] 2026-03-28 修复登录页未适配亮色模式的问题
  - 完成时间：2026-03-28
  - 验收结果：登录页背景、品牌区、登录卡片、输入框和语言弹层已按 Mantine `light/dark` 颜色模式分支渲染，不再固定深色
  - 关联文件：`src/frontend/src/pages/Auth/AuthLayout.css.ts`
  - 验证方式：`cd src/frontend && ./node_modules/.bin/tsc --noEmit` 通过
- [x] 2026-03-28 优化登录页语言切换与 Mantine Select 通用下拉框样式
  - 完成时间：2026-03-28
  - 验收结果：登录页语言切换改为弹层选择；Mantine Select 统一了圆角、边框、阴影、悬停、聚焦和下拉面板样式；新增文案已完成中英词条更新
  - 关联文件：`src/frontend/src/theme.ts`、`src/frontend/src/contexts/ThemeContext.tsx`、`src/frontend/src/components/items/LanguageSelect.tsx`、`src/frontend/src/components/items/LanguageToggle.tsx`、`src/frontend/src/pages/Auth/AuthLayout.css.ts`、`src/frontend/src/locales/en/messages.po`、`src/frontend/src/locales/zh_Hans/messages.po`
  - 验证方式：`cd src/frontend && ./node_modules/.bin/tsc --noEmit`、`yarn run extract`、`yarn run compile`、`yarn run build` 通过
- [x] 2026-03-28 建立项目级记忆与待办机制（AGENTS.md / PLANS.md / MEMORIES.md）
  - 完成时间：2026-03-28
  - 验收结果：已创建并落地三份项目级协作文档
  - 关联文件：`AGENTS.md`、`PLANS.md`、`MEMORIES.md`
- [x] 2026-03-28 整合 prod 登录页样式与中英双语收敛
  - 完成时间：2026-03-28
  - 验收结果：`http://localhost:5173/web/login` 已切到新的 auth 渐变背景和品牌头；前后端语言支持已收敛到英文与简体中文；构建通过
  - 关联提交：`48c09232d5`、`717a538847`
  - 关联文件：`src/frontend/src/pages/Auth/AuthLayout.css.ts`、`src/frontend/src/pages/Auth/Layout.tsx`、`src/frontend/src/components/SplashScreen.tsx`、`src/frontend/src/components/forms/AuthFormOptions.tsx`、`src/frontend/src/components/forms/AuthenticationForm.tsx`、`src/frontend/src/components/items/InvenTreeLogo.tsx`、`src/frontend/src/contexts/LanguageContext.tsx`、`src/frontend/.linguirc`、`src/backend/InvenTree/InvenTree/setting/locales.py`
  - 验证方式：`yarn run extract && yarn run compile && yarn run build` 通过；webmcp 页面复查通过
