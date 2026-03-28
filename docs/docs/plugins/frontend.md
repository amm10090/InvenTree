---
title: 前端集成
---

## 插件前端集成

插件可以继承 [UserInterfaceMixin](./mixins/ui.md)，把自定义 UI 组件挂到 InvenTree 的 Web 界面中。

### 插件脚手架

如果你要从零开始做前端插件，推荐直接用 [插件脚手架](./creator.md) 生成基础结构。它会把前端集成所需的目录、构建配置和样例代码都准备好。

## 前端架构

在设计前端插件之前，最好先对 InvenTree 前端架构有一个基本认识。

### React

前端代码使用 TypeScript 编写，界面渲染基于 React。

### Mantine

InvenTree 使用 [Mantine](https://mantine.dev/) 作为 UI 组件库。它提供了大量可复用的响应式组件。

### Axios

前端和后端 API 通信使用 [Axios](https://axios-http.com/)。

### Lingui

前端国际化使用 [Lingui](https://lingui.js.org/)。如果你的插件里有面向用户的文案，也需要考虑本地化。

## 调用前端函数

自定义 UI 组件通过 源文件路径 加 导出函数名 的方式被前端动态加载。文件名和函数名由后端 Python 代码提供，前端运行时通过 API 拿到以后再去加载。

每个插件的静态文件都会被复制到静态目录里。前端想正确加载这些资源，就需要知道插件静态文件的访问路径。

为此，`UserInterfaceMixin` 提供了 `plugin_static_file` 方法。它会返回插件静态资源的正确 URL。

例如，你在后端返回某个 UI 组件时，可以这样写：

```python
{
    ...,
    "source": self.plugin_static_file('my_plugin.js:my_plugin_function'),
    ...,
}
```

函数名通过冒号追加在文件名后面。

### 函数签名

前端导出函数需要符合下面的签名。

```javascript
function my_plugin_function(context: InvenTreePluginContext) {
    // Function implementation
    return (
        <div>Hello world</div>
    )
}
```

这个函数需要返回一个 React 组件，供 InvenTree 前端渲染。

### 插件上下文 { #plugin-context }

渲染 UI 时，InvenTree 会把一个 `context` 对象传给插件函数。这个对象包含当前页面、用户、主题、API 客户端等信息。

类型定义见下面的文件：

{{ includefile("src/frontend/src/components/plugins/PluginContext.tsx", title="Plugin Context", fmt="javascript") }}

`context` 中常见字段如下。

| 属性 | 说明 |
| -------- | ----------- |
| `version` | 当前 InvenTree 版本信息 |
| `user` | 当前登录用户信息 |
| `host` | 当前服务端地址信息 |
| `i18n` | 国际化函数 |
| `locale` | 当前语言环境 |
| `api` | 已认证的 Axios 实例 |
| `queryClient` | 前端查询缓存实例 |
| `navigate` | 页面跳转函数 |
| `globalSettings` | 全局设置 |
| `userSettings` | 用户设置 |
| `modelInformation` | 模型信息 |
| `renderInstance` | 渲染模型实例的函数 |
| `theme` | 当前 Mantine 主题 |
| `colorScheme` | 当前明暗模式 |
| `forms` | 表单组件集合 |

有了这些上下文，插件就能直接复用 InvenTree 的 API 客户端、主题系统和导航能力。

## 外部化库

如果你希望插件和 InvenTree 前端运行在同一套 React 上下文里，就不能把 React、Mantine 这些基础库再打进插件包里，而是要把它们当成外部依赖。

InvenTree 前端会在运行时提供下面这些外部化库。

- `react`
- `react-dom`
- `react-dom/client`
- `@mantine/core`
- `@lingui/core`
- `@lingui/react`

### Window 对象

这些外部化库会挂在全局 `window` 对象上。也就是说，插件构建时必须配置成引用运行时提供的这些依赖，而不是自己再打包一份。

### Vite 配置

你的插件 Vite 配置必须同时兼容开发模式和生产构建，并且正确 externalize 上面这些库。

这件事本身不算简单，所以更推荐直接用 [插件脚手架](./creator.md)。它会把这部分配置提前处理好。

## NPM 包

为了让 UI 插件拿到正确的类型定义和辅助函数，InvenTree 提供了专门的 NPM 包 [@inventreedb/ui](https://www.npmjs.com/package/@inventreedb/ui)。

### 类型定义

你可以从这个包里直接导入 `InvenTreePluginContext`。

```typescript
import { InvenTreePluginContext } from '@inventreedb/ui';

function my_plugin_function(context: InvenTreePluginContext) {
    // Function implementation
    return (
        <MyCustomPanel context={context} />
    );
}
```

### 工具函数和组件

`@inventreedb/ui` 还提供了一批现成的函数和组件，方便插件直接复用 InvenTree 的设计语言和行为模式。

## 前端开发

做前端插件时，最好能在本地开发环境里快速修改和验证，而不是每改一次就重新打包和部署。

为此，InvenTree 支持把某一个插件切到开发模式。在这种模式下，插件前端资源不再从静态目录读取，而是被重定向到本地开发服务器。

!!! info "插件脚手架"
    如果你是用 [插件脚手架](./creator.md#frontend-development-server) 创建插件，相关开发配置已经基本准备好了。

### 调试模式

这个能力只在 [调试模式](../start/config.md#debug-mode) 下可用。调试模式开启后，你可以指定一个插件进入开发模式，由本地 Vite 服务提供资源。

### 配置文件

要选择某个插件进入开发模式，可以在 [配置文件](../start/config.md#configuration-file) 中加入下面这段：

```yaml
plugin_dev:
  slug: 'my-custom-plugin'  # 替换成你的插件 slug
  host: "http://localhost:5174"  # 替换成你的前端开发服务器地址
```

### 开发服务器

如果你使用的是脚手架生成的默认结构，可以这样启动开发服务器：

```bash
cd frontend
npm run dev
```

默认会在 `:5174` 启动一个插件开发服务器，InvenTree 后端会把这个插件的静态资源请求转发到这里。

## 分发前端代码

InvenTree 插件是以 Python 包形式分发的，因此前端代码最终也要被打进插件包里。

常见做法是用 [Vite](https://vitejs.dev/) 构建前端，然后把产物复制到插件的 `static` 目录。脚手架默认就是按这套方式组织的。

当静态文件构建完成并放到正确位置后，插件就可以被打包并通过 PIP 分发。

[Python 打包](https://packaging.python.org/en/latest/) 本身是个独立话题。如果你刚接触这块，建议先用脚手架的默认结构，再逐步理解打包细节。
