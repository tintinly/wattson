// 文章类型
export interface PostFrontmatter {
  title: string
  titleEn: string
  date: string
  tags: string[]
  tagsEn: string[]
  description: string
  descriptionEn: string
  coverImage?: string
  coverImageAlt?: string
  featured?: boolean
  published?: boolean
}

export interface Post extends PostFrontmatter {
  slug: string
  path: string
  readingTime: number
  year: number
  month: number
  day: number
}

// Content Collection 返回的原始类型
export interface PostContent {
  id: string
  path: string
  title: string
  titleEn: string
  date: string
  tags: string[]
  tagsEn: string[]
  description: string
  descriptionEn: string
  coverImage?: string
  coverImageAlt?: string
  featured?: boolean
  published?: boolean
  body?: string
  rawbody?: string
  excerpt?: object
}

// 友链
export interface Friend {
  name: string
  nameEn: string
  url: string
  avatar: string
  introduction: string
  introductionEn: string
}

// 项目
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

// 标签统计
export interface TagCount {
  name: string
  count: number
}
