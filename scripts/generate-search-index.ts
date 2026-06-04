import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs'
import { join, dirname, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const contentDir = join(__dirname, '../content/posts')
const outputPath = join(__dirname, '../public/search-index.json')

interface SearchItem {
  slug: string
  title: string
  description: string
  tags: string[]
  date: string
  content: string
}

// 递归查找所有 .md 文件
function findMdFiles(dir: string): string[] {
  const results: string[] = []
  const entries = readdirSync(dir)
  for (const entry of entries) {
    const fullPath = join(dir, entry)
    if (statSync(fullPath).isDirectory()) {
      results.push(...findMdFiles(fullPath))
    } else if (entry.endsWith('.md')) {
      results.push(fullPath)
    }
  }
  return results
}

function buildIndex() {
  try {
    const files = findMdFiles(contentDir)
    const items: SearchItem[] = []

    for (const filepath of files) {
      const raw = readFileSync(filepath, 'utf-8')
      const { data, content } = matter(raw)

      if (data.published === false) continue

      // 计算 slug：相对路径去掉 /zh-cn 或 /en-us 后缀，再去掉扩展名
      const relPath = relative(contentDir, filepath).replace(/\\/g, '/')
      const slug = relPath.replace(/\.md$/, '').replace(/\/(zh-cn|en-us)$/, '')

      items.push({
        slug,
        title: data.title || '',
        description: data.description || '',
        tags: data.tags || [],
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
