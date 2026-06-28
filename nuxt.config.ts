// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'
import contentImages from './app/remark/content-images'

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
            src: '../app/remark/content-images',
          },
        },
        rehypePlugins: {},
      },
    },
    renderer: {
      alias: {
        // 自定义 prose-img 组件：/_content-media/ 路径跳过 IPX 处理
        img: 'ContentProseImg',
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

  // Nuxt Content 需要启用文件监听
  experimental: {
    viewTransition: true,
  },
})
