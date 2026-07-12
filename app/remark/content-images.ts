import { visit } from 'unist-util-visit'
import { resolve, relative, normalize } from 'node:path'

/**
 * Remark 插件：将 Markdown 中的相对路径图片 URL 重写为 /_content-media/ 路径
 *
 * 只处理相对路径（不以 http://、https://、/、data:、# 开头），
 * 使用 VFile 中的 file.dirname 来解析图片的相对路径。
 */
export default function contentImages() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (_tree: any, file: any) => {
    // 获取 markdown 文件所在目录（已在 Nuxt Content v3 解析时设置）
    const fileDir = file.dirname
    if (!fileDir) return

    const contentDir = resolve(process.cwd(), 'content')

    // 确保文件在 content/ 目录内
    const normalizedFileDir = normalize(fileDir)
    if (!normalizedFileDir.startsWith(contentDir)) return

    visit(_tree, 'image', (node: { url?: string }) => {
      if (!node.url) return

      // 仅处理相对路径（排除绝对 URL、根路径、data URI、锚点）
      if (
        node.url.startsWith('http://') ||
        node.url.startsWith('https://') ||
        node.url.startsWith('/') ||
        node.url.startsWith('data:') ||
        node.url.startsWith('#')
      ) {
        return
      }

      // 解析相对路径 → 绝对文件系统路径
      const absolutePath = resolve(normalizedFileDir, node.url)

      // 安全检查：确保解析后的路径仍在 content/ 目录内
      const normalizedAbsPath = normalize(absolutePath)
      if (!normalizedAbsPath.startsWith(contentDir)) return

      // 计算相对于 content/ 目录的路径，并转换为 URL 格式
      const relativePath = relative(contentDir, normalizedAbsPath).replace(/\\/g, '/')

      // 重写为 /_content-media/ URL
      node.url = `/_content-media/${relativePath}`
    })
  }
}
