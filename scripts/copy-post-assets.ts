import { copyFileSync, existsSync, mkdirSync } from 'node:fs'
import { join, dirname, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { globby } from 'globby'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const PROJECT_ROOT = join(__dirname, '..')

async function main() {
  // 1. 找到所有文章配图（排除 .md 文件）
  console.log('[文章配图复制] 扫描 content/posts/**/assets/ 中的图片...')
  const imagePaths = await globby(
    [
      'content/posts/**/assets/**/*',
      '!content/posts/**/assets/**/*.md',
    ],
    { cwd: PROJECT_ROOT }
  )

  if (imagePaths.length === 0) {
    console.log('[文章配图复制] 未找到需要复制的图片')
    return
  }

  // 2. 确保目标目录存在
  const publicDir = join(PROJECT_ROOT, '.output/public')
  if (!existsSync(publicDir)) {
    mkdirSync(publicDir, { recursive: true })
  }

  // 3. 复制每个文件到 .output/public，保持目录结构
  // content/posts/hello/assets/1.png -> .output/public/posts/hello/assets/1.png
  for (const imagePath of imagePaths) {
    const relativePath = relative('content', imagePath)
    const destPath = join(publicDir, relativePath)

    mkdirSync(dirname(destPath), { recursive: true })
    copyFileSync(join(PROJECT_ROOT, imagePath), destPath)
    console.log(`[文章配图复制] ${imagePath} -> ${relativePath}`)
  }

  console.log(`[文章配图复制] 完成，共复制 ${imagePaths.length} 个文件`)
}

main().catch((err) => {
  console.error('[文章配图复制] 失败:', err)
  process.exit(1)
})
