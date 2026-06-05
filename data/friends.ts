export interface Friend {
  name: string
  nameEn: string
  url: string
  avatar: string
  introduction: string
  introductionEn: string
}

export const friends: Friend[] = [
  {
    name: '沃特森',
    nameEn: 'Wattson',
    url: '',
    avatar: 'images/avatar.webp',
    introduction: '当你知道如何控制光明，就不会害怕黑暗。',
    introductionEn: 'When you know how to control the light, you won\'t be afraid of the dark.',
  },
  {
    name: 'Nuxt.js',
    nameEn: 'Nuxt.js',
    url: 'https://nuxt.com/',
    avatar: 'https://avatars.githubusercontent.com/u/23360933',
    introduction: '一个全栈 Vue 框架。',
    introductionEn: 'The Full-Stack Vue Framework',
  },{
    name: 'Tailwind CSS',
    nameEn: 'Tailwind CSS',
    url: 'https://tailwindcss.com/',
    avatar: 'https://avatars.githubusercontent.com/u/67109815',
    introduction: '只需书写 HTML 代码，无需书写 CSS，即可快速构建美观的网站。',
    introductionEn: 'Rapidly build modern websites without ever leaving your HTML.',
  },
  {
    name: 'Vue.js',
    nameEn: 'Vue.js',
    url: 'https://vuejs.org/',
    avatar: 'https://avatars.githubusercontent.com/u/6128107',
    introduction: '易学易用，性能出色，适用场景丰富的 Web 前端框架。',
    introductionEn: 'An approachable, performant and versatile framework for building web user interfaces.',
  },
]
