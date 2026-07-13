import { readFileSync, existsSync } from 'node:fs'
import { join, extname } from 'node:path'

/**
 * 内容图片中间件
 *
 * 拦截 /posts/**\/assets/** 请求，按优先级查找并返回图片文件：
 * 1. public/ 目录（SSG 构建产物 / preview 模式）
 * 2. content/ 目录（dev 模式源文件）
 *
 * 两侧均未找到则返回 404。
 */

const MIME_TYPES: Record<string, string> = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.bmp': 'image/bmp',
  '.ico': 'image/x-icon',
}

export default defineEventHandler(async (event) => {
  const path = event.path

  // 仅处理 /posts/**/assets/** 的图片请求
  if (!/^\/posts\/.+\/assets\//.test(path)) return

  // 构建 public/ 和 content/ 的完整路径
  const publicPath = join(process.cwd(), 'public', path)
  const contentPath = join(process.cwd(), 'content', path)

  // 确定实际文件路径：优先 public/（SSG 构建产物），其次 content/（dev 模式源文件）
  let filePath: string | null = null
  if (existsSync(publicPath)) {
    filePath = publicPath
  } else if (existsSync(contentPath)) {
    filePath = contentPath
  }

  if (!filePath) return

  const ext = extname(filePath).toLowerCase()
  const contentType = MIME_TYPES[ext] || 'application/octet-stream'
  setHeader(event, 'Content-Type', contentType)
  setHeader(event, 'Cache-Control', 'public, max-age=31536000, immutable')

  return readFileSync(filePath)
})
