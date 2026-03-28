---
title: 架构
---

## 典型部署

InvenTree 是一个经典的 Django 应用，并支持 WSGI 接口标准。下面这张图展示的是一套典型且推荐的部署结构。

``` mermaid
flowchart LR
    Request --- RP[1: Reverse Proxy]
    RP --- Gunicorn[5: Gunicorn]
    subgraph image:inventree/inventree
    Gunicorn --- Django[6: Django Server processes]
    end
    Django --- Database@{ shape: cyl, label: "SQL Database" }
    Django --- Redis
    Worker[7: Q2 Worker] ---  Redis@{ shape: cyl, label: "9: Redis Cache" }
      Database -- 8: DB holds tasks ---> Worker

    subgraph caddy
    RP --- file[2: file server]
end

    file --- s[3: Static Files]
    file --- m[Media Files]
    RP-. 4: API auth request .-> Gunicorn
```

请求会先到反向代理，比如 Caddy、Nginx 或 Apache。静态文件和媒体文件可以直接由反向代理处理，也可以转交给独立文件服务。媒体文件通常还需要向 Django 服务发起一次 API 鉴权请求，确认当前用户是否有访问权限。

API 请求和前端请求会被反向代理转发给 Gunicorn。Gunicorn 是负责承载 Django 进程的 WSGI 服务。Django 进程本身是松耦合的，主要对外提供 REST API。前端真正需要整页 Django 渲染的场景已经很少了，具体见下文的 [前端架构](#frontend-architecture)。

一套配置完整的 InvenTree 实例通常还会运行后台 worker。这里用的是 Q2 Worker，用来处理长任务，比如发送通知、生成报表或执行一些比较重的计算。任务信息存放在数据库中，由 worker 轮询处理，因此即使底层服务重启，任务丢失风险也相对较低。

Redis 或兼容协议的缓存服务也很有价值。它可以缓存用户会话、API token、全局设置、插件设置以及其他临时数据，有助于减轻数据库压力并提升响应速度。

## 代码架构

这一节说明 InvenTree 代码库的主要结构、系统机制以及运行生命周期。

这些知识不是使用 InvenTree 的前置条件，但如果你准备参与开发，或者想通过插件和补丁扩展系统能力，它们会非常有帮助。

### 仓库结构和职责分离

所有会在服务端执行的代码都位于 `src/` 目录。`contrib/` 目录中的部分代码用于部署和维护实例。

一个例外是仓库根目录下的 `tasks.py`。这个文件定义了一批命令行维护任务。它被放在根目录，是为了让文档和开发命令更容易引用。

代码风格检查通常只覆盖 `src/` 下的代码。

### 后端架构

InvenTree 后端是一个 Django 应用。整体上它遵循 Django 的通用组织方式，但为了满足 InvenTree 的业务需求，又做了一些定制扩展。

比较明显的两个偏离点是，系统会修改部分 Django app 机制来支持插件系统，同时还实现了一套自定义角色映射机制，让权限模型更容易理解和使用。

后端整体追求几个目标。它以 API 为中心，通过 REST API 为前端和其他外部应用提供能力。它也尽量保持模块化，让不同组件和 app 之间职责分离。测试覆盖会尽量做到透明且可追踪，安全方面则尽量遵循 Django 社区和通用工程实践。

### 前端架构 { #frontend-architecture }

InvenTree 前端本质上是一个单页应用，使用 React 构建，组件体系基于 Mantine，打包工具链使用 yarn 和 Vite。

#### 前端如何交付

前端会被预先构建成静态文件包，再由 Django 应用提供服务。所以在生产环境运行前端时，并不要求系统里存在 Node 运行时或打包工具。

当然，在开发阶段，你仍然可以让前端开发服务器和开发版或生产版后端协同工作。

前端和后端不一定要由同一台服务器提供，也不一定要在同一个域名下。真正需要匹配的是 API 版本。

#### 与后端的耦合方式

前端在运行期并不会和后端形成强耦合，但它可以通过全局变量 `INVENTREE_SETTINGS` 获取启动所需的初始信息。这个变量由 `spa_settings` 模板标签渲染出来。

这些设置可以告诉前端基础 URL、可用后端、环境信息等内容。

为了做到这一点，前端外层 HTML 会经过一层经过性能优化的模板渲染。不过这层渲染做得很克制，只保留少量必要内容，这样可以降低响应时间，也能缩小安全暴露面。
