// usePosts — Nuxt Content v3 文章查询 composable
// 按 locale 筛选文章：zh-CN 取 zh-cn.md，en-US 取 en-us.md，无英文版时降级到中文
export async function usePosts(locale: string = 'zh-CN') {
  const { data: posts } = await useAsyncData('posts', async () => {
    return await queryCollection('posts')
      .order('date', 'DESC')
      .all()
  })

  const localized = computed(() => {
    if (!posts.value) return []

    // 按文件夹名（slug）分组
    const groups = new Map<string, any[]>()
    for (const p of posts.value) {
      const slug = (p.path || '').replace('/posts/', '').replace(/\/(zh-cn|en-us)$/, '')
      if (!groups.has(slug)) groups.set(slug, [])
      groups.get(slug)!.push(p)
    }

    // 每组选择最佳匹配
    const selected: any[] = []

    for (const [slug, groupPosts] of groups) {
      // 优先找语言匹配的
      let match = groupPosts.find((p: any) => p.path.endsWith(`/${locale.toLowerCase()}`))
      let postLocale = locale

      // 无匹配时降级到 zh-cn
      if (!match) {
        match = groupPosts.find((p: any) => p.path.endsWith('/zh-cn'))
        postLocale = 'zh-CN'
      }

      if (!match) continue

      // 估算字数：去除 frontmatter 头部后，中文一字一字符，英文按空格分词
      const rawText = match.rawbody || ''
      const bodyText = rawText.replace(/^---[\s\S]*?---\n*/, '')
      const chineseChars = bodyText.replace(/[^一-鿿]/g, '').length
      const isChinese = chineseChars > bodyText.length * 0.15
      const wordCount = isChinese
        ? bodyText.replace(/\s/g, '').length
        : bodyText.split(/\s+/).filter(Boolean).length
      const readingTime = Math.max(1, Math.ceil(wordCount / (isChinese ? 300 : 200)))

      selected.push({
        ...match,
        _title: match.title,
        _description: match.description,
        _tags: match.tags || [],
        _slug: slug,
        _date: new Date(match.date),
        _wordCount: wordCount,
        _readingTime: readingTime,
        _locale: postLocale
      })
    }

    // 按日期降序排序
    selected.sort((a, b) => b._date.getTime() - a._date.getTime())
    return selected
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
