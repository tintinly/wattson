import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs'
import { join } from 'node:path'
import matter from 'gray-matter'
import { siteConfig } from '../../data/site-config'

export default defineEventHandler(async (event) => {
  const contentDir = join(process.cwd(), 'content/posts')
  const siteUrl = siteConfig.site.url

  setHeader(event, 'Content-Type', 'application/rss+xml; charset=utf-8')

  // 递归查找子目录中的 .md 文件，以父目录名作为 slug
  const files: { path: string; slug: string }[] = []
  if (existsSync(contentDir)) {
    const entries = readdirSync(contentDir)
    for (const entry of entries) {
      const entryPath = join(contentDir, entry)
      if (statSync(entryPath).isDirectory()) {
        const mdFiles = readdirSync(entryPath).filter(f => f.endsWith('.md'))
        // 取第一个 .md 文件（通常是 zh-cn.md），用目录名作为 slug
        const firstMd = mdFiles[0]
        if (firstMd) {
          files.push({ path: join(entryPath, firstMd), slug: entry })
        }
      } else if (entry.endsWith('.md')) {
        // 兼容扁平结构：content/posts/xxx.md
        files.push({ path: entryPath, slug: entry.replace('.md', '') })
      }
    }
  }

  const posts = files
    .map(f => {
      const raw = readFileSync(f.path, 'utf-8')
      const { data } = matter(raw)
      return { ...data, slug: f.slug }
    })
    .filter((p: any) => p.published !== false)
    .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const items = posts.map((p: any) => 
    `<item>
      <title>${escapeXml(p.title)}</title>
      <link>${siteUrl}/posts/${escapeXml(p.slug)}</link>
      <description>${escapeXml(p.description || '')}</description>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <guid isPermaLink="true">${siteUrl}/posts/${escapeXml(p.slug)}</guid>
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
