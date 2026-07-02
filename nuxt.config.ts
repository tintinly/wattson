// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'
import contentImages from './app/plugins/remark/content-images'
import tocPlaceholder from './app/plugins/remark/toc-placeholder'
import restoreBrackets from './app/plugins/rehype/restore-brackets'

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
    highlight: {
      theme: {
        default: 'github-light',
        dark: 'github-dark',
      },
      preload: ['ts', 'js', 'vue', 'html', 'css', 'json', 'bash', 'md', 'yaml'],
    },
    build: {
      markdown: {
        remarkPlugins: {
          // 相对路径图片支持（将 Markdown 中 assets/img.png → /_content-media/...）
          'content-images': {
            instance: contentImages,
            src: '~/plugins/remark/content-images',
          },
          // 文章目录插件（将 [TOC] 替换为目录 HTML）
          'toc-placeholder': {
            instance: tocPlaceholder,
            src: '~/plugins/remark/toc-placeholder',
          },
        },
        rehypePlugins: {
          // MDC 无属性 <span> 还原为 [原文]（CommonMark 标准行为）
          'restore-brackets': {
            instance: restoreBrackets,
            src: '~/plugins/rehype/restore-brackets',
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
    lazy: true,
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

  css: ['~/assets/css/main.css'],

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
})
