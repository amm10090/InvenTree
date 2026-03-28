---
title: 安装插件
---

## 安装插件

插件可以通过 InvenTree 安装目录中的本地路径加载，也可以作为 PIP 包安装。更推荐 PIP 方式，因为升级和迁移都更省事。

## 常见问题

安装插件本身并不复杂，真正容易出问题的通常是运行环境和安装时机。下面这些点最常见。

### 启用插件支持

在安装自定义插件之前，管理员需要先在 [服务端配置](../start/config.md#plugin-options) 中启用插件支持。

### 重启服务

插件只会在服务启动时被发现和加载。安装新插件并启用后，Web 服务和后台 worker 都需要重启。

### 容器环境

在 Docker 这类容器环境里，插件往往会被安装到一个临时虚拟环境里。为了避免容器重建后插件丢失，InvenTree 提供了启动时自动检查和安装插件的能力。

!!! tip "启动时检查插件"
    如果你在容器里运行 InvenTree，建议启用 **Check Plugins on Startup**。

{{ image("plugin/check_on_startup.png", "Check plugins on startup") }}

## 安装方式

### 内置插件

内置插件位于 `src/backend/InvenTree/plugin/builtin`。为了完整覆盖各类 mixin，源码里还带有一批示例实现，位置在 `src/backend/InvenTree/plugin/samples`。

!!! success "内置插件"
    内置插件属于核心能力的一部分。

!!! info "仅调试模式"
    示例插件不会在生产模式下加载。

### 插件安装文件 { #plugin-installation-file-pip }

使用插件安装文件是最省心的方式。默认情况下，这个文件叫 `plugins.txt`，通常和服务端配置文件放在同一个目录中。文件里写入需要安装的插件列表后，可以直接运行 `invoke plugins` 完成安装。

这种方式有几个明显好处。

- 依赖会跟着一起安装
- 可以通过版本号控制升级节奏
- 系统迁移时更容易复用
- 任何 PIP 支持的来源都能接入

!!! success "自动更新"
    如果你通过 `invoke update` 更新 InvenTree，`plugins.txt` 中声明的插件也会一起更新。

!!! info "插件文件位置"
    `plugins.txt` 的实际位置会受到 [服务端配置](../start/config.md) 的影响。

### Web 界面安装

管理员也可以直接在 Web 界面的插件设置页安装插件。

{{ image("plugin/plugin_install_web.png", "Install plugin via web interface") }}

在表单中填入包名即可。如果插件不在 PyPI，也可以填写来源路径和版本号。版本留空时会安装最新版本。

{{ image("plugin/plugin_install_git.png", "Install plugin from git") }}

!!! success "插件文件"
    通过 Web 界面安装的插件，最终也会被写入 [plugins.txt](#plugin-installation-file-pip)。

{{ image("plugin/plugin_install_txt.png", "Plugin.txt file") }}

### 本地目录

也可以直接把插件放进 `data/plugins/` 目录，系统启动时会自动发现它们。这种方式适合开发和临时测试，但在生产环境里通常不够稳。

!!! info "Git 跟踪"
    `data/plugins/` 默认不会被 Git 跟踪，放在这里的插件文件不会进入版本管理。

!!! warning "不推荐用于生产环境"
    生产环境不建议依赖本地 `plugins` 目录。除非确实无法使用 PIP，否则更推荐插件安装文件、VCS 来源，或者下面的自定义插件目录。

### 自定义目录

如果你想从本地源码安装插件，而不是走 PIP，可以把插件放到 InvenTree 源码目录之外的独立目录里。

做法是设置 `INVENTREE_PLUGIN_DIR` 环境变量，把它指向插件所在目录。相关配置见 [插件配置项](../start/config.md#plugin-options)。

!!! info "Docker"
    在 Docker 环境中，挂载的数据卷里会自动创建 `plugins` 目录。把插件放进去后，服务启动时就会自动发现。
