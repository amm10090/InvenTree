---
title: 贡献指南
---

在第一次向 InvenTree 提交 Pull Request 之前，建议先完整阅读这一页。

## 快速开始

下面这些命令可以帮助你尽快拉起一个可用的开发环境，并导入一套演示数据。

### Devcontainer

如果你要开始 InvenTree 开发，最推荐的方法是使用 [devcontainer](https://code.visualstudio.com/docs/devcontainers/containers) 并配合 [vscode](https://code.visualstudio.com/) 使用。

!!! success "Devcontainer 指南"
    具体步骤见 [devcontainer 文档](./devcontainer.md)。

### Docker

如果你想基于 [docker](../start/docker.md) 搭开发环境，可以运行下面这些命令：

```bash
git clone https://github.com/inventree/InvenTree.git && cd InvenTree
docker compose --project-directory . -f contrib/container/dev-docker-compose.yml run --rm inventree-dev-server invoke install
docker compose --project-directory . -f contrib/container/dev-docker-compose.yml run --rm inventree-dev-server invoke dev.setup-test --dev
docker compose --project-directory . -f contrib/container/dev-docker-compose.yml up -d
```

### 裸机环境

如果你想直接在本机上搭建开发环境，可以这样做：

```bash
git clone https://github.com/inventree/InvenTree.git && cd InvenTree
python3 -m venv env && source env/bin/activate
pip install --upgrade --ignore-installed invoke
invoke install
invoke update
invoke dev.setup-dev --tests
```

完整安装参考见 [InvenTree 安装文档](../start/index.md)。

!!! note "依赖包"
    视你的系统环境而定，可能还需要手动安装一些额外软件包。

### 开发工具

执行下面的命令可以安装开发所需工具。

```bash
invoke dev.setup-dev
```

建议在正式开始贡献之前先跑一次。它会安装并配置 `pre-commit`，让你在每次提交前自动执行一批检查，减少低级错误。

## 分支和版本策略

InvenTree 大体遵循 [GitLab flow](https://about.gitlab.com/topics/version-control/what-are-gitlab-flow-best-practices/) 的分支思路，用来兼顾主线开发、短生命周期功能分支和多个已发布版本的维护。

当前常见的活动分支包括这些。

`master` 是主开发分支。`stable` 是最新稳定分支。`next-breaking` 用来承接下一个大版本的破坏性变更。`l10n` 和 `l10_crowdin` 用于翻译同步。`y.y.x` 形式的分支用于维护当前仍受支持的发布版本线。

其他历史分支会被维护者定期清理，包括旧的发布分支。不要基于它们做新功能开发，否则后续补丁往往还得重做 rebase。

### 版本号

InvenTree 的版本号遵循 [语义化版本](https://semver.org/)。

### 主开发分支

`master` 的 HEAD 代表当前最新开发状态。

所有新功能和 bug 修复都会并入 `master`。不要直接向 `master` 推送。新功能必须从独立分支发起 Pull Request，并且每个分支只做一件主要事情。

### 功能分支

功能分支应当从 `master` 切出，并最终通过 Pull Request 合回 `master`。

### 稳定分支

`stable` 的 HEAD 代表最新稳定版本代码。

带版本号的正式发布会合并到 `stable`。修复分支也通常从 `stable` 派生。

### 修复分支

如果某个已经打过标签的版本发现了 bug，应当从该发布版本切出修复分支或热修复分支。修复获批后，会合回 `stable`，并提升 PATCH 版本号，比如从 0.4.1 升到 0.4.2。

同一个修复也必须被 cherry-pick 到 `master`。如果修复在 `master` 上完成，并且带了 `backport` 标签，也有可能被自动回灌到 `stable`。

### 翻译分支

翻译通过 Crowdin 管理，相关流程是全自动的。`l10n` 和 `l10_crowdin` 专门用于翻译同步，不应该手工修改。

流程大致是这样。提交进入 `master` 后，GitHub Actions 会生成翻译源文件并推送到 `l10n`。Crowdin 会从 `l10n` 拉取这些源文件供翻译。审核通过后的翻译会被自动推回 `l10_crowdin`。最后由维护者定期把 `l10_crowdin` 合回 `master`。

### `next-breaking` 分支

这个分支主要用于让插件作者和集成方提前适配下一个大版本。它会在大版本线切出后从 `master` 派生，并在每次次版本发布时同步更新。

这个分支不会被构建成官方 Docker 镜像或安装包，也不应该用于生产环境。

所有已弃用功能的真正移除通常都发生在这里，主要包括 REST API 和 Python API 的破坏性清理。这样插件开发者就能在大版本正式发布前，提前发现兼容性问题。

这个分支只接收破坏性删除或调整，不应该承载新功能。

大版本发布前，比如从 1.12.5 进入 2.0.0，`next-breaking` 会被合回 `master`。

在一个大版本生命周期内，所有弃用清理都会先集中到这个分支。每次次版本发布后，`master` 会 rebase 到 `next-breaking`。每当某个带弃用项的改动进入 `master`，后续通常还会有一个跟进 PR，把对应的弃用内容移除并投向 `next-breaking`。

## API 版本 { #api-versioning }

每当 API 发生变化时，都要同步提升 [API version]({{ sourcefile("src/backend/InvenTree/InvenTree/api_version.py") }})。

### 理解 API 结构

默认生成的 OpenAPI schema 已经能很好地展示 API 端点，但它并不会直接告诉你底层 serializer 和视图的结构。

如果你希望看到更详细的形状信息，可以在配置文件里设置 schema 生成等级，或者通过 [调试环境变量和配置项](../start/config.md#debugging-and-logging-options) `INVENTREE_SCHEMA_LEVEL` 来增强 `invoke dev.schema` 和 `/api/schema/` 的输出。

等级 1 会在 `x-inventree-meta` 下增加一些基础属性，用来描述端点背后的 Django Rest Framework 视图信息。

等级 2 会继续增加视图继承信息 `x-inventree-components` 和模型信息 `x-inventree-model`。这样可以追溯到具体 serializer 和 model，也更容易检查端点命名是否与数据模型一致。

!!! note "实验用途"
    这些附加属性目前还没有 CI 或系统级校验逻辑，主要用于帮助开发者更好理解 API 结构以及它的演进。

## 环境

### 软件版本

核心开发环境主要面向下面这些版本。

| 名称 | 最低版本 | 说明 |
|---|---| --- |
| Python | {{ config.extra.min_python_version }} | 最低要求版本 |
| Invoke | {{ config.extra.min_invoke_version }} | 最低要求版本 |
| Django | {{ config.extra.django_version }} | 当前固定版本 |
| Node | 20 | 仅前端开发需要 |

其他依赖由项目自己的打包配置负责管理。

### 自动升级语法

如果你需要批量处理新版 Python 或 Django 带来的已弃用语法，可以用下面这些工具：

```bash
pip install pyupgrade
pip install django-upgrade
```

然后执行：

```bash
pyupgrade `find . -name "*.py"`
django-upgrade --target-version {{ config.extra.django_version }} `find . -name "*.py"`
```

## 迁移文件

只要数据库结构有变化，对应 migration 文件就必须进提交，否则 PR 会被拒绝。修改模型后，记得运行 `invoke migrate` 并把 migration 文件一起提交。

GitHub Actions 会检查是否存在未提交的 migration 文件，如果发现缺失，就会直接让 PR 失败。

## 单元测试 { #unit-testing }

新增代码应该尽量配套单元测试。如果新功能覆盖率不足，或者整体覆盖率下降，PR 很可能不会被接受。

InvenTree 使用 [GitHub Actions](https://github.com/features/actions) 在每次收到新的 PR 时自动跑一套检查，其中包括 Python 和 JavaScript 代码风格检查、单元测试、Docker 镜像构建推送，以及翻译文件生成等。

相关工作流位于 `./github/workflows` 目录。

### 本地运行测试

在本地运行全部测试可以直接使用：

```bash
invoke dev.test
```

如果你只想跑某个模块，比如订单模块，可以这样写：

```bash
invoke dev.test --runtest order
```

想查看完整参数列表，可以执行：

```bash
invoke dev.test --help
```

```
{{ invoke_commands('dev.test --help') }}
```

#### 数据库权限问题

Django 在本地测试时会临时创建测试数据库，测试完成后再删除它。如果你运行单元测试时遇到权限问题，先确认数据库用户拥有创建数据库的权限。

比如 PostgreSQL 可以执行：

```sql
alter user myuser createdb;
```

!!! info "Devcontainer"
    默认 devcontainer 自带的数据库容器已经预先配置好了这类权限。

### 追踪覆盖率对应的测试

有时候你可能想知道某一行代码到底被多少测试覆盖，或者具体是哪些测试覆盖到了它。coverage.py 把这类信息叫做 contexts。

如果你通过带 coverage 的 invoke 测试任务运行测试，contexts 会被自动收集。之后可以用下面的命令生成 HTML 报告：

```bash
coverage html -i
```

CI 流水线里也会生成 coverage 数据库，并作为名为 `coverage` 的 artifact 保留 14 天。

### 数据库查询分析

开发时，统计某一段后端代码执行了多少数据库查询有时会很有帮助。可以使用 `count_queries` 上下文管理器来做这件事。

```python
from InvenTree.helpers import count_queries

with count_queries("My code block"):
    # Code block to profile
    ...
```

运行后，查询数量会被打印到控制台。

## 代码风格

代码风格会在 GitHub CI 中自动检查。不符合规范的 PR 会直接导致 CI 失败。

### 后端代码

后端 Python 代码会按 [PEP 规范](https://peps.python.org/pep-0008/) 检查。函数和类建议都写 docstring。项目默认遵循 [Google Python docstring 风格](https://google.github.io/styleguide/pyguide.html#38-comments-and-docstrings)。

### 前端代码

前端 JavaScript 代码使用 [eslint](https://eslint.org/) 检查。虽然前端不强制要求 docstring，但仍然鼓励写清楚必要说明。

### 本地检查

如果你已经执行过开发工具安装流程，这些代码风格检查会在每次提交时通过 pre-commit 自动运行。

### Django 模板

Django 模板通过 pre-commit 里的 [djlint](https://github.com/Riverside-Healthcare/djlint) 检查。

默认规则集中，下面这些规则被排除了：

```bash
D018: (Django) Internal links should use the { % url ... % } pattern
H006: Img tag should have height and width attributes
H008: Attributes should be double quoted
H021: Inline styles should be avoided
H023: Do not use entity references
H025: Tag seems to be an orphan
H030: Consider adding a meta description
H031: Consider adding meta keywords
T002: Double quotes should be used in tags
```

## 文档 { #documentation }

只要新增了功能，或者现有功能有明显变化，就应该同步补上用户文档。

### 稳定链接引用

文档系统支持做重定向，用来给外部引用提供稳定链接。

新的引用可以加在 `docs/mkdocs.yml` 的 `redirect_maps` 部分。目标既可以是站内文档，也可以是外部地址。所有引用都会在文档 CI 中做校验。

## 翻译 { #translations }

所有面向用户的字符串都必须接入翻译引擎。

InvenTree 代码主语言是英文。可翻译字符串也以英文作为主语言，然后再通过 [Crowdin](https://crowdin.com/project/inventree) 提供其他语言翻译。

!!! note "翻译文件"
    翻译文件由 GitHub Actions 自动更新。提交 PR 之前不需要自己手动编译翻译文件。

### Python 代码

Python 里暴露给用户的字符串应该这样写：

```python
from django.utils.translation import gettext_lazy as _

user_facing_string = _('This string will be exposed to the translation engine!')
```

### 模板字符串

HTML 和 JavaScript 文件都会经过 Django 模板引擎处理。可翻译字符串可以这样写：

```html
{ % load i18n % }

<span>{ % trans "This string will be translated" % } - this string will not!</span>
```

## GitHub 使用

### 标签

标签会从多个维度标记 issue 和 PR。

| 区域 | 名称 | 说明 |
| --- | --- | --- |
| Triage Labels |  |  |
|  | triage:not-checked | 尚未被核心团队检查 |
|  | triage:not-approved | 维护者尚未批准 |
| Type Labels |  |  |
|  | breaking | 表示会破坏兼容性的重大更新 |
|  | bug | 问题修复 |
|  | dependency | 依赖相关 |
|  | duplicate | 与其他 issue 或 PR 重复 |
|  | enhancement | 对现有功能的增强建议 |
|  | experimental | 需要手动启用的实验性功能 |
|  | feature | 新功能 |
|  | help wanted | 需要外部协助 |
|  | invalid | 该 issue 或 PR 被判定为无效 |
|  | inactive | 长时间无活动 |
|  | migration | 数据库迁移，需特别留意 |
|  | question | 问题咨询 |
|  | roadmap | 路线图项目，暂时没有立即实现计划 |
|  | security | 安全相关 |
|  | starter | 适合新贡献者上手 |
|  | wontfix | 明确不会处理 |
| Feature Labels |  |  |
|  | API | API 相关 |
|  | barcode | 条码扫描与集成 |
|  | build | 生产工单 |
|  | importer | 数据导入和处理 |
|  | order | 采购单与销售单 |
|  | part | 零件相关 |
|  | plugin | 插件生态 |
|  | pricing | 价格功能 |
|  | report | 报表生成 |
|  | stock | 库存项管理 |
|  | user interface | 用户界面 |
| Ecosystem Labels |  |  |
|  | backport | 会被回灌到稳定分支的修复 |
|  | demo | 演示服务器或数据集相关 |
|  | docker | Docker 或 docker-compose 相关 |
|  | CI | CI 和单元测试生态相关 |
|  | refactor | 既有代码重构 |
|  | setup | 安装和部署相关 |
