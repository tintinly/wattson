import { visit } from 'unist-util-visit'
import GithubSlugger from 'github-slugger'

/**
 * Remark 插件：将文章中的独立 `[TOC]` 替换为文章目录 HTML
 *
 * `[TOC]` 在 Markdown 中可能被解析为：
 * - 纯文本（text 节点）
 * - 快捷参考链接（linkReference 节点）
 * - MDC 内联元素（mdcSpan / mdcInlineSpan 节点）
 *
 * 因此不绑定具体节点类型，遍历所有节点按可见文本匹配。
 */
export default function tocPlaceholder() {
  return (tree: any) => {
    const slugger = new GithubSlugger()

    // 第一遍：收集所有标题
    const headings: { depth: number; text: string; id: string }[] = []
    visit(tree, 'heading', (node: any) => {
      const text = extractText(node)
      if (!text) return
      headings.push({
        depth: node.depth,
        text,
        id: slugger.slug(text),
      })
    })

    if (headings.length === 0) return

    // 第二遍：找到 [TOC] 占位并替换
    // 不指定节点类型，匹配任何文本为 "TOC" 或 "[TOC]" 的段落级节点
    visit(tree, (node: any, index: number | undefined, parent: any) => {
      if (!parent || index === undefined) return
      if (!isParagraphLike(node)) return

      const text = extractText(node).trim()
      if (text !== 'TOC' && text !== '[TOC]') return

      // 替换为 TOC HTML
      parent.children.splice(index, 1, {
        type: 'html',
        value: buildTocHtml(headings),
      })
    })
  }
}

/** 判断节点是否为段落级容器（paragraph 或 MDC 段落变体） */
function isParagraphLike(node: any): boolean {
  if (!node.children || !Array.isArray(node.children)) return false
  // 标准 mdast paragraph
  if (node.type === 'paragraph') return true
  // MDC 变体（mdcParagraph 等）
  if (node.type?.startsWith('mdc') && node.children.length > 0) return true
  return false
}

/** 递归提取节点中的纯文本 */
function extractText(node: any): string {
  if (node.type === 'text' || node.type === 'inlineCode') return node.value || ''
  if (node.children && Array.isArray(node.children)) {
    return node.children.map((child: any) => extractText(child)).join('')
  }
  return ''
}

/** 根据标题列表构建嵌套 <ul> HTML 字符串 */
function buildTocHtml(headings: { depth: number; text: string; id: string }[]): string {
  const minDepth = Math.min(...headings.map((h) => h.depth))
  let html = '<nav class="table-of-contents">\n<ul>\n'
  let currentDepth = minDepth
  let isFirst = true

  for (const h of headings) {
    if (h.depth > currentDepth) {
      for (let i = 0; i < h.depth - currentDepth; i++) html += '<ul>\n'
    } else if (h.depth < currentDepth) {
      html += '</li>\n'
      for (let i = 0; i < currentDepth - h.depth; i++) html += '</ul>\n</li>\n'
    } else if (!isFirst) {
      html += '</li>\n'
    }

    html += `<li><a href="#${h.id}">${escapeHtml(h.text)}</a>`
    currentDepth = h.depth
    isFirst = false
  }

  html += '</li>\n'
  for (let i = 0; i < currentDepth - minDepth; i++) html += '</ul>\n</li>\n'
  html += '</ul>\n</nav>'

  return html
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
