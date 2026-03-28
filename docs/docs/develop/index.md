---
title: InvenTree 开发
---

## 介绍

如果你准备为 InvenTree 贡献代码或文档，这一节就是入口。这里会介绍 InvenTree 的整体架构、开发环境搭建方式，以及参与开发时需要遵循的基本约定。

### 架构概览

先看 [架构概览](./architecture.md)，了解 InvenTree 的高层结构，包括请求处理流程、前后端架构，以及系统里的主要组成部分。

### 贡献指南

接着看 [贡献指南](./contributing.md)，了解如何参与 InvenTree 项目开发。

### Devcontainer 环境

项目提供了 [devcontainer](./devcontainer.md) 配置，方便你直接在 VS Code 里快速拉起开发环境。

### 前端开发

如果你要开发 InvenTree 前端，请继续看 [前端开发指南](./react-frontend.md)。

## 性能分析工具 { #profiling-tools }

InvenTree 集成了一些性能分析工具，方便开发者排查性能瓶颈和做优化。这些工具只应该在开发环境中使用，不应该在生产环境启用。实际上，除非服务端运行在 [调试模式](../start/index.md#debug-mode)，否则这些工具默认不会开启。

### Django Silk { #django-silk }

[django-silk](https://silk.readthedocs.io/en/latest/) 是一个 Django 性能分析工具，可以帮助你观察 SQL 查询、请求响应耗时等信息。

要启用 django-silk，需要在 [配置文件](../start/config.md#configuration-file) 中把 `debug_silk` 设为 `True`，或者设置环境变量 `INVENTREE_DEBUG_SILK`。

启用后，可以通过 InvenTree 实例上的 `/silk/` 路径访问 Silk 界面。

!!! tip "运行数据库迁移"
    如果是第一次启用 django-silk，可能需要执行一次 `invoke migrate`，用于创建它所需的数据表。

#### 详细分析

如果还想启用更细粒度的分析能力，可以把环境变量 `INVENTREE_DEBUG_SILK_PROFILING` 设为 `True`，或者在配置文件中把 `debug_silk_profiling` 设为 `True`。更多细节见 [django-silk 文档](https://github.com/jazzband/django-silk#profiling)。

### Django QueryCount { #django-querycount }

启用 `INVENTREE_DEBUG_QUERYCOUNT` 后，服务端会把每次页面加载所执行的数据库查询数量输出到终端。这对排查后端查询过多的问题很有帮助。

这个开关只有在 `INVENTREE_DEBUG` 同时开启时才可用。

### 数据库日志

启用 `INVENTREE_DB_LOGGING` 后，所有数据库查询都会被打印到终端。这个开关适合排查数据库相关问题。

### 内部分析工具

除了上面的第三方工具，InvenTree 自己也带了一些只能在调试模式下启用的内部分析工具，用来帮助开发者观察不同组件的性能表现。

这些工具位于 `./src/backend/InvenTree/profiling.py`。
