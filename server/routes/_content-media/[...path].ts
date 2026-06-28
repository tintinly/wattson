import { readFileSync, existsSync } from 'node:fs'
import { join, normalize, resolve } from 'node:path'

// 图片 MIME 类型映射
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
  // 获取 URL 中的文件路径
  const routePath = getRouterParam(event, 'path')
  if (!routePath) {
    setResponseStatus(event, 400)
    return 'Bad Request: missing path'
  }

  const contentDir = resolve(join(process.cwd(), 'content'))

  // 拼接并规范化路径，防止路径遍历攻击
  const filePath = normalize(join(contentDir, routePath))

  // 安全检查：确保最终路径在 content/ 目录内
  if (!filePath.startsWith(contentDir)) {
    setResponseStatus(event, 403)
    return 'Forbidden: path traversal detected'
  }

  // 检查文件是否存在
  if (!existsSync(filePath)) {
    setResponseStatus(event, 404)
    return 'Not Found'
  }

  // 获取文件扩展名并设置 Content-Type
  const ext = filePath.slice(filePath.lastIndexOf('.')).toLowerCase()
  const contentType = MIME_TYPES[ext] || 'application/octet-stream'
  setHeader(event, 'Content-Type', contentType)

  // 缓存策略：内容图片长期不变，设置一年缓存
  setHeader(event, 'Cache-Control', 'public, max-age=31536000, immutable')

  // 读取并返回文件
  return readFileSync(filePath)
})
