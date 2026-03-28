---
title: Devcontainer
---

## Devcontainer

[Devcontainer](https://code.visualstudio.com/docs/devcontainers/containers) 是进入 InvenTree 开发最快的方式。你可以在本地 VS Code 中运行，也可以直接使用 GitHub Codespaces。

## 在 VS Code 中使用

### 前置条件

继续之前，请先确认本机已经安装下面这些工具。

- [git](https://git-scm.com/downloads)，用于克隆仓库
- [docker](https://www.docker.com/products/docker-desktop/)，用于运行 devcontainer
- [vscode](https://code.visualstudio.com/Download)，用于编辑和调试代码

### Docker 容器

InvenTree 的 devcontainer 会启动下面几个容器。

| 容器 | 说明 |
| --- | --- |
| inventree | InvenTree 主服务容器 |
| db | InvenTree 数据库容器，使用 PostgreSQL |
| redis | Redis 缓存容器 |

### 安装步骤

先克隆仓库。如果你准备提交修改，建议先 fork 再克隆你自己的仓库。

```bash
git clone https://github.com/inventree/InvenTree.git
```

然后打开 VS Code，进入扩展侧边栏，搜索 `ms-vscode-remote.remote-containers` 并安装。

接着通过 `File > Open Folder` 打开刚刚克隆下来的目录。

正常情况下，VS Code 会提示你是否在 devcontainer 中重新打开当前目录。选择 `Reopen in Container` 即可。如果没有弹窗，可以打开命令面板，搜索 `Reopen in Container` 手动执行。

第一次进入时需要下载镜像、构建环境并安装依赖，通常要等几分钟。

环境准备完成后，打开一个新的终端。如果终端行首已经出现 `(venv)`，说明虚拟环境已经正确接入，可以开始开发了。

## 在 Codespaces 中使用

打开浏览器进入 [inventree/InvenTree](https://github.com/inventree/InvenTree)，点击 `Code`，切到 `codespaces` 标签页，然后在当前分支上创建 codespace。

初始化同样可能需要几分钟。

!!! warning "关掉欢迎终端"
    Codespaces 默认弹出的 `Welcome to codespaces` 终端没有接入虚拟环境。把它关掉，重新开一个新终端再执行命令。

## 运行任务

很多常用脚本已经被封装成 VS Code 任务。打开命令面板，搜索 `Run Task`，然后选择你想执行的任务即可。

### 导入演示数据

如果你需要一套演示数据，可以运行 `dev.setup-test`。这会导入一个 `admin` 用户，密码是 `inventree`。数据内容见 [inventree/demo-dataset](../demo.md)。

### 创建超级管理员

如果你只需要一个超级管理员账号，可以运行 `superuser` 任务。任务会提示你输入凭据。

### 运行后台 worker

如果你需要处理队列任务，可以运行 `worker` 任务。它会以前台方式占用一个终端窗口。

## 运行 InvenTree

你可以直接启动 InvenTree，也可以通过集成调试器来调试。打开 `Run and Debug` 侧边栏，确认当前选中的是 `InvenTree Server`，然后点击启动按钮。

!!! tip "调试第三方包"
    如果你还需要调试第三方依赖，可以选择 `InvenTree Server - 3rd party`。

启动后就可以打断点，VS Code 会在命中断点时自动暂停。你也可以在调试控制台里查看变量和执行表达式。

!!! info "React 前端开发"
    React 前端还需要额外步骤。具体见 [React 前端开发](./react-frontend.md)。

## 插件开发

如果你要开发 InvenTree 插件，最省事的方式还是基于当前 devcontainer。把插件仓库一起挂载进工作区，再用 editable install 方式安装。

可以在 `.devcontainer/devcontainer.json` 里加上下面这段，把本地插件仓库挂载到容器内。这个改动只适合本地开发，不要提交进仓库。

```json
"mounts": [
  "source=/path/to/your/local/inventree-plugin,target=/workspaces/inventree-plugin,type=bind,consistency=cached"
],
```

然后把 `/workspaces/inventree-plugin` 加进 VS Code 工作区。

接着在虚拟环境里执行下面的命令，把插件装成 editable install。

```bash
pip install -e /workspaces/inventree-plugin
```

如果你希望插件仓库里的 Pylance 也能识别 InvenTree 核心代码，可以在插件仓库下添加 `.vscode/settings.json`，内容如下。

```json
{
  "python.analysis.extraPaths": ["/workspaces/InvenTree/InvenTree"]
}
```

做完以后，插件就可以在 InvenTree 设置页里被启用，也可以直接打断点调试。

## 故障排查

### macOS 下 ssh key 在容器里不可见

如果你的 ssh key 已经加载进宿主机的 `ssh-agent`，但在 devcontainer 里还是看不到，先确认你已经给 VS Code 开启了完整磁盘访问权限。参考这里的说明：[Automatically add SSH keys to ssh-agent comment](https://github.com/microsoft/vscode-remote-release/issues/4024#issuecomment-831671081)。

### macOS 下 gpg key 无法在容器里签名提交

先确认本机已经正确安装并配置 `gnupg` 和 `pinentry-mac`。可以参考这篇文章：[Setup GPG for Git on macOS](https://medium.com/@jma/setup-gpg-for-git-on-macos-4ad69e8d3733)。

### 数据库、媒体文件这些数据存在哪

备份、媒体文件、静态文件、虚拟环境、`plugin.txt`、`secret_key.txt` 等内容都放在 `dev` 目录里。如果你想从零开始，可以删除这个目录，但这样会把已经准备好的本地环境也一并清掉。

数据库数据放在 `dev-db` 目录里，由 `postgres` 容器负责管理。

## 性能优化

如果你在 Windows 上运行 devcontainer，文件系统访问性能可能会比较差。

更推荐把源码放在 **WSL 2** 的文件系统里，而不是 Windows 原生文件系统里。这样文件访问会快很多，devcontainer 对文件变化的响应也会更及时。

也可以参考 VS Code 官方文档里的 [Improve disk performance guide](https://code.visualstudio.com/remote/advancedcontainers/improve-performance)。

## Redis 缓存

devcontainer 默认会带一个 [redis](https://redis.io/) 容器，用来提供全局缓存。默认状态下它是启用的。如果你想关闭它，可以调整 [docker compose 文件]({{ sourcefile('.devcontainer/docker-compose.yml') }}) 里的环境变量配置。

## 前端测试

默认情况下，运行 Playwright 前端测试所需的依赖不会自动安装。安装方式见 [React 前端开发中的 Playwright 安装说明](./react-frontend.md#install-playwright)。
