export const siteConfig = {
  author: {
    name: '沃特森',
    nameEn: 'Wattson',
    avatar: '/images/avatar.webp',
    bio: '当你知道如何控制光明，就不会害怕黑暗',
    bioEn: "You can't be afraid of the dark when you know how to control the light",
    url: 'https://home.wattson.dev',
  },

  site: {
    title: "沃特森的博客",
    titleEn: "Wattson's Blog",
    description: '个人技术博客',
    descriptionEn: 'Personal Tech Blog',
    url: 'https://blog.wattson.dev',
    startDate: '2026-05-22',
    since: '2026',
  },

  filings: [
    {
      type : 'beian',
      icp: '粤ICP备2077000000号',
      url: 'https://beian.miit.gov.cn/',
    },
    {
      type : 'moe',
      icp: '萌ICP备20770000号',
      url: 'https://icp.gov.moe/?keyword=20770000',
    }
  ],

  techStack: [
    { name: 'Nuxt 4', url: 'https://nuxt.com' },
    { name: 'Tailwind CSS', url: 'https://tailwindcss.com' },
    { name: 'TypeScript', url: 'https://www.typescriptlang.org' },
    { name: 'Vue 3', url: 'https://vuejs.org' },
  ],

  social: [
    { type: 'link', name: 'github', url: 'https://github.com', icon: 'tabler:brand-github' },
    { type: 'link', name: 'bilibili', url: 'https://www.bilibili.com', icon: 'tabler:brand-bilibili' },
    { type: 'account', name: 'qq', number: '00000000', icon: 'ri:qq-line' },
    { type: 'account', name: 'wechat', number: '000000000', icon: 'tabler:brand-wechat' },
    { type: 'link', name: 'email', url: 'mailto:wattson@example.com', icon: 'tabler:mail' },
  ],

  rss: '/feed.xml',
}
