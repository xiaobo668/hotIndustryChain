# K线教学 Space

本目录为 **K线教学** 模块的内容规范与维护工作台数据源，便于后续增量添加课程正文、图表与分享素材。

## 目录

| 文件 | 用途 |
|------|------|
| `space.js` | Space 元数据、字段规范、章节登记、变更记录（**维护主入口**） |
| `render.js` | Space 界面渲染（由 `ui.js` 调用） |

## 关联文件（模块根目录）

| 路径 | 用途 |
|------|------|
| `js/kline/outline.js` | 六大部分结构、`chapters` 挂载 |
| `js/kline/content/part-*-ch-*.js` | 各章正文（如 `part-1-ch-1.js` = 第一部分第一章 MACD） |
| `js/kline/share.js` | 分享链接与文案 |
| `js/kline/render.js` | 章节与分享卡片展示 |
| `share/kline.html` | 独立分享页 |

## 新增内容流程

1. 在 `space.js` 的 `partsRegistry` 中更新该章 `status` / `notes`。
2. 在 `outline.js` 对应 `part` 下补充 `sections`、`sharePoints`。
3. 在 `changelog` 追加一条变更说明。
4. 浏览器打开 **K线教学 → K线 Space**，核对清单与规范。
5. 在章节内使用 **分享模块** 验证链接与卡片。

## 章节 ID 约定

- `part-1` … `part-6`：与 `outline.js` 中 `parts[].id` 一致，勿改 ID（分享链接依赖此字段）。
