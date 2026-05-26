import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const contentDir = join(__dirname, '../content/posts')
const outputPath = join(__dirname, '../public/search-index.json')

interface SearchItem {
  slug: string
  title: string
  titleEn: string
  description: string
  descriptionEn: string
  tags: string[]
  tagsEn: string[]
  date: string
  content: string
}

function buildIndex() {
  try {
    const files = readdirSync(contentDir).filter(f => f.endsWith('.md'))
    const items: SearchItem[] = []

    for (const file of files) {
      const raw = readFileSync(join(contentDir, file), 'utf-8')
      const { data, content } = matter(raw)

      if (data.published === false) continue

      const slug = file.replace('.md', '')

      items.push({
        slug,
        title: data.title || '',
        titleEn: data.titleEn || '',
        description: data.description || '',
        descriptionEn: data.descriptionEn || '',
        tags: data.tags || [],
        tagsEn: data.tagsEn || [],
        date: data.date || '',
        content: content.slice(0, 500),
      })
    }

    writeFileSync(outputPath, JSON.stringify(items), 'utf-8')
    console.log(`Search index generated: ${items.length} posts`)
  } catch (err) {
    console.error('Failed to generate search index:', err)
  }
}

buildIndex()
