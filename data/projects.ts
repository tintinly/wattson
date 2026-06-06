export interface Project {
  name: string
  nameEn: string
  description: string
  descriptionEn: string
  url: string
  github: string
  techStack: string[]
  image: string
}

export const projects: Project[] = [
  {
    name: 'Wattson',
    nameEn: 'Wattson',
    description: '基于 Nuxt 4 的现代化个人技术博客。',
    descriptionEn: 'A modern personal tech blog built with Nuxt 4.',
    url: '',
    github: 'https://github.com/tintinly/wattson',
    techStack: ['Nuxt 4', 'Vue 3', 'TypeScript', 'Tailwind CSS'],
    image: '',
  },
  {
    name: 'Nuxt.js',
    nameEn: 'Nuxt.js',
    description: '用Vue构建快速、生产准备的网页应用。基于文件的路由、自动导入和服务器端渲染——开箱即用。',
    descriptionEn: 'Build fast, production-ready web apps with Vue. File-based routing, auto-imports, and server-side rendering — all configured out of the box.',
    url: 'https://nuxt.com/',
    github: 'https://github.com/wattson/vue-starter',
    techStack: ['Vue 3', 'Vite'],
    image: '',
  },
  {
    name: 'Tailwind CSS',
    nameEn: 'Tailwind CSS',
    description: '只需书写 HTML 代码，无需书写 CSS，即可快速构建美观的网站。',
    descriptionEn: 'Rapidly build modern websites without ever leaving your HTML.',
    url: 'https://tailwindcss.com/',
    github: 'https://github.com/tailwindlabs/tailwindcss',
    techStack: ['TypeScript', 'Rust'],
    image: '',
  },
  {
    name: 'Vue.js',
    nameEn: 'Vue.js',
    description: '一个易于使用、高性能和多功能的框架，用于构建web用户界面。',
    descriptionEn: 'An approachable, performant and versatile framework for building web user interfaces.',
    url: 'https://vuejs.org/',
    github: 'https://github.com/vuejs',
    techStack: ['TypeScript'],
    image: '',
  },
]
