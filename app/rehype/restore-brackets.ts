import { visit } from 'unist-util-visit'
import type { Element, Root, Text } from 'hast'

/**
 * Rehype 插件：将 MDC 无属性 <span> 还原为 [原文]
 *
 * CommonMark 标准中 [text]（无匹配引用定义时）应渲染为字面量 [text]。
 * MDC 非标准地将它转为 <span>text</span> 并吞掉方括号。
 * 本插件对有属性的 span（{.class} 生成）不做处理。
 */
export default function restoreBrackets() {
  return (tree: Root) => {
    visit(tree, 'element', (node: Element, index: number | undefined, parent: any) => {
      if (!parent || index === undefined) return
      if (node.tagName !== 'span') return

      const hasAttrs = node.properties && Object.keys(node.properties).length > 0
      if (hasAttrs) return

      const text = extractText(node)
      // 还原被 MDC 吃掉的方括号
      parent.children.splice(index, 1, {
        type: 'text',
        value: `[${text}]`,
      } as Text)
    })
  }
}

function extractText(node: any): string {
  if (node.type === 'text') return (node as Text).value || ''
  if (node.children) return node.children.map((c: any) => extractText(c)).join('')
  return ''
}
