export interface Friend {
  name: string
  nameEn: string
  url: string
  avatar: string
  description: string
  descriptionEn: string
}

export const friends: Friend[] = [
  {
    name: 'Vue.js 中文文档',
    nameEn: 'Vue.js Docs (CN)',
    url: 'https://cn.vuejs.org',
    avatar: '',
    description: 'Vue.js 官方中文文档，最好的 Vue 学习资源',
    descriptionEn: 'Official Vue.js Chinese documentation, the best resource for learning Vue',
  },
  {
    name: 'Nuxt 中文文档',
    nameEn: 'Nuxt Docs (CN)',
    url: 'https://nuxt.com.cn',
    avatar: '',
    description: 'Nuxt.js 中文社区文档站',
    descriptionEn: 'Nuxt.js Chinese community documentation site',
  },
  {
    name: 'Tailwind CSS',
    nameEn: 'Tailwind CSS',
    url: 'https://tailwindcss.com',
    avatar: '',
    description: '实用优先的 CSS 框架',
    descriptionEn: 'A utility-first CSS framework',
  },
]
