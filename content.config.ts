import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    posts: defineCollection({
      type: 'page',
      source: 'posts/**/*.md',
      schema: z.object({
        title: z.string(),
        titleEn: z.string(),
        date: z.string(),
        tags: z.array(z.string()).default([]),
        tagsEn: z.array(z.string()).default([]),
        description: z.string(),
        descriptionEn: z.string(),
        coverImage: z.string().optional(),
        coverImageAlt: z.string().optional(),
        featured: z.boolean().default(false),
        published: z.boolean().default(true),
      }),
    }),
    content: defineCollection({
      type: 'page',
      source: '*.md',
      schema: z.object({
        title: z.string().optional(),
        titleEn: z.string().optional(),
      }),
    }),
  },
})
