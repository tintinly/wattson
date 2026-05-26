// usePosts — Nuxt Content v3 文章查询 composable
export async function usePosts(locale: string) {
  const { data: posts } = await useAsyncData('posts', async () => {
    return await queryCollection('posts')
      .order('date', 'DESC')
      .all()
  })

  // 按 locale 选择对应语言字段
  const localized = computed(() => {
    if (!posts.value) return []
    return posts.value.map((p: any) => ({
      ...p,
      _title: locale === 'en-US' ? p.titleEn : p.title,
      _description: locale === 'en-US' ? p.descriptionEn : p.description,
      _tags: (locale === 'en-US' ? p.tagsEn : p.tags) || [],
      _slug: (p.path || '').replace('/posts/', ''),
      _date: new Date(p.date),
    }))
  })

  const featured = computed(() =>
    localized.value.filter((p: any) => p.featured === true)
  )

  const latest = computed(() =>
    localized.value.slice(0, 10)
  )

  const allTags = computed(() => {
    const tagMap = new Map<string, number>()
    for (const p of localized.value) {
      for (const tag of (p._tags || [])) {
        tagMap.set(tag, (tagMap.get(tag) || 0) + 1)
      }
    }
    return Array.from(tagMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
  })

  function byTag(tag: string) {
    return localized.value.filter((p: any) => p._tags.includes(tag))
  }

  function bySlug(slug: string) {
    return localized.value.find((p: any) => p._slug === slug)
  }

  return {
    posts: localized,
    featuredPosts: featured,
    latestPosts: latest,
    allTags,
    getPostsByTag: byTag,
    getPostBySlug: bySlug,
  }
}
