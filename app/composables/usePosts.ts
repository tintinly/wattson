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
    return posts.value.map((p: any) => {
      // 估算字数：去除 frontmatter 头部后，中文一字一字符，英文按空格分词
      const rawText = p.rawbody || ''
      const bodyText = rawText.replace(/^---[\s\S]*?---\n*/, '')
      const wordCount = locale === 'en-US'
        ? bodyText.split(/\s+/).filter(Boolean).length
        : bodyText.replace(/\s/g, '').length
      const readingTime = Math.max(1, Math.ceil(wordCount / (locale === 'en-US' ? 200 : 300)))

      return {
        ...p,
        _title: locale === 'en-US' ? p.titleEn : p.title,
        _description: locale === 'en-US' ? p.descriptionEn : p.description,
        _tags: (locale === 'en-US' ? p.tagsEn : p.tags) || [],
        _slug: (p.path || '').replace('/posts/', ''),
        _date: new Date(p.date),
        _wordCount: wordCount,
        _readingTime: readingTime,
      }
    })
  })

  const featuredPosts = computed(() =>
    localized.value.filter((p: any) => p.featured === true)
  )

  const latestPosts = computed(() =>
    localized.value.slice(0, 10)
  )

  const homePosts = computed(() => {
    return localized.value.sort((a, b) => b.featured - a.featured)
  })

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
    featuredPosts,
    homePosts,
    latestPosts,
    allTags,
    getPostsByTag: byTag,
    getPostBySlug: bySlug,
  }
}
