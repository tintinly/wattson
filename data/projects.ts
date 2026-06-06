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
    image: 'images/avatar.webp',
  },
  {
    name: 'Nuxt.js',
    nameEn: 'Nuxt.js',
    description: '用Vue构建快速、生产准备的网页应用。基于文件的路由、自动导入和服务器端渲染——开箱即用。',
    descriptionEn: 'Build fast, production-ready web apps with Vue. File-based routing, auto-imports, and server-side rendering — all configured out of the box.',
    url: 'https://nuxt.com/',
    github: 'https://github.com/nuxt/nuxt',
    techStack: ['TypeScript'],
    image: 'https://github.com/nuxt/nuxt/raw/main/.github/assets/banner.svg',
  }
]
