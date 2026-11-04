# dsh-workspace-folders

给 **DeepSeek Harness (DSH)** 网页版侧边栏增加原生手感的文件夹组织能力。

DSH 左侧「工作区」列表默认是平铺的。本插件补上了缺失的组织层：**给工作区建文件夹**、**在每个工作区内给会话建多层文件夹**、以及**逐行自定义图标**，同时保留原生侧边栏的拖拽、重命名、置顶、归档、搜索与视图选项。

文件夹层是**纯显示**的：不会改任何工作区/会话标题，不会移动会话归属，也不会碰磁盘目录，只改变侧边栏排列。会话文件夹由 Host 侧持久化（沿用 `dsh-session-keeper`）。

## 功能

### 工作区文件夹（纯显示层）

- 在侧边栏里直接 新建 / 重命名 / 删除 / 折叠 / 排序文件夹。
- 把工作区行拖到文件夹行即可归档；也可以用工作区 `… → 移动到文件夹…`。
- 文件夹拖到另一个文件夹**中部**＝嵌套，拖到**上下缘**＝同级排序；工作区拖到「未分类」＝移出。
- 删除文件夹只删分组：子文件夹上提、成员工作区回到「未分类」，不会删除工作区、会话或文件。
- 没有任何文件夹时，列表与原生完全一致。

### 会话文件夹（每个工作区独立、Host 持久化）

每个工作区有自己独立的多层分类树：拖会话归类、在分类里新建会话、折叠/重命名、置顶、归档三态筛选，以及可撤回的删除回收站。数据在 Host storage domain 中，刷新/清缓存/重启都不丢。

### 图标

- 每行默认是一个安静的小圆点，点击即可打开图标选择器。
- 内置 40 个 DSH 原生图标 + 48 个常用 Emoji，可随时「恢复默认」。
- 显示文件夹也能设置图标。
- 不新增依赖、不联网、不解码图片；图标目录只在选择器打开时渲染，空闲侧边栏每行只多一次 map 查找。

### 保留的原生能力

搜索、分组方式（按工作区 / 按工作区树 / 单列表）、手动与最近更新排序、置顶会话、归档筛选、工作区与会话行菜单。

## 要求与安装

- DSH **>= 0.2.1-rc.1 < 0.3.0**（在 0.2.1-rc.5 的 desktop / web profile 上测试）。
- 从 npm 安装：`dsh plugin --profile web add dsh-workspace-folders`
- 从 GitHub 安装：`dsh plugin --profile web add github:Larrtroffen/dsh-workspace-folders`
- 安装后刷新网页（或重启 Desktop）。插件以 **dsh-workspace-folders** 出现在插件管理器里；禁用/移除即可恢复原生浏览器。

## 使用

| 操作 | 方式 |
| --- | --- |
| 新建顶层文件夹 | 「视图选项」菜单（滑杆图标）→ 新建文件夹；或列表末尾的「＋ 新建文件夹」 |
| 新建子文件夹 | 文件夹行 `…` → 新建子文件夹 |
| 重命名 | 双击文件夹名，或 `…` → 重命名 |
| 工作区归档 | 拖工作区行到文件夹；或工作区 `…` → 移动到文件夹… |
| 移出文件夹 | 拖到「未分类」；或 `…` → 移动到文件夹… → 未分类 |
| 文件夹嵌套/排序 | 拖到另一文件夹的中部（嵌套）或上下缘（排序）；或 `…` → 移动到… |
| 折叠/展开 | 点击文件夹行（折叠时显示工作区数量） |
| 删除文件夹 | 文件夹 `…` → 删除文件夹（只删分组） |
| 设置图标 | 点击行首圆点/图标，或 `…` → 设置图标… |

会话文件夹交互沿用 `dsh-session-keeper`：拖会话进分类、`… → 移动到分类…`、在分类里新建会话、置顶/归档/可撤回删除。

## 数据与隐私

| 数据 | 位置 |
| --- | --- |
| 工作区文件夹、归属、折叠状态、图标（本插件的显示层） | 浏览器 `localStorage`（键 `dsh.session-categories.view.v2`） |
| 会话文件夹 / 归属 / 回收站 | DSH Host storage domain `session_categories`（`<DSH_HOME>/storages/`） |

不上传任何数据。显示层刻意放在浏览器本地：清站点数据会重置工作区文件夹布局（会话文件夹不受影响）。

## 兼容性

- 插件**替换**侧边栏 `sidebar.workspaces` 区域，不能与其它同样替换该区域的插件（如 `dsh-better-workspace`、`dsh-workspace-categories`）同时使用。
- 安装 `dsh-claude-style` 时，建议在其配置中设置：

  ```yaml
  workspaceView: false    # 关闭 claude-style 的 进行中/已归档 头部切换条（本插件视图菜单已有同款三态归档筛选）
  searchStyle: icon       # 保留侧边栏搜索入口
  ```

## 从源码构建

```sh
npm install --legacy-peer-deps
npm run build
node scripts/inline-css.mjs
node scripts/verify-build.cjs
node scripts/verify-typert-manifest.mjs
```

`lib/` 已随仓库提供，使用者不需要构建。

## 已知限制

- 工作区文件夹只在「按工作区 / 按工作区树」分组视图显示；单列表与搜索结果保持平铺。
- 显示文件夹层与图标是浏览器本地状态，尚未 Host 持久化。
- 预览版 DSH 不承诺插件 API 跨版本稳定；升级 DSH 时请同步升级插件。

## 许可与致谢

MIT。本项目 fork 自 [dsh-session-keeper](https://github.com/WSNMM3/dsh-session-keeper)（WSNMM3，MIT），其上游为 [ht719/dsh-session-categories](https://github.com/ht719/dsh-session-categories)（MIT）。工作区显示文件夹层、文件夹行、拖拽、图标选择器与会话行缩进为本 fork 新增。详见 `LICENSE` 与 `FORK-NOTES.md`。
