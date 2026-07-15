# Wattson

个人技术博客，基于 Nuxt 4 构建的个人技术博客。

示例地址：暂无
我的博客地址：[https://blog.tintinly.top](https://blog.tintinly.top)

## 特性

- 📝 **Nuxt Content v3** — 基于文件的 Markdown 内容管理，每篇文章中英文分文件
- 🌍 **双语支持** — 中英双语切换，英文缺失时自动降级到中文
- 🔍 **全文搜索** — 基于 Fuse.js 的模糊搜索，构建时预生成 JSON 索引
- 🎨 **暗色模式** — 支持亮色/暗色主题切换
- 📡 **RSS 订阅** — 自动生成 RSS Feed
- 📐 **数学公式** — KaTeX 数学公式渲染
- 📊 **图表支持** — Mermaid 流程图/时序图等
- 🖼️ **图片优化** — Nuxt Image 图片处理 + 自定义内容媒体服务 + 图片点击放大
- ⚡ **静态生成** — 全站 SSG，部署于 VPS + Nginx

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | Nuxt 4 + Vue 3 + TypeScript |
| CSS | Tailwind CSS v4 + @tailwindcss/typography |
| 内容 | @nuxt/content v3 + Remark + Gray Matter |
| 国际化 | @nuxtjs/i18n v10 |
| 搜索 | Fuse.js |
| 图表 | Mermaid + KaTeX |
| 图标 | @nuxt/icon（Tabler Icons） |
| 部署 | VPS + Nginx UI + GitHub Actions |

## 开发

```bash
npm install           # 安装依赖
npm run dev           # 启动开发服务器
npm run build         # 构建生产版本
npm run generate      # 生成静态文件
npm run preview       # 预览构建结果
```

## 文章写作

每篇文章一个独立目录，包含语言变体和可选配图：

```
content/posts/<slug>/
├── zh-cn.md          # 中文版
├── en-us.md          # 英文版（可选，缺失时降级到中文）
└── assets/           # 文章配图（可选）
    └── cover.png
```

文章 Frontmatter 示例：

```yaml
---
title: 文章标题
date: 2026-07-15
tags: [Vue, Nuxt]
category: 前端
description: 文章摘要
featured: true         # 置顶（可选）
coverImage: cover.png  # 封面图（可选）
published: false       # 草稿（可选）
---
```

## 项目结构

```
wattson/
├── app/
│   ├── components/
│   │   ├── layout/       # 布局组件（Header, Footer, MobileNav）
│   │   ├── blog/         # 博客组件（PostCard, Timeline, TOC 等）
│   │   ├── ui/           # 通用 UI（ThemeToggle, SearchDialog 等）
│   │   ├── content/      # 内容渲染（ProseImg, ProsePre, Mermaid 等）
│   │   └── icons/        # 图标组件
│   ├── composables/      # 可组合函数（usePosts, useSearch, useToast）
│   ├── layouts/          # 页面布局
│   ├── pages/            # 页面路由
│   ├── remark/           # Remark 插件（图片路径重写）
│   └── types/            # TypeScript 类型定义
├── content/
│   ├── posts/            # 博客文章
│   └── specials/         # 特殊页面（关于页）
├── i18n/locales/         # 翻译文件（zh-CN / en-US）
├── scripts/              # 构建脚本（搜索索引、字体子集化）
├── server/routes/        # 服务端路由（RSS, 内容媒体代理）
└── public/               # 静态资源
```

## 许可证

[MIT](LICENSE)

## 灵感来源

- 名称及内容示例： Apex 英雄角色"沃特森"。
- 主题参考：[saicaca/fuwari: ✨A static blog template built with Astro.](https://github.com/saicaca/fuwari)
- UI 参考：[Motues/Momo: A nimimal blog template build with Astro | 一个极简的Blog模板，使用 Astro 搭建](https://github.com/Motues/Momo)