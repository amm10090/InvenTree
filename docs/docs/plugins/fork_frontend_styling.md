---
title: 自定义前端样式
---

## 说明

本页是当前 fork 的内部开发说明，面向 `prod` 分支。

这里记录的是我们在不污染上游 `master` 的前提下，如何为 InvenTree 做自定义前端样式开发。目标是把品牌定制和界面样式收敛到独立插件里，让 `master` 继续只负责跟随上游同步，生产改动则由 `prod` 和插件仓库承接。

## 先判断需求是不是只靠配置就够了

如果只是替换品牌资源，不需要先写插件。InvenTree 已经提供了现成的界面定制项，可以直接在配置文件里设置登录页文案、导航栏文案、后台标题、Logo 和 Splash 图。

参考 `config_template.yaml` 的示例，最常见的写法如下：

```yaml
customize:
  site_header: 'Amoze Admin'
  login_message: '欢迎使用内部系统'
  navbar_message: '<h6>内部环境</h6>'
  logo: img/custom_logo.png
  splash: img/custom_splash.jpg
```

这类资源路径都要相对 `static` 目录填写。只改品牌露出时，优先走这条路，维护成本最低。

## 什么时候要走插件路线

只要需求开始涉及颜色体系、卡片布局、额外按钮、说明面板、定制设置页，或者需要在现有页面里挂载自己的 React 组件，就不要继续直接改核心前端代码了，改用插件。

这样做有三个直接好处。第一，升级上游时冲突更少。第二，样式和业务逻辑能跟核心仓库解耦。第三，生产环境可以只更新插件，不必每次都重新维护一套前端补丁。

InvenTree 的插件支持把静态资源收集到 `/static/plugins/<slug>/` 下，也支持在调试模式里把某一个插件前端重定向到本地 Vite 开发服务器。这正适合做界面样式开发。

## 当前 fork 已经准备好的开发环境

当前 `prod` 分支已经把插件开发环境接进 devcontainer。

`/.devcontainer/docker-compose.yml` 已经把主机上的 `../../plugin-workspace` 挂载到容器内的 `/workspaces/inventree-plugin`。

`/.devcontainer/postCreateCommand.plugin.sh` 会在容器创建后检查 `/workspaces/inventree-plugin`，如果里面已经是一个可安装的 Python 插件项目，就自动执行可编辑安装。

所以推荐的目录约定就是把自定义插件仓库放到宿主机的 `plugin-workspace`，然后和 InvenTree 一起用当前 devcontainer 开发。

## 推荐的开发方式

推荐把自定义样式做成单独插件仓库，不要把插件源码直接塞进 InvenTree 主仓库。

最顺手的起步方式是用官方的 Plugin Creator 生成骨架。进入容器后，先安装脚手架，再创建插件：

```bash
source /home/inventree/dev/venv/bin/activate
pip install -U inventree-plugin-creator
create-inventree-plugin
```

创建时至少选择 `UserInterfaceMixin`。如果你要在零件详情、订单详情这类现有页面里挂自定义界面，选择自定义面板就够了。如果你要做独立的管理页或完整交互页，再补 `NavigationMixin`。

## 把插件接入当前 InvenTree 开发环境

如果插件还没有被自动安装，可以手动执行一次：

```bash
source /home/inventree/dev/venv/bin/activate
pip install -e /workspaces/inventree-plugin
```

然后在开发配置里指定插件前端调试入口。默认 devcontainer 会跑在调试模式，所以只需要在配置文件里加上 `plugin_dev`。

如果使用默认 devcontainer，配置文件通常是 `./dev/config.yaml`。加入下面这段：

```yaml
plugin_dev:
  slug: 'my-custom-plugin'
  host: 'http://localhost:5174'
```

这里的 `slug` 必须和插件类里定义的 `SLUG` 一致。

改完配置以后，要重启后端服务。

## 本地开发时怎么跑

先启动 InvenTree 后端：

```bash
invoke dev.server
```

再到插件前端目录启动 Vite：

```bash
cd /workspaces/inventree-plugin/frontend
npm install
npm run dev
```

此时插件前端会从 `5174` 端口热加载。页面里的业务数据仍然来自 InvenTree 后端，所以浏览器里访问的还是 InvenTree 页面，只是插件那部分前端资源改由本地开发服务器提供。

插件第一次装好以后，还要去后台启用一次。入口在 `/web/settings/admin/plugin`。

## 自定义前端样式的推荐边界

样式开发优先只作用在插件自己的根节点下面，不要一开始就全局覆盖 InvenTree 的类名。

更稳的写法是先给插件最外层包一个自己的命名空间类，例如 `.amoze-theme-panel`，然后所有颜色、间距、按钮、表格装饰都写在这个作用域下面。这样以后跟上游合并时，不容易因为核心前端类名变化而整片失效。

如果确实需要覆盖宿主页面的样式，也尽量只覆盖已经稳定的容器节点，并且把覆盖范围限制在当前页面或当前插件渲染区域里。不要依赖私有实现细节，也不要假设核心 DOM 结构长期不变。

## 样式文件怎么放进插件

插件前端里可以直接导入 CSS，也可以继续用组件级样式方案。比如：

```tsx
import '@mantine/carousel/styles.css';
import './styles.css';
```

开发模式下，这种写法配合 Vite 没问题。

但到了构建产物阶段，要额外注意一件事。InvenTree 会动态加载插件的 JavaScript 模块，却不会自动帮插件把打包后的 CSS 文件插进页面。因此如果你的插件样式是独立 CSS 产物，渲染入口里要手动补一个 `<link>`。

可以按下面的方式写：

```tsx
import type { InvenTreePluginContext } from '@inventreedb/ui';

export function renderPanel(context: InvenTreePluginContext) {
  return (
    <>
      <link
        rel="stylesheet"
        href={`${context.host}static/plugins/${context.context.slug}/assets/style.css`}
      />
      <div className="amoze-theme-panel">
        自定义面板内容
      </div>
    </>
  );
}
```

这里用到了 `context.host` 和后端传下来的 `slug`。`slug` 建议在插件后端返回 UI 特性时一起放进上下文：

```python
panels.append(
    {
        'key': 'amoze-theme-panel',
        'title': 'Amoze Theme Panel',
        'source': self.plugin_static_file('Panel.js:renderPanel'),
        'context': {
            'slug': self.SLUG,
        },
    }
)
```

这一步别省。因为插件的 Vite 构建会生成 `assets/style.css`，但 InvenTree 的插件加载流程只会按入口去找 JavaScript 模块，不会自动把对应 CSS 挂上去。

## 构建和发布

前端样式开发完成后，要先把插件前端编译进插件静态目录：

```bash
cd /workspaces/inventree-plugin/frontend
npm run build
```

如果你是按 Plugin Creator 的默认结构创建插件，构建结果会自动落到插件包的 `static` 目录里，后续安装到 InvenTree 后会被复制到 `/static/plugins/<slug>/`。

生产环境建议继续把插件当成独立 Python 包发布，再通过插件安装机制接入，而不是把插件代码直接混进 InvenTree 核心仓库。这样以后升级上游时，核心仓库只需要维护部署和接线，插件仓库单独演进就行。

## 一个适合当前 fork 的实践顺序

推荐顺序是先用配置项完成 Logo、Splash 和基础文案替换，再用插件补真正的样式和交互。开发阶段走 devcontainer 加 `plugin_dev`，确认效果后构建插件产物，最后把插件作为独立包部署到生产环境。

这条路线和当前 `prod` 分支的职责划分是对齐的。`master` 继续跟上游，`prod` 负责生产工作流和内部文档，自定义界面能力放到插件仓库里。

## 参考

插件开发总览见 [Developing a Plugin](./develop.md)。

插件前端集成见 [Frontend Integration](./frontend.md)。

插件脚手架见 [Plugin Creator](./creator.md)。

插件安装方式见 [Installation](./install.md)。

基础品牌配置见 [Configuration](../start/config.md#customization-options)。
