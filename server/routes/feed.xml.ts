import { readdirSync, readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import matter from 'gray-matter'

export default defineEventHandler(async (event) => {
  const contentDir = join(process.cwd(), 'content/posts')
  const siteUrl = 'https://blog.wattson.dev'

  setHeader(event, 'Content-Type', 'application/rss+xml; charset=utf-8')

  const files = existsSync(contentDir)
    ? readdirSync(contentDir).filter(f => f.endsWith('.md'))
    : []

  const posts = files
    .map(f => {
      const raw = readFileSync(join(contentDir, f), 'utf-8')
      const { data } = matter(raw)
      return { ...data, slug: f.replace('.md', '') }
    })
    .filter((p: any) => p.published !== false)
    .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const items = posts.map((p: any) => `
    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${siteUrl}/zh-CN/posts/${escapeXml(p.slug)}</link>
      <description>${escapeXml(p.description || '')}</description>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <guid isPermaLink="true">${siteUrl}/zh-CN/posts/${escapeXml(p.slug)}</guid>
    </item>
  `).join('\n')

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Wattson's Blog</title>
    <link>${siteUrl}</link>
    <description>个人技术博客 / Personal Tech Blog</description>
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
