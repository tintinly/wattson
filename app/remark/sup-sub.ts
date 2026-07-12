/**
 * Remark 插件：将 ^text^ 和 ~text~ 转换为上标 <sup> 和下标 <sub>
 *
 * 支持：
 *   19^th^  → 19<sup>th</sup>
 *   H~2~O   → H<sub>2</sub>O
 *
 * 注意：^ 和 ~ 前后不能有空格（紧贴文本），且成对出现。
 */

import { visit } from 'unist-util-visit'

export default function remarkSupSub() {
  return (tree: any) => {
    // 上标：处理文本中的 ^text^ 模式
    visit(tree, 'text', (node: any, index: number | undefined, parent: any) => {
      if (!parent || index === undefined) return
      if (typeof node.value !== 'string') return

      const value: string = node.value
      if (!value.includes('^')) return

      const parts = parseSuperscript(value)
      if (parts.length === 1 && parts[0]!.type === 'text') return

      const newNodes = parts.map((p) => {
        if (p.type === 'text') return { type: 'text', value: p.value }
        return {
          type: 'html' as const,
          value: `<sup>${escapeHtml(p.value)}</sup>`,
        }
      })

      parent.children.splice(index, 1, ...newNodes)
    })

    // 下标：解析器已把 ~text~ 转为 delete 节点，将其 hName 改为 sub
    visit(tree, 'delete', (node: any) => {
      const data = node.data || (node.data = {})
      data.hName = 'sub'
    })
  }
}

type Part = { type: 'text' | 'sup'; value: string }

/**
 * 解析文本中的 ^...^ 模式，
 * 返回分段数组：[{type:'text', value:'19'}, {type:'sup', value:'th'}, ...]
 */
function parseSuperscript(text: string): Part[] {
  const parts: Part[] = []
  let i = 0
  let current = ''

  while (i < text.length) {
    const ch = text[i]!

    if (ch === '^') {
      const end = findClosing(text, i, '^')
      if (end > i + 1) {
        if (current) {
          parts.push({ type: 'text', value: current })
          current = ''
        }
        parts.push({ type: 'sup', value: text.slice(i + 1, end) })
        i = end + 1
        continue
      }
    }

    current += ch
    i++
  }

  if (current) {
    parts.push({ type: 'text', value: current })
  }

  return parts
}

/**
 * 从位置 start（字符为 marker）开始寻找匹配的闭合 marker。
 * 规则：marker 必须紧贴内容（marker 后不能直接跟空格），
 * 查找下一个同字符 marker，要求 marker 前不能有空格。
 */
function findClosing(text: string, start: number, marker: string): number {
  // marker 后直接跟空格 → 不是上/下标标记，不闭合
  if (start + 1 < text.length && text[start + 1] === ' ') return -1

  // 从 start+1 开始找下一个 marker
  for (let j = start + 1; j < text.length; j++) {
    if (text[j] === marker) {
      // marker 前不能有空格（紧贴内容）
      if (j > start + 1 && text[j - 1] !== ' ') {
        return j
      }
    }
  }

  return -1
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}
