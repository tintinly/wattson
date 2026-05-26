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
    name: 'Wattson Blog',
    nameEn: 'Wattson Blog',
    description: '基于 Nuxt 4 的现代化个人技术博客，支持中英双语和暗色模式',
    descriptionEn: 'A modern personal tech blog built with Nuxt 4, supporting i18n and dark mode',
    url: 'https://blog.wattson.dev',
    github: 'https://github.com/wattson/wattson',
    techStack: ['Nuxt 4', 'Vue 3', 'TypeScript', 'Tailwind CSS'],
    image: '',
  },
  {
    name: 'Vue Starter Kit',
    nameEn: 'Vue Starter Kit',
    description: '开箱即用的 Vue 3 项目模板，集成 ESLint、Prettier、Vitest 等工具',
    descriptionEn: 'Ready-to-use Vue 3 project template with ESLint, Prettier, Vitest and more',
    url: '',
    github: 'https://github.com/wattson/vue-starter',
    techStack: ['Vue 3', 'Vite', 'TypeScript', 'Vitest'],
    image: '',
  },
]
