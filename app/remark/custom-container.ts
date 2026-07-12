/**
 * Remark 插件：将 VitePress 风格 ::: container 语法转换为 HTML 容器
 *
 * 支持两种格式：
 * 1. 单段落格式（短内容，无空行）：
 *    ::: info
 *    This is an info box.
 *    :::
 *
 * 2. 多节点格式（含块级元素，如代码块）：
 *    ::: details 点我查看代码
 *    ```js
 *    code here
 *    ```
 *    :::
 *
 * 使用 data.hName / data.hProperties 让 remark-rehype 自动生成正确的 HTML 元素，
 * 子节点保留在 mdast 树中，由正常管线渲染。
 */
/** 匹配 ::: type [title] 开标记（支持多行文本匹配） */
const OPEN_RE = /^:::\s*(info|tip|warning|danger|details)(.*?)$/m

export default function customContainer() {
  return (tree: any) => {
    const children = tree.children || []
    if (!children.length) return

    const newChildren: any[] = []
    let i = 0

    while (i < children.length) {
      const node = children[i]

      // 优先尝试单段落格式（::: type\ncontent\n::: 全在一个段落中，无空行）
      const inlineResult = tryInlineContainer(node)
      if (inlineResult) {
        newChildren.push(inlineResult)
        i++
        continue
      }

      // 尝试多节点格式（::: type + 内容节点 + ::: 分属不同节点）
      if (isContainerOpen(node)) {
        const parsed = parseOpen(node)
        if (parsed) {
          const { type, title } = parsed
          let endIndex = -1

          for (let j = i + 1; j < children.length; j++) {
            if (isContainerClose(children[j])) {
              endIndex = j
              break
            }
          }

          if (endIndex !== -1) {
            const contentNodes = children.slice(i + 1, endIndex)
            newChildren.push(buildContainer(type, title, contentNodes))
            i = endIndex + 1
            continue
          }
        }
      }

      newChildren.push(node)
      i++
    }

    tree.children = newChildren
  }
}

// ======================== 工具函数 ========================

/** 判断节点是否为段落级容器（paragraph 或 MDC 段落变体） */
function isParagraphLike(node: any): boolean {
  if (!node.children || !Array.isArray(node.children)) return false
  if (node.type === 'paragraph') return true
  if (node.type?.startsWith('mdc') && node.children.length > 0) return true
  return false
}

/** 递归提取节点中的纯文本 */
function extractText(node: any): string {
  if (node.type === 'text' || node.type === 'inlineCode') return node.value || ''
  if (node.children && Array.isArray(node.children)) {
    return node.children.map((c: any) => extractText(c)).join('')
  }
  return ''
}

// ======================== 单段落格式 ========================

/**
 * 尝试从单个段落中提取 ::: container
 * 格式：段落文本以 ::: type 开头并以 ::: 结尾（中间无空行/无块级元素）
 */
function tryInlineContainer(node: any): any | null {
  if (!isParagraphLike(node) || !node.children?.length) return null

  const first = node.children[0]
  if (first?.type !== 'text' || typeof first.value !== 'string' || !first.value.startsWith(':::')) return null

  const fullText = extractText(node).trim()

  // 必须以 ::: type 开头，以 ::: 结尾
  if (!fullText.startsWith(':::') || !fullText.endsWith(':::')) return null

  const match = fullText.match(OPEN_RE)
  if (!match) return null

  const type: string = match[1]!
  const title: string = (match[2] || '').trim()

  // 去掉开标记和尾 ::: 得到正文
  const bodyText = fullText
    .slice(match[0]!.length)     // 去掉 ::: type [title]
    .trim()
    .replace(/\n?:::$/s, '')     // 去掉末尾 :::
    .trim()

  // 构建内容节点：如果正文不为空则创建一个段落
  const contentNodes: any[] = []
  if (bodyText) {
    contentNodes.push({
      type: 'paragraph',
      children: [{ type: 'text', value: bodyText }],
    })
  }

  return buildContainer(type, title, contentNodes)
}

// ======================== 多节点格式 ========================

/** 判断是否为 ::: type 开标记段落 */
function isContainerOpen(node: any): boolean {
  if (!isParagraphLike(node) || !node.children?.length) return false
  const first = node.children[0]
  if (first?.type !== 'text' || typeof first.value !== 'string' || !first.value.startsWith(':::')) return false
  const text = extractText(node).trim()
  return OPEN_RE.test(text)
}

/** 判断是否为 ::: 闭标记段落（整个段落只有 :::） */
function isContainerClose(node: any): boolean {
  if (!isParagraphLike(node) || !node.children?.length) return false
  const first = node.children[0]
  if (first?.type !== 'text' || typeof first.value !== 'string' || !first.value.startsWith(':::')) return false
  const text = extractText(node).trim()
  return text === ':::'
}

/** 解析开标记，提取 type 和 title */
function parseOpen(node: any): { type: string; title: string } | null {
  const text = extractText(node).trim()
  const match = text.match(OPEN_RE)
  if (!match) return null
  return { type: match[1]!, title: (match[2] || '').trim() }
}

// ======================== 容器构建 ========================

/**
 * 构建容器节点
 * 使用 data.hName / data.hProperties 控制 remark-rehype 输出的 HTML。
 * mdast-util-to-hast 的 defaultUnknownHandler 对未知节点类型会创建默认 div，
 * 然后 applyData 应用 hName / hProperties 覆盖。
 */
function buildContainer(type: string, title: string, contentNodes: any[]): any {
  if (type === 'details') {
    const summaryText = title || type.toUpperCase()
    const summaryNode = {
      type: 'paragraph',
      data: {
        hName: 'summary',
        hProperties: { class: 'custom-container-title' },
      },
      children: [{ type: 'text', value: summaryText }],
    }
    return {
      type: 'custom-container',
      data: {
        hName: 'details',
        hProperties: { class: 'custom-container details' },
      },
      children: [summaryNode, ...contentNodes],
    }
  }

  // info / tip / warning / danger
  const displayTitle = title || type.toUpperCase()
  const titleNode = {
    type: 'paragraph',
    data: {
      hName: 'div',
      hProperties: { class: 'custom-container-title' },
    },
    children: [{ type: 'text', value: displayTitle }],
  }
  return {
    type: 'custom-container',
    data: {
      hName: 'div',
      hProperties: { class: `custom-container ${type}` },
    },
    children: [titleNode, ...contentNodes],
  }
}
