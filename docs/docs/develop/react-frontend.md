---
title: React 前端开发
---

## 环境准备

这一页说明如何搭建并运行 InvenTree 前端开发环境。默认你已经在使用 [InvenTree devcontainer](./devcontainer.md)。

!!! warning "默认你已经有可用的 devcontainer"

!!! info "以下步骤默认都在 Visual Studio Code 中完成"

!!! note "Devcontainer"
    [devcontainer](./devcontainer.md) 已经包含前端开发所需的大部分依赖，可以直接用来启动前端服务。

### 安装前端依赖

先确认前端依赖已经安装好。

```bash
invoke int.frontend-install
```

## 需要运行的服务

前端开发时需要同时启动两个服务，一个是后端服务，一个是前端服务。

### 后端服务

先启动后端，再启动前端。因为前端会依赖后端提供的 API。

```bash
invoke dev.server
```

这个命令会以前台方式启动后端，并占用当前终端窗口。

### 前端服务

等后端起来以后，在另一个终端窗口里启动前端服务。

```bash
invoke dev.frontend-server
```

前端服务启动后，可以通过 https://localhost:5173/ 访问。

## 热更新

当前端代码发生变化时，前端开发服务器会自动触发热更新。这样你可以边改边看效果，不需要每次都手动重新构建。

## 调试

前端服务跑起来以后，可以直接用 VS Code 的调试器附加到它上面。

打开 `Run and Debug` 视图，选择 `InvenTree Frontend - Vite`，点击启动按钮即可。这样就能对正在运行的 Vite 服务打断点。

!!! info "后端服务"
    调试前端时，后端服务必须已经在另一个进程中运行。不能在同一个 VS Code 调试会话里同时调试前端服务和后端服务。

## 测试

InvenTree 前端测试使用 [Playwright](https://playwright.dev/)。CI 流水线里也会自动运行这套测试。

### 安装 Playwright { #install-playwright }

如果你要在本地跑前端测试，需要先安装 Playwright 依赖。

```bash
cd src/frontend
sudo npx playwright install-deps
npx playwright install
```

### 准备测试数据

Playwright 测试默认假设 InvenTree 里已经导入了 [测试数据集](../demo.md#local-setup)。

在运行测试之前，先执行下面的命令，确保测试数据处于干净状态。

```bash
invoke dev.setup-test -i
```

### 本地运行测试

如果你想在本地交互式运行测试，可以执行下面的命令。

```bash
cd src/frontend
npx playwright test --ui
```

这个命令会先启动后端服务，然后把测试跑在前端开发服务上。浏览器会打开一个交互式窗口，你可以逐条运行或观察测试。

### 查看报告

Playwright 测试结果会在 CI 中作为可下载报告保存。下载并解压报告后，可以用下面的命令回放结果，查看失败用例细节。

```bash
npx playwright show-report path/to/report
```

### 没有找到测试

如果 Playwright UI 里显示 `No Tests`，通常不是测试文件没了，而是启动链路中某个环节报错了，最常见的是后台 InvenTree 服务没有成功拉起。

这时可以运行下面的命令来排查。

```bash
npx playwright test --debug
```

它会把错误信息直接打印到控制台。很多情况下，只是本地 InvenTree 环境过旧，执行一次 `invoke update` 就能继续。

## 提示和注意事项

### WSL

在 Windows 上，Docker 相关操作都会通过 WSL 执行，devcontainer 也是一样。

前端开发服务器的默认配置会开启文件轮询来支持热更新，但这会明显增加性能开销。机器比较旧时，甚至可能把容器直接拖慢到无法使用。

如果你发现前端服务几乎跑不起来，先看 Docker Desktop 的资源占用。如果容器长期吃满 CPU，通常就要考虑关闭文件轮询。

!!! warning "关闭文件轮询后，每次改文件都需要重启前端服务"

做法是打开 `src/frontend/vite.config.ts`，把下面这行：

```typescript
const IS_IN_WSL = platform().includes('WSL') || release().includes('WSL');
```

改成：

```typescript
const IS_IN_WSL = false;
```

!!! tip "这个改动不要提交到 Git"

!!! warning "改完以后，每次前端文件有变化，你都需要手动重启前端服务"

### 运行边界

前端开发服务器模式下，有些功能表现不会和生产环境完全一致。使用前最好先理解前端开发服务器和后端服务之间的数据流关系。

#### SSO 登录

如果你通过 SSO 登录前端开发服务器，重定向地址可能不会完全按预期工作。
