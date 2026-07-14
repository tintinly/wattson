import { siteConfig } from '../../app/data/site-config'
// queryCollection 由 @nuxt/content 在 Nitro 端自动导入，签名 (event, collection)

export default defineEventHandler(async (event) => {
  const siteUrl = siteConfig.site.url

  setHeader(event, 'Content-Type', 'application/xml; charset=utf-8')

  // 通过 queryCollection 获取文章（与 usePosts 同一数据源，共享 Content 层缓存）
  const allPosts = await queryCollection(event, 'posts')
    .order('date', 'DESC')
    .all()

  // 按 slug 分组：每篇文章目录下可能有 zh-cn.md / en-us.md，优先取中文版
  const groups = new Map<string, any>()
  for (const p of allPosts) {
    if (p.published === false) continue
    const slug = (p.path || '').replace('/posts/', '').replace(/\/(zh-cn|en-us)$/, '')
    const existing = groups.get(slug)
    if (!existing || p.path.endsWith('/zh-cn')) {
      groups.set(slug, { ...p, _slug: slug })
    }
  }

  const posts = Array.from(groups.values())
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const items = posts.map((p: any) =>
    `<item>
      <title>${escapeXml(p.title)}</title>
      <link>${siteUrl}/posts/${escapeXml(p._slug)}</link>
      <description>${escapeXml(p.description || '')}</description>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <guid isPermaLink="true">${siteUrl}/posts/${escapeXml(p._slug)}</guid>
    </item>
    `).join('')

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteConfig.site.title)}</title>
    <link>${siteUrl}</link>
    <description>${escapeXml(siteConfig.site.description)} / ${escapeXml(siteConfig.site.descriptionEn)}</description>
    <language>zh-CN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`

  return feed
})

function escapeXml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}
