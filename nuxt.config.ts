// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // 目标：SSG 静态站点
  ssr: true,

  modules: [
    '@nuxt/content',
    '@nuxtjs/i18n',
    '@nuxtjs/color-mode',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/sitemap',
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
    markdown: {
      remarkPlugins: [],
      rehypePlugins: {
        // KaTeX 数学公式支持
        'rehype-katex': {},
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
      cookieKey: 'tintin-blog-locale',
      alwaysRedirect: false,
    },
  },

  // @nuxtjs/color-mode 配置
  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light',
    storageKey: 'tintin-blog-color-mode',
  },

  // Tailwind CSS 配置
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: 'tailwind.config.ts',
  },

  // 组件自动导入配置：取消目录前缀
  components: [
    { path: '~/components/layout', pathPrefix: false },
    { path: '~/components/blog', pathPrefix: false },
    { path: '~/components/ui', pathPrefix: false },
    { path: '~/components/icons', pathPrefix: false },
  ],

  // Nuxt Content 需要启用文件监听
  experimental: {
    viewTransition: true,
  },
})
