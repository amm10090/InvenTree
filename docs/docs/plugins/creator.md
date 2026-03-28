---
title: 插件脚手架
---

## 插件脚手架工具

InvenTree 的插件框架能力很强，但起步配置也相对繁琐。为了降低门槛，官方提供了一个 [插件脚手架命令行工具](https://github.com/inventree/plugin-creator)。

它可以快速生成一个可工作的 InvenTree 插件骨架，并按照你的选择把常用功能预先接进去。

!!! warning "最低版本"
    这个脚手架主要面向 InvenTree 1.0.0 及以上版本。更早版本虽然也可能勉强使用，但脚手架生成的前端能力不保证兼容。

### 功能特点

脚手架能帮你完成这些事。

- 录入插件元数据，比如名称、描述和作者
- 选择许可证，默认是 MIT
- 勾选需要的插件 mixin 和前端能力
- 可选生成 Git、格式化和 CI 配置
- 生成可发布到 PyPI 的基础结构
- 生成支持热更新的前端开发环境

## 使用前提

这里默认你已经有一个可以运行的 InvenTree 开发环境，并且最好已经按 [devcontainer 文档](../develop/devcontainer.md) 把环境搭起来了。

## 安装脚手架

先通过 PIP 安装：

```bash
pip install -U inventree-plugin-creator
```

## 创建插件

运行下面的命令开始生成插件：

```bash
create-inventree-plugin
```

### 插件元数据

第一步是填写插件元数据。

{{ image("plugin/plugin-creator-metadata.png", "Plugin Metadata") }}

### 许可证

接着选择许可证。默认是 MIT，也可以改成其他选项。

{{ image("plugin/plugin-creator-license.png", "Plugin License") }}

### 选择插件能力

接下来，脚手架会让你选择需要启用的能力。

#### 选择 Mixin

先选择需要的 [插件 mixin](./develop.md#plugin-mixins)。

{{ image("plugin/plugin-creator-mixins.png", "Plugin Mixins") }}

#### 选择前端能力

如果你前一步勾选了 `UserInterfaceMixin`，脚手架还会继续询问你需要哪些前端能力。

可选内容包括。

- 自定义仪表盘组件
- 自定义面板组件
- 自定义设置页面

{{ image("plugin/plugin-creator-frontend.png", "Plugin Frontend Features") }}

### Git 和 DevOps 配置

如果需要，脚手架还能顺手把 Git 仓库、pre-commit、GitHub Actions 或 GitLab CI 一起准备好。

{{ image("plugin/plugin-creator-devops.png", "Plugin DevOps Features") }}

## 安装插件

脚手架生成完成后，插件会出现在你指定的目录下。

如果示例插件叫 `MyCustomPlugin`，可以先进入目录看看：

```bash
cd MyCustomPlugin
ls -al
```

默认目录结构大致如下。

| 文件 | 说明 |
| ---- | ----------- |
| **.git** | Git 仓库目录，如果你勾选了 Git |
| **.github** | GitHub 配置目录 |
| **.gitlab-ci.yml** | GitLab CI 配置 |
| **.gitignore** | Git 忽略规则 |
| **.pre-commit-config.yaml** | pre-commit 配置 |
| **.editorconfig** | 编辑器配置 |
| **LICENSE** | 许可证文件 |
| **MANIFEST.in** | 控制哪些文件会进入插件包 |
| **README.md** | 插件说明文档 |
| **biome.json** | Biome 配置 |
| **pyproject.toml** | 项目配置文件 |
| **setup.cfg** | 代码格式和 lint 配置 |
| **setup.py** | 打包脚本 |
| **frontend/** | 前端代码目录 |
| **my_custom_plugin/** | 插件核心代码目录 |

### 可编辑安装

开发阶段推荐使用 [editable install](https://setuptools.pypa.io/en/latest/userguide/development_mode.html)。这样改完代码以后，不需要重新安装插件。

```bash
pip install -e .
```

安装完成后，也可以用下面的命令确认一下：

```bash
pip show inventree-my-custom-plugin
```

{{ image("plugin/plugin-creator-install.png", "Install Editable Plugin") }}
{{ image("plugin/plugin-creator-verify.png", "Verify plugin installation") }}

## 激活插件

插件安装完以后，还需要在 InvenTree 里启用它。

如果服务还没启动，可以先运行：

```bash
invoke dev.server
```

然后打开 [插件管理页面](http://localhost:8000/web/settings/admin/plugin)，点击对应插件旁边的 Activate。

{{ image("plugin/plugin-creator-activate.png", "Activate Plugin") }}

!!! success "插件已激活"
    激活成功后，就可以继续开发和调试了。

## 前端开发

如果你的插件包含前端能力，生产环境里它会以静态文件方式提供。但在开发时，更适合走本地开发服务器，这样可以获得热更新体验。

### 后端配置 { #backend-configuration }

为了让 InvenTree 把插件前端请求转到开发服务器，需要在配置文件里加上 `plugin_dev`。如果你使用默认 devcontainer，通常配置文件就是 `./dev/config.yaml`。

```yaml
plugin_dev:
  slug: 'my-custom-plugin'  # 替换成你的插件 slug
  host: "http://localhost:5174"
```

!!! warning "需要重启"
    配置改完以后，后端服务需要重启才能生效。

这段配置的意思是，把当前插件的静态资源请求转发到 `5174` 端口上的开发服务器。这个能力只在开发模式里使用，生产环境不会走这里。

### 前端开发服务器 { #frontend-development-server }

脚手架已经帮你准备好了前端开发所需的结构。进入插件前端目录后，运行下面的命令：

```bash
cd frontend
npm install
npm run dev
```

正常情况下，你会看到开发服务器跑在 `5174` 端口上。

{{ image("plugin/plugin-creator-dev.png", "Frontend dev server") }}

默认示例会在零件详情页渲染一个自定义面板。打开对应页面后，你应该能看到它。

{{ image("plugin/plugin-creator-panel.png", "Custom Panel") }}

!!! success "前端开发环境已就绪"
    现在就可以开始写你自己的前端界面了。

## 编辑插件

### 后端代码

后端代码位于 `my_custom_plugin` 目录。主要逻辑通常从 `core.py` 开始写。

如果你在脚手架里勾选了其他 mixin，也会看到对应的 Python 文件一起生成。

因为插件是以 editable install 方式安装的，改完后端代码通常不需要重新安装。

!!! info "调试服务器"
    后端代码的即时生效能力只在调试模式里可用。如果你跑的是生产模式，改完仍然需要重启服务。

### 前端代码

前端代码位于 `frontend/src`。生成出来的示例 `.tsx` 文件可以直接改。

如果你选择了自定义面板，入口通常就是 `./frontend/src/Panel.tsx`。改这里就能调整界面内容和交互。

只要 `npm run dev` 还在跑，改动就会自动刷新到开发服务器上。

!!! info "需要刷新页面"
    由于 InvenTree 前端的加载方式，浏览器页面通常还需要手动刷新一次，才能看到最新效果。

## 构建插件

上面的内容面向开发阶段。准备分发插件时，还需要执行构建。

!!! info "CI 构建"
    如果你在脚手架里开启了 CI，推送代码后通常就会自动构建插件。生产环境里更推荐走这条路。

### 编译前端资源

插件前端最终要被打包进插件的 `static` 目录里。脚手架默认已经把输出路径接好了，所以只需要运行：

```bash
cd frontend
npm run build
```

{{ image("plugin/plugin-creator-npm-build.png", "Build Frontend") }}

### 构建插件包

前端产物准备好以后，就可以继续用 Python 打包工具生成可分发的插件包，并通过 PyPI、私有源或 Git 仓库发布。
