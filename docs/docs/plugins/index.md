---
title: 插件
---

## InvenTree 插件架构

InvenTree 服务端提供了可扩展的插件架构，允许把自定义插件直接集成到 InvenTree 安装中。这样可以把复杂能力从核心代码里拆出来，单独维护和演进。

插件可以通过几种方式接入。

- 通过 PIP 安装 Python 插件包
- 把插件放到外部 [plugins 目录](../start/config.md#plugin-options)
- 使用 InvenTree 自带的 [内置插件](./builtin/index.md)

安装方式的细节见 [安装插件](./install.md)。

### 配置选项

插件行为可以通过 InvenTree 配置项控制。可用配置见 [配置文档](../start/config.md#plugin-options)。

## 开发插件

如果你准备开发自定义插件，先看 [开发插件](./develop.md)。这一页会介绍插件架构、基础约定和打包方式。

### 插件脚手架

为了更快创建新插件，InvenTree 提供了 [插件脚手架工具](./creator.md)。它可以快速生成插件骨架，适合做新项目起步。

### 插件实战

如果你想从一个完整例子开始，可以看 [插件实战](./walkthrough.md)。这份文档会带你一步步做出一个零件详情页的自定义面板。

### 插件 Mixins { #plugin-mixins }

插件常用能力大多通过 mixin 提供，比如动作扩展、事件处理、报表扩展、前端界面扩展等。具体用法见 [开发插件](./develop.md#plugin-mixins)。

### 静态文件 { #static-files }

插件可以带自己的静态资源，比如 CSS、JavaScript 和图片。它们会在插件安装后被收集到 `/static/plugins/<slug>/` 下，并通过静态文件服务提供给前端使用。更完整的说明见 [开发插件](./develop.md#static-files)。

## 可用插件

InvenTree 的插件来源很多，包括内置插件、示例插件、必需插件和第三方插件。

### 内置插件

InvenTree 自带了一批内置插件，用来补充核心功能。这些插件随源码一起分发，可以通过配置启用或关闭。

更多信息见 [内置插件文档](./builtin/index.md)。

### 示例插件

如果 InvenTree 运行在 [调试模式](../start/config.md#debug-mode)，系统还会加载一组示例插件。这些插件主要用于演示插件架构的能力，也适合作为二次开发的参考。

!!! info "仅调试模式可用"
    示例插件只会在调试模式下加载，不建议在生产环境直接依赖。

### 第三方插件

已知的第三方 InvenTree 扩展可以在 [官网扩展页面](https://inventree.org/extend/integrate/) 找到。如果你的扩展也希望被收录，可以到 InvenTree 组织的 GitHub 页面联系维护者。

官网也提供了一份第三方插件列表，见 [InvenTree 插件页面](https://inventree.org/plugins.html)。这份列表并不保证完整。

### PyPI

有不少第三方插件已经发布到 [Python Package Index](https://pypi.org/)。这些插件可以直接通过 PIP 安装。

它们通常会带上 `Framework :: InvenTree` 分类。可以在 [InvenTree PyPI 搜索页](https://pypi.org/search/?c=Framework+%3A%3A+InvenTree) 查看。

!!! warning "第三方插件"
    第三方插件由独立开发者维护。InvenTree 不对其质量、安全性或兼容性做保证，使用前请自行评估。

## 必需插件 { #mandatory-plugins }

某些插件对 InvenTree 的正常运行是必需的。这类插件通常随源码一起分发，不能被禁用，因为它们承载的是核心功能。

### 必需的第三方插件 { #mandatory-third-party-plugins }

有时你也会希望把某个第三方插件标记为必需插件。这样一来，只要插件被安装，它就会自动启用，并且不能被用户关闭。

这种做法适合用于关键业务能力，尤其是停用后会直接影响系统可用性的场景。

如果需要这样做，可以在 [配置文件](../start/config.md#plugin-options) 里把对应插件标记为 mandatory。系统启动后会强制保持这些插件处于启用状态。
