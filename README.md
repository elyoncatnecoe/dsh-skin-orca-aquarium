# dsh-skin-orca-aquarium

DeepSeek Harness Web GUI 的**环境皮肤插件**：把 orca-aquarium 的 three.js 海洋场景作为
**可穿透的点击层**铺在整个界面背后，界面文字、卡片与交互始终在上层。

仓库命名遵循 `<生态>-<类型>-<主题>`：`dsh`（DeepSeek Harness）· `skin`（皮肤类插件）·
`orca-aquarium`（主题）。

## 效果

- **双套配色**，均取自参考截图实测，而非目测：
  - 夜间墨蓝（216–220° 色相）：行板 `#4c648c`、未选中 chip `#455d7b`、
    侧栏 `#3f4b63`、文字 `#eaf3fb`、强调色 `#5b9bc1`
  - 日间淡青：卡片 `#cfe7ed`、chip `#b1d5e1`、文字 `#1d3348`、强调色 `#2f7d99`
- **侧栏水波纹暗纹**：生成式可平铺正弦波，周期整除图块宽、首尾行配对，横竖均无接缝。
- 锦鲤 / 荷叶剪影与角落暖光，全部为静态绘制，样式表里没有任何动画。
- 明暗切换时水族馆主题跟随（`deep` / `tropical`）。

## 层次结构（由下至上）

1. **the sea** — 固定层（`z-index: -1`），穿透点击：厂商场景 → 角落暖光 → 锦鲤剪影
2. **the plates** — 近不透明表面，承载参考配色；侧栏额外绘制水波纹暗纹
3. **the app** — 文字、卡片、输入框，完整可交互

只有 `--dsw-alias-bg-base` 是半透明的「窗口」，让水族馆透出来；其余板面约
`.88–.94` 不透明，这样颜色不会被身后不断变化的 3D 场景带偏。

## 目录

| 路径 | 作用 |
| --- | --- |
| `src/client.js` | **唯一源码**。改这里，然后构建 |
| `lib/client.js` | 构建产物，运行时实际加载的文件（故一并入库） |
| `lib/vendor/orca-embed.js` | 内联的 orca-aquarium 场景（含 three.js） |
| `scripts/build-client.mjs` | 把 vendor 注入源码模板，生成 `lib/client.js` |
| `cordis.patch.yml` | Cordis bundle patch，注册插件行 |
| `locale/` · `icon.svg` | 插件元信息与图标 |
| `lib/index.js` | Host 半（无逻辑，仅用于插件在管理器中可见） |

## 构建

无需安装依赖，只需 Node：

```bash
node scripts/build-client.mjs
# 或
npm run build
```

改完 `src/client.js` **必须**重新构建，运行时加载的是 `lib/client.js`。

## 安装

作为本地包接入 Harness profile 的 Cordis bundle 机制。`package.json` 的
`dsh.bundle.patch` 指向 `cordis.patch.yml`，后者插入插件行：

```yaml
- insert:
    - id: orca-aquarium-backdrop
      name: '@local/orca-aquarium-backdrop'
```

Client 半声明 `platform: web`、`immediately: true`，并注入
`@deepseek-ai/dsh-client-ui-layout` 与 `@deepseek-ai/dsh-client-ui-theme`。

## 实现要点（踩过的坑，留档）

- **quality 必须是完整对象**：`mountOrca` 用 `options.quality ?? resolveQuality()`，
  传字符串会让 `maxPixelRatio` 为 `undefined` → `NaN` → canvas 宽高为 0，
  场景根本不渲染，bloom / 调色通道也被静默跳过。
- **走 `theme.overrideTokens`**，用 `{ light, dark }` 覆盖 token，而不是
  `!important` 样式表覆盖。除了 alias 层，还覆盖了 8 个 `--dsw-specific-*`
  （气泡、菜单、输入框、选中态等），否则聊天气泡仍是出厂配色。
- **不使用 `backdrop-filter`**：它会让元素成为 `position: fixed` 后代的包含块。
  shell 的 Tooltip 正是 fixed，曾被重新锚定到侧栏 padding box 并被
  `overflow: hidden` 裁切，压在品牌行上。
- **侧栏表面用几何求得**：`paintSurface()` 取「被列盒子包含且覆盖它 ≥90%」的
  最深后代；暗纹 CSS 也限定在 `[frame] > [plate=sidebar] [sidebar-plate]`。
  早期用 `firstElementChild` 猜，结果标签落在 out-of-flow 节点上，
  平铺图案铺满了整个工作区。
- **相机跟随 + 包一层 `resize`**：厂商运行时降级（`degrade()`）会调 `resize()`
  并重新取景，与跟随机位不同；若不即时夺回，那一帧会被合成，表现为「放着
  不动突然抖一下」。
- 无 WebGL 时静默降级，不影响界面功能。

## 兼容

现代 Chromium / Electron（Harness Web GUI），需 WebGL。插件依赖 shell 的
`data-shell-overlay`、`data-orca-*` 标签与 `theme` 服务；shell 结构大幅变更时
需重新核对 `tagPlates()`。

## 许可

尚未指定开源许可证。`lib/vendor/orca-embed.js` 来自本地
`orca-aquarium-shell` 项目，其内含 three.js，分发前请一并确认各自许可。
