# MEMORIES.md

记录项目长期有效的自定义改动与协作记忆，避免知识随会话丢失。

## 2026-03-28
- 2026-04-01 已在 `merge/upstream-2026-04-01` 完成一次正式上游同步，合并提交是 `2a148504aa`。这次先把协作记录提交到 `prod`，再创建 `backup/prod-2026-04-01` 分支和 `backup-prod-2026-04-01` 标签，然后执行 `git merge origin/master`。后续若继续同步上游，可以沿用这组备份命名方式。
- 2026-04-01 这次上游合并的主要冲突集中在三类。第一类是前后端多语言目录，当前策略仍然是只保留 `en` 和 `zh_Hans`，其余 locale 继续删除。第二类是品牌与主题定制，`translateHostName` 继续兼容 `InvenTree Demo -> 库存管理系统演示`，上游新引入的蓝色状态色需要改回 `earth`。第三类是前端文案目录，优先保留现有中文定制，再执行 `yarn extract` 和 `yarn compile` 重新生成 catalog，避免手工改 `.po` 后引用行号漂移。
- 2026-04-01 已确认当前仓库远程分工是 `origin -> 官方 InvenTree`、`fork -> 自有仓库`。后续同步上游时，不要在脏工作区直接拉取。标准做法是先处理 `PLANS.md`、`MEMORIES.md` 这类未提交改动，再给 `prod` 打本地备份分支或 tag，基于 `prod` 切一个临时集成分支，把 `origin/master` 合并进来，解决冲突并验证后再回推 `fork/prod`。这样能完整保留自定义提交历史，也方便回滚。
- README 社交徽章区不再保留 `chaos.social/@InvenTree` 这个失效 Mastodon 外链。2026-03-29 的 `Style [Documentation]` 失败已确认根因就是它，当前直接移除以保证 markdown-link-check 稳定通过。
- 2026-03-28 的 UI 收敛已将前端主主题从冷灰 Santas Gray 调整为暖中性色 `earth`。入口在 `src/frontend/src/theme.ts` 与 `src/frontend/src/styles/overrides.css`，`ThemeContext` 不再消费用户自定义 `whiteColor` / `blackColor`，避免个人主题把系统重新拉回蓝紫或高对比失控状态。
- `StylishText` 已改为纯色强调文本，不再使用渐变；登录页 `src/frontend/src/pages/Auth/AuthLayout.css.ts` 也已移除全部渐变背景，改成暖中性色平面层次。
- 用户设置页的结构入口已重做。`SettingsHeader` 新增独立样式文件 `src/frontend/src/components/nav/SettingsHeader.css.ts`，`PanelGroup` 在 `src/frontend/src/components/panels/PanelGroup.tsx` / `PanelGroup.css.ts` 中改成左侧导航卡 + 右侧内容卡的布局，移动端自动纵向堆叠。
- `src/frontend/src/pages/Index/Settings/AccountSettings/UserThemePanel.tsx` 已下线高亮色、白色、黑色自由配色控件，只保留语言、亮暗模式、圆角和加载器，避免用户再次把界面改回蓝紫混色。
- 设置项列表视觉入口改在 `src/frontend/src/components/settings/SettingItem.tsx` 与 `SettingList.tsx`，当前为卡片化设置行；账户详情与显示设置卡片样式集中在 `src/frontend/src/pages/Index/Settings/AccountSettings/AccountSettings.css.ts`。
- 前端业务 UI 中显式蓝紫硬编码已在 `src/frontend/src` 清零。`src/frontend/src/defaults/backendMappings.tsx` 的 `info/primary` 已改为 `earth`，`src/frontend/src/components/charts/colors.tsx` 的默认图表色板也已改成暖色序列，其余 SVG 图标颜色统一改用 `var(--ui-accent)`。
- README、文档示例和文档样式也已同步去蓝紫。`docs/docs/stylesheets/extra.css`、`bootstrap.css`、`neoteroi-mkdocs.css` 已换成暖中性方案，README 的蓝色部署徽标也已替换。仓库里若继续搜索到冷色关键词，当前仅剩第三方 vendored 文件 `docs/docs/javascripts/mermaid.min.js` 和 `src/backend/InvenTree/InvenTree/static/tabler-icons/icons.json` 的上游内部数据。
- 登录页图片背景已再次禁用。`d503818ff8ccf316d7e07a7a6c6d23787482805d` 这次登录页重构本来已去掉对 `customize.splash` 的依赖，但后续 `ea806da4a3` 为了 QC 自定义 splash 断言把图片背景接回了 `src/frontend/src/components/SplashScreen.tsx`。当前已撤回这段逻辑，认证页固定走前端主题背景。
- 新增项目级协作协议文件 `AGENTS.md`，明确需求先登记待办、完成后勾选、长期改动要沉淀。
- 新增任务追踪文件 `PLANS.md`，采用 `TODO / IN_PROGRESS / DONE` 流转，并使用可勾选任务格式。
- 约定后续所有自定义改动在完成后都要补写到本文件，保留可复用结论与关键决策。
- `prod` 目前只保留英文和简体中文。前端 locale 目录只剩 `en` 与 `zh_Hans`，后端 locale 目录只剩 `en` 与 `zh_Hans`，`.linguirc` 和后端 `LOCALES` 已同步收敛。
- 前端语言归一化逻辑已经兼容 `zh_Hans`、`zh-hans`、`zh`、`zh_cn`，旧用户如果本地或资料里残留其他语言码，会自动回退到英文。
- 已手工整合 `d22158e6b3`、`ac1ecf30f8`、`a3fc1b1cfd` 的有效内容到 `prod`，避免直接 cherry-pick 与当前语言收敛改动互相覆盖。
- 本轮仓库提交为 `48c09232d5 feat!: refresh auth ui and restrict locale support`，随后已与远端 `fork/prod` 合并到 `717a538847` 并推送。
- `prod` 的 Mantine `Select` 通用样式已集中到 `src/frontend/src/theme.ts`，通过 `ThemeContext` 合并用户主题时一并带入，后续下拉框外观优先改这里。
- 登录页语言切换已从内联展开改为 `Popover` 弹层，弹层皮肤定义在 `src/frontend/src/pages/Auth/AuthLayout.css.ts`，避免再次出现虚线框和布局抖动。
- 新增语言下拉空状态文案 `No languages found`，英文与简体中文词条已同步到 `src/frontend/src/locales/en/messages.po` 和 `src/frontend/src/locales/zh_Hans/messages.po`。
- 登录页浅色模式可读性问题已修正。`AuthLayout.css.ts` 不再依赖 `createVar` 做登录输入框换肤，改成按 `[data-mantine-color-scheme='light'|'dark']` 的 `globalStyle` 明确覆盖 label、input、placeholder 和输入区图标颜色，避免出现浅色界面下灰底灰字。
- 全局字体已统一为中文友好栈，入口在 `src/frontend/src/theme.ts`，当前正文与标题统一使用以 `Noto Sans SC` 为首的字体链。
- 品牌文案已收敛为 `库存管理系统`。前端入口标题、登录品牌名、导航/关于文案、插件提示与后端 `INVENTREE_INSTANCE` 默认值、`InfoView.server` 返回值、OpenAPI 标题已同步替换；对历史值 `InvenTree` 与 `InvenTree Demo` 分别保留兼容映射到 `库存管理系统` 和 `库存管理系统演示`。
- 首页 Dashboard 顶部菜单样式已独立到 `src/frontend/src/components/dashboard/DashboardMenu.css.ts`，`Group` 根节点增加了分组容器皮肤和图标悬停反馈，后续首页菜单视觉调整优先改这里。
- 首页快速上手模块已下线。`DashboardWidgetLibrary.tsx` 移除了 `gstart` 内置卡片，`DashboardLayout.tsx` 默认示例布局仅保留 `news`，避免空仪表盘时再次出现快速上手区块。
- 主布局头部样式已升级。`src/frontend/src/main.css.ts` 新增了 Header 行、左右分组、消息区和导航按钮样式，`Header.tsx` 与 `NavHoverMenu.tsx` 已接入，当前 `main_layoutHeader` 采用圆角分区和高对比 Tabs 激活态。
- `main.css.ts` 中 `Tabs` 文本样式必须用 `globalStyle(`${tabs} .mantine-Tabs-tabLabel`, ...)`，不能写在 `style({ selectors: { '& .child': ... } })`，否则 vanilla-extract 在 Vite HMR 会直接报 `Invalid selector` 覆盖层。
- `NewsWidget.tsx` 不能在 `Table.Tbody` 里直接放 `Alert`。空态必须包在 `Table.Tr > Table.Td` 里，否则 React 控制台会报 `tbody cannot contain div`。
- React Router 已在 `src/frontend/src/views/DesktopAppView.tsx` 的 `BrowserRouter` 启用 `future.v7_relativeSplatPath`，用于提前对齐 v7 的 splat 相对路径解析并消除对应 Future Flag 警告。
- React Router 已在 `src/frontend/src/views/DesktopAppView.tsx` 的 `BrowserRouter` 启用 `future.v7_startTransition`，用于提前对齐 v7 的 `React.startTransition` 更新调度并消除对应 Future Flag 警告。
- 简体中文术语已将“零件”统一替换为“货物”，覆盖 `src/frontend/src/locales/zh_Hans/messages.po` 与 `src/backend/InvenTree/locale/zh_Hans/LC_MESSAGES/django.po`；前端需执行 `yarn run compile` 生成最新 `messages.ts`。
- `InvenTreeTableHeader.tsx` 的 `activeFilters` 渲染循环必须提供 `key`，否则 React 19 会在控制台报 `Each child in a list should have a unique "key" prop`，当前已用 `active-filter-${filter.name}-${idx}` 修复。
- 货币名称显示逻辑已改到 `src/backend/InvenTree/common/currency.py` 的 `currency_display_name`。当前按请求语言动态调用 Babel 的 `get_currency_name`，简体中文界面会显示 `USD - 美元` 这类中文币种名称，失败时回退英文名。
- 全局组件统一样式入口定在 `src/frontend/src/styles/overrides.css`，覆盖 Input/Select/Combobox/Button/ActionIcon/Paper/Card/Modal/Tabs/Table/Notification。`src/frontend/src/theme.ts` 只保留稳定 defaultProps 和基础视觉参数，避免在 theme styles 里写伪类选择器引发 React 控制台 `Unsupported style property` 报警。
- `InvenTreeTable` 默认 `minHeight` 已从 300 提升到 460（`src/frontend/src/tables/InvenTreeTable.tsx`），用于提升 PanelGroup 场景下的有效内容高度，减少大面积空白观感。
- QC 工作流的 `web_ui` job 会在 `invoke update` 中执行 `compilemessages`，该链路依赖 `msgfmt`。`apt-dependency` 需要包含 `gettext`，否则会报 `Can't find msgfmt` 并在 `Environment Setup` 失败。当前已在 `.github/workflows/qc_checks.yaml` 补齐 `gettext`。
- About 模态框的链接区已下线。`src/frontend/src/components/modals/AboutInvenTreeModal.tsx` 不再渲染 `Links` 标题和外链表格，`fillTable` 也已移除仅供链接区使用的 `alwaysLink` 分支。
- 登录页 `SplashScreen` 仍需兼容后端自定义开屏配置。`server.customize.splash` 现在会通过 `generateUrl` 注入到容器 `backgroundImage`，以保持 `INVENTREE_CUSTOM_SPLASH` 链路和 Playwright customization 用例可用。
- `QC` 的 `Tests - Web UI`（job `68995000444`）在 `Run Playwright tests` 被 60 分钟上限取消，根因不是环境启动失败，而是分叉仓库已改动 UI 契约（品牌文案改中文、移除 `Documentation/About` 入口等）后，仍沿用上游 `pui_*` 用例断言旧文案与旧入口，导致重试和等待时间累积。后续只要继续保留这些定制，就要同步维护 `src/frontend/tests/pui_*.spec.ts` 的断言，或在 workflow 中把 fork 专属不兼容用例拆分/跳过并设置 `--max-failures` 以避免再次跑满超时。
- `src/frontend/tests/pui_modals.spec.ts` 与 `src/frontend/tests/pui_login.spec.ts` 已改为品牌兼容断言（`InvenTree/库存管理系统`）并适配新导航分组（`Navigation/Settings/Actions`）。`web_ui` job 同步把 `timeout-minutes` 从 `60` 提升到 `90`，并在双浏览器执行参数追加 `--max-failures=10`，避免断言漂移时整轮 CI 长时间空耗到超时。

- 本机 devcontainer 栈若直接执行 `docker compose -p inventree-prod-dev_devcontainer -f .devcontainer/docker-compose.yml up -d inventree`，`inventree` 容器会因 `ENTRYPOINT ./init.sh` 未收到命令参数而 `Exited (129)`；需要额外覆写启动命令。
- 已验证可用的重建与拉起流程是先 `git pull --ff-only fork prod`，再执行 `docker compose -p inventree-prod-dev_devcontainer -f .devcontainer/docker-compose.yml up -d --build --force-recreate inventree`，随后用临时 override 覆写 `entrypoint=/bin/sh -c` 与 `command=while sleep 1000; do :; done` 让 devcontainer 服务保持 `Up`。

- 主机环境存在 `HTTP_PROXY=http://127.0.0.1:7890` 时，直接访问 `http://localhost:8000` 可能被本地代理转发并返回 `502`；本地排查建议使用 `http://127.0.0.1:8000` 并确保代理绕过本地地址（`NO_PROXY`）。
- devcontainer 容器重建后要恢复 Web 访问，需要在容器内执行 `invoke update` 后再启动 `invoke dev.server --address 0.0.0.0:8000`。
- `Fork Deploy GCE` 若在 `Deploy over IAP SSH` 失败并出现 `failed to extract layer ... no space left on device`，根因通常是实例磁盘 `/mnt/docker-data` 被 `containerd` 镜像快照占满。2026-03-28 实测该实例 `containerd` 占用约 `28G/30G`，同时触发 `inventree-db` 因 `No space left on device` 重启和站点 `502`。排查优先看 `gh run view <run_id> --job <job_id> --log`、实例内 `df -h /mnt/docker-data`、`docker system df`、`docker logs inventree2-inventree-db-1`。
- `.github/scripts/deploy_inventree_remote.sh` 部署前会固定执行 `docker image prune -af` 与 `docker builder prune -af` 清理历史镜像和构建缓存，不再依赖空间阈值触发。清理后仍会校验可用空间是否低于 `MIN_FREE_GB`（默认 `6GiB`），不足则中止部署并报错。
- `src/frontend/src/components/nav/NavigationDrawer.tsx` 已移除抽屉底部 `Documentation` 和 `About` 分组，移动端侧边抽屉仅保留 Navigation、Settings、Actions 和可选 Plugins 区块。
- 首页 `News Updates` 组件已从前端组件库移除。`DashboardWidgetLibrary.tsx` 不再注册 `news`，`DashboardLayout.tsx` 默认示例布局也清空了 `news`，因此首页不会再显示最新消息区块。
- 线上实例 `instance-20260310-032343` 当前规格是 `e2-small`（2 vCPU / 2GB RAM）。当同机并行运行 InvenTree、Vaultwarden、x-ui 等多组容器时，容易出现长期高 CPU + 内存压力。2026-03-28 的观测中，`compute.googleapis.com/instance/cpu/utilization` 在约 20 分钟内维持 `0.82~0.98`，并伴随 `snapd.service` watchdog/timeout 循环、`systemd-resolved` 报 `Under memory pressure`、Docker 健康检查超时。该类现象优先按资源瓶颈处理，而不是先判断为磁盘打满。
- 2026-03-29 已在线上实例 `instance-20260310-032343` 下线 x-ui。可复用做法是临时写入 `startup-script` 执行 `systemctl disable --now x-ui`，重启实例后在串口日志确认 `is-enabled => disabled` 与 `is-active => inactive`，最后移除该 `startup-script` 元数据。这个流程适合 SSH 不可用时做一次性远程运维收敛。
- 2026-03-29 已恢复 `instance-20260310-032343` 的 IAP SSH。可复用做法是给实例加 `iap-ssh` tag，创建 `allow-iap-ssh` 允许 `35.235.240.0/20` 访问 tcp:22，再加 `deny-public-ssh-iap-only` 拒绝公网直接打 22；若实例仍在握手阶段掉线，可临时写入 `startup-script` 执行 `systemctl restart ssh.service` 并重启实例，再从串口确认 `sshd` 已监听。
- 2026-03-29 已下线并清空 `instance-20260310-032343` 上的 InvenTree 部署。当前 `/mnt/docker-data` 下已不再保留 `inventree`、`inventree-data`、`inventree-src` 目录，`inventree2_*` 容器和 `inventree2_default` 网络也已移除。若后续要重新上线，需要重新准备 compose 目录与持久化数据。
- 仓库里的 `Fork Deploy GCE` 工作流当前状态是 `disabled_manually`，并且本轮还手工取消了当时排队和运行中的部署 run，避免实例被重新拉起。
- `Fork Deploy GCE` 工作流已在 `Deploy over IAP SSH` 步骤加上 `retry_gcloud_ssh`。当前会对 `gcloud compute scp` 和 `gcloud compute ssh` 做 6 次递增退避重试，避免 GitHub runner 每次新建临时 SSH key 后首轮就因为 metadata/guest-agent 同步抖动而失败。
- GCP 项目 `gen-lang-client-0984777924` 的项目级 `ssh-keys` 元数据里曾堆积大量过期 `runner:` 条目。2026-03-29 已手工清理旧 runner key，只保留长期账号，再让新的 workflow 临时 key 重新进入，减少 guest agent 处理负担。
- 2026-03-29 epdm.amoze.net 无法访问时，若 Cloudflare 已返回 301 或 502 且 Caddy 本地证书握手正常，优先检查 Caddy 到上游 inventree-server:8000。本次串口日志确认 dial tcp 172.20.0.5:8000 connect refused，说明外层网络与证书链路已恢复，真正阻塞点在 InvenTree 应用容器未监听或启动失败。
