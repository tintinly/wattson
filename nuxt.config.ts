// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'
import contentImages from './app/remark/content-images'
import tocPlaceholder from './app/remark/toc-placeholder'
import customContainer from './app/remark/custom-container'
import restoreBrackets from './app/rehype/restore-brackets'
import { rehypeGithubAlerts } from 'rehype-github-alerts'
import remarkSupSub from './app/remark/sup-sub'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import { execSync } from 'node:child_process'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  devServer: {
    host: '0.0.0.0', // 允许所有 IP 访问
    port: 3000 // 设置端口号
  },

  // 目标：SSG 静态站点
  ssr: true,

  modules: [
    '@nuxt/content',
    '@nuxtjs/i18n',
    '@nuxtjs/color-mode',
    '@nuxtjs/sitemap',
    '@nuxt/icon',
    '@nuxt/image',
  ],

  // @nuxt/content 配置
  content: {
    build: {
      markdown: {
        highlight: {
          theme: {
            default: 'github-light',
            dark: 'github-dark',
            light: 'github-light',
          },
          langs: ['json','http', 'js', 'javascript', 'ts', 'typescript', 'html', 'css', 'vue', 
            'shell', 'bash', 'cmd', 'mdc', 'md', 'markdown', 'yml', 'yaml', 'xml', 'ini', 'nginx', 
            'c', 'cpp', 'java', 'python', 'go', 'php', 'sql' ],
        },
        remarkPlugins: {
          // 文章目录插件（将 [TOC] 替换为目录 HTML）
          'toc-placeholder': {
            instance: tocPlaceholder,
            src: '~/remark/toc-placeholder',
          },
          // 上/下标插件（19^th^ → <sup>、H~2~O → <sub>）
          'sup-sub': {
            instance: remarkSupSub,
            src: '~/remark/sup-sub',
          },
          // LaTeX 数学公式（$...$ 行内 / $$...$$ 块级）
          'remark-math': {
            instance: remarkMath,
            options: {
              singleDollarTextMath: true,   // $...$ → 行内公式
            },
          },
          // 自定义容器插件（::: info / ::: warning 等 VitePress 风格）
          'custom-container': {
            instance: customContainer,
            src: '~/remark/custom-container',
          },
          // 文章图片路径重写：相对路径 → 根路径绝对路径 /posts/slug/assets/img.png
          'content-images': {
            instance: contentImages,
            src: '~/remark/content-images',
          },
        },
        rehypePlugins: {
          // MDC 无属性 <span> 还原为 [原文]（CommonMark 标准行为）
          'restore-brackets': {
            instance: restoreBrackets,
            src: '~/rehype/restore-brackets',
          },
          'rehype-github-alerts': {
            instance: rehypeGithubAlerts,
          },
          // KaTeX 公式渲染
          'rehype-katex': {
            instance: rehypeKatex,
          },
        },
      },
    },
    renderer: {
      alias: {
        // 自定义 prose-组件 若是 ProseImg、 ProseA等组件则无需注册
      },
    },
  },

  // @nuxtjs/i18n 配置
  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'zh-CN',
    locales: [
      { code: 'zh-CN', name: '简体中文', iso: 'zh-CN', file: 'zh-CN.json' },
      { code: 'en-US', name: 'English', iso: 'en-US', file: 'en-US.json' },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'wattson-locale',
      alwaysRedirect: false,
    },
  },

  // @nuxtjs/color-mode 配置（cookie 存储 → SSR 可读，避免水合不匹配）
  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light',
    storageKey: 'wattson-color-mode',
    storage: 'cookie',
  },

  // Tailwind CSS v4 (Vite 插件)
  vite: {
    plugins: [tailwindcss()],
  },

  css: [ 
    'rehype-github-alerts/styling/css/index.css',
    'katex/dist/katex.min.css',
    '~/assets/css/main.css',
  ],

  // @nuxt/icon 配置：CSS 模式避免 SVG 基线偏移
  icon: {
    mode: 'svg',
  },

  // 组件自动导入配置：取消目录前缀
  components: [
    { path: '~/components/layout', pathPrefix: false },
    { path: '~/components/blog', pathPrefix: false },
    { path: '~/components/ui', pathPrefix: false },
    { path: '~/components/icons', pathPrefix: false },
    { path: '~/components/content', pathPrefix: false },
  ],

  // 页面过渡动画
  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in',
    },
  },

  // Nuxt Content 是否使用 view transition 特性
  experimental: {
    viewTransition: false,
  },

  hooks: {
    // 构建前：生成搜索索引 + 字体子集
    'build:before': () => {
      console.log('[搜索索引] 构建前开始生成搜索索引...')
      execSync('npx tsx scripts/generate-search-index.ts', { stdio: 'inherit' })
      console.log('[字体子集化] 构建前开始生成字体子集...')
      execSync('npx tsx scripts/subset-font.ts', { stdio: 'inherit' })
    },

    // 构建后：复制文章配图到输出目录
    'close': async () => {
      console.log('[文章配图复制] 构建后开始复制文章配图...')
      execSync('npx tsx scripts/copy-post-assets.ts', { stdio: 'inherit' })
    }
  }
})
