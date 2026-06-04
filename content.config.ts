import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    posts: defineCollection({
      type: 'page',
      source: 'posts/**/*.md',
      schema: z.object({
        title: z.string(),
        date: z.string(),
        tags: z.array(z.string()).default([]),
        description: z.string(),
        coverImage: z.string().optional(),
        coverImageAlt: z.string().optional(),
        featured: z.boolean().default(false),
        published: z.boolean().default(true),
        rawbody: z.string(),
      }),
    }),
    specials: defineCollection({
      type: 'page',
      source: 'specials/**/*.md',
      schema: z.object({
        title: z.string().optional(),
        rawbody: z.string(),
      }),
    }),
  },
})
