---
title: 开发插件
---

## 插件开发指南

这是一份面向插件开发者的入门说明。默认你已经具备基础的 Python、Django 和 InvenTree 源码阅读能力。

### 插件脚手架

如果你刚开始做新插件，优先使用 [插件脚手架](./creator.md)。它可以快速生成基础目录、打包配置和示例文件，能省掉一大半起步成本。

## 先明确需求

开始写代码之前，先把插件到底要做什么讲清楚。最重要的是先看现有 [插件 mixin](#plugin-mixins) 能不能满足需求。能复用 mixin，就尽量不要自己重新造一套。

建议先写一个很短的需求说明，再决定插件边界。常见判断方式如下。

- 如果只是提供一个简单动作或 REST 入口，优先考虑 [ActionMixin](./mixins/action.md)
- 如果要解析特定条码，优先考虑 [BarcodeMixin](./mixins/barcode.md)
- 如果需要自定义页面导航或附加页面，可以看 [NavigationMixin](./mixins/navigation.md) 和 [UrlsMixin](./mixins/urls.md)
- 如果要增强报表能力，可以看 [ReportMixin](./mixins/report.md)
- 如果需要访问外部 API，可以看 [APICallMixin](./mixins/api.md)
- 如果要跑定时任务或后台任务，可以看 [ScheduleMixin](./mixins/schedule.md)
- 如果要响应系统事件，可以看 [EventMixin](./mixins/event.md)
- 如果需要用户可配置项，可以看 [SettingsMixin](./mixins/settings.md)
- 如果要接入完整 Django app 和自定义模型，可以看 [AppMixin](./mixins/app.md)

!!! warning "慎用 AppMixin"
    AppMixin 的能力最强，但风险也最高。它会把插件当成 Django app 处理，如果设计不好，整套实例都可能被带崩。

### 定义元数据

别忘了给插件声明 [元数据](./index.md)。这些内容会显示在插件设置界面里。至少建议提供一个可访问的项目地址，便于用户提交问题或查看说明。

### 开发建议

下面这些建议不是硬规则，但大多数场景都适用。

- 插件尽量保持简单，功能越聚焦越稳
- 能复用 mixin 就不要直接碰内部实现
- 不要依赖名称以下划线开头的内部函数
- 导入尽量走稳定入口
- 尽量把插件做成标准包并通过打包安装
- 如果依赖私有基础设施，优先用版本化发布而不是手工拷贝文件
- 如果用了 AppMixin，最好明确绑定支持的 InvenTree 版本范围

推荐的导入写法如下：

```python
from plugin import InvenTreePlugin, registry
from plugin.mixins import APICallMixin, SettingsMixin, ScheduleMixin, BarcodeMixin
```

## 插件代码结构

### 插件基类

自定义插件必须继承 [InvenTreePlugin 类]({{ sourcefile("src/backend/InvenTree/plugin/plugin.py") }})。只要插件通过受支持的方式安装，InvenTree 启动时就会自动发现它。

### 导入路径

代码库会持续演进，内部导入路径可能变化。为了降低破坏性改动，插件开发应尽量使用 `plugin` 命名空间下暴露的稳定接口。

#### 插件命名空间

`plugin` [命名空间]({{ sourcefile("src/backend/InvenTree/plugin/__init__.py") }}) 暴露了插件系统里最重要的公共对象。

```python
# 管理对象
registry                    # 管理插件状态和集成点

# 基类
InvenTreePlugin             # 所有插件的基类

# 异常
MixinImplementationError    # mixin 实现不正确时抛出
MixinNotImplementedError    # 缺少核心 mixin 实现时抛出
```

#### Mixins

插件能力由多个 mixin 拆分提供。每个 mixin 对应一类集成能力，可以和 `InvenTreePlugin` 组合使用。公共 API 会通过 `plugin.mixins` 暴露。

可用接口的最新定义见 [源码]({{ sourcefile("src/backend/InvenTree/plugin/mixins/__init__.py") }})。

#### 模型和其他内部 API

!!! warning "危险区"
    `plugin` 命名空间之外的大多数接口都不属于稳定公共 API。只有在你清楚理解 Django 和 InvenTree 内部实现时，才建议直接使用。

模型、内部工具函数和服务端内部实现没有长期稳定承诺。如果你只是要对数据变化做出响应，优先使用 [EventMixin](./mixins/event.md)。

### 插件元数据选项

插件类可以声明一组常量，用于描述插件自身。

``` python
NAME = '' # 插件通用名称
SLUG = None  # URL、设置项等场景下使用的唯一标识
TITLE = None  # 面向用户展示的友好名称

AUTHOR = None  # 作者
PUBLISH_DATE = None  # 发布时间
WEBSITE = None  # 项目或开发者主页

VERSION = None  # 插件版本
MIN_VERSION = None  # 支持的最低 InvenTree 版本
MAX_VERSION = None  # 支持的最高 InvenTree 版本
```

更多示例可以参考 [示例插件]({{ sourcedir("src/backend/InvenTree/plugin/samples") }})。

### 插件配置

服务启动时，每个被发现的插件都会自动创建一个 *PluginConfig* 数据库记录，用来保存插件是否启用等状态。

这些配置需要在 [管理后台](../settings/admin.md) 里启用。

!!! warning "默认禁用"
    新发现的插件默认是禁用状态，需要由具有 staff 权限的用户手动启用。

## 插件 Mixins { #plugin-mixins }

很多常见需求都已经被抽成了现成 mixin。每个 mixin 都负责接入 InvenTree 的某一块能力，有些还会顺带提供一批常用辅助函数。

当前支持的 mixin 如下。

| Mixin | 说明 |
| --- | --- |
| [ActionMixin](./mixins/action.md) | 执行自定义动作 |
| [APICallMixin](./mixins/api.md) | 调用外部 API |
| [AppMixin](./mixins/app.md) | 接入自定义数据库模型 |
| [BarcodeMixin](./mixins/barcode.md) | 扩展条码能力 |
| [CurrencyExchangeMixin](./mixins/currency.md) | 自定义汇率接口 |
| [DataExport](./mixins/export.md) | 扩展数据导出 |
| [EventMixin](./mixins/event.md) | 响应系统事件 |
| [LabelPrintingMixin](./mixins/label.md) | 扩展标签打印 |
| [LocateMixin](./mixins/locate.md) | 定位和识别库存项 |
| [MachineDriverMixin](./mixins/machine.md) | 接入外部设备驱动 |
| [MailMixin](./mixins/mail.md) | 发送自定义邮件 |
| [NavigationMixin](./mixins/navigation.md) | 往 Web 界面加导航入口 |
| [NotificationMixin](./mixins/notification.md) | 发送系统通知 |
| [ReportMixin](./mixins/report.md) | 扩展报表上下文 |
| [ScheduleMixin](./mixins/schedule.md) | 调度定时任务 |
| [SettingsMixin](./mixins/settings.md) | 提供可配置设置项 |
| [UserInterfaceMixin](./mixins/ui.md) | 扩展用户界面 |
| [UrlsMixin](./mixins/urls.md) | 提供自定义 URL |
| [ValidationMixin](./mixins/validation.md) | 扩展模型校验 |

## 插件概念

### 后端代码和前端代码

InvenTree 插件可以同时包含后端和前端代码。

后端代码使用 Python 编写，主要负责模型、API、定时任务和服务端逻辑。

前端代码使用 JavaScript 或 TypeScript 编写，主要负责界面组件，比如自定义面板、设置页和仪表盘组件。

如果要做界面扩展，继续看 [前端集成](./frontend.md)。

## 静态文件 { #static-files }

如果插件需要静态资源，比如 CSS、JavaScript 或图片，这些文件应该放在插件包顶层的 `static` 目录里。插件安装后，InvenTree 会自动收集这些文件并复制到合适的位置。

这些静态资源会通过 `/static/plugins/<plugin_name>/<filename>` 暴露给 Web 界面使用，由 [代理服务](../start/processes.md#proxy-server) 提供访问。

例如，插件名如果是 `my_plugin`，并且包含 `CustomPanel.js`，那么它的访问路径就是 `/static/plugins/my_plugin/CustomPanel.js`。

### 打包

!!! tip "包发现经常是问题根源"
    很多打包失败问题都来自 package discovery 配置不正确。可以参考 PyPA 的 [自动发现文档](https://setuptools.pypa.io/en/latest/userguide/package_discovery.html#automatic-discovery)。

推荐按照 [PEP 561](https://peps.python.org/pep-0561/) 兼容的方式发布插件包。如果可以公开发布，优先使用 PyPI。打包方式建议遵循 PyPA 的 [官方打包教程](https://packaging.python.org/en/latest/tutorials/packaging-projects/)。

要让 InvenTree 正常发现你的插件，包里必须声明 `inventree_plugins` entry point。

```setup.cfg
# Example setup.cfg
[options.entry_points]
inventree_plugins =
        ShopifyIntegrationPlugin = path.to.source:ShopifyIntegrationPluginClass
```

```setup.py
# Example setup.py

import setuptools

# ...

setuptools.setup(
    name='ShopifyIntegrationPlugin'
    .# ..

    entry_points={"inventree_plugins": ["ShopifyIntegrationPlugin = path.to.source:ShopifyIntegrationPluginClass"]}
```

#### 附带额外文件

有时候你还需要在安装时把额外文件一起带进去，比如模板文件。

这种情况下，需要在插件根目录添加 `MANIFEST.in`，并在 `setup.py` 中设置 `include_package_data=True`。

!!! tip "setuptools 文档"
    `MANIFEST.in` 的更多说明见 [setuptools 文档](https://setuptools.pypa.io/en/latest/userguide/miscellaneous.html)

假设你的插件目录结构如下：

```
- my_plugin  # 插件核心代码
- my_plugin/templates/  # 模板文件
- MANIFEST.in  # Manifest 文件
- setup.py  # Setuptools 脚本
```

如果你想确保模板文件在安装时也被带上，`MANIFEST.in` 可以这样写：

```
recursive-include my_plugin/templates *
```
