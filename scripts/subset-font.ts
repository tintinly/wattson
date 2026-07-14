import { readFileSync, writeFileSync, statSync, unlinkSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execSync } from 'node:child_process'
import { globby } from 'globby'
import os from 'node:os'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const PROJECT_ROOT = join(__dirname, '..')

// 源文件扫描模式 — 覆盖所有可能包含渲染文本的文件
const SOURCE_PATTERNS = [
  'content/**/*.md',             // Markdown 内容（博客文章、关于页）
  'app/**/*.vue',                 // Vue 组件模板
  'i18n/locales/*.json',         // 翻译文件
  'app/**/*.ts',                 // TypeScript 文件
]

// 基础字符集 — 确保即使源文件中未出现也保留的 Unicode 区间
// 使用 fromCodePoint 生成，避免 esbuild 解析 Unicode 字面量异常
function buildBaseChars(): string {
  // 定义需要保留的 Unicode 区间
  const ranges: [number, number][] = [
    [0x0020, 0x007E], // ASCII 可打印字符
    [0x00A0, 0x024F], // Latin-1 补充 + 拉丁扩展-A/B（i18n 常用带重音字母）
    [0x2000, 0x206F], // 通用标点（含各种引号、省略号、连接号等）
    [0x2070, 0x209F], // 上标下标
    [0x20A0, 0x20CF], // 货币符号
    [0x2100, 0x214F], // 字母式符号
    [0x2190, 0x21FF], // 箭头
    [0x2200, 0x22FF], // 数学运算符（含 × ÷ ± = 等）
    [0x2300, 0x23FF], // 杂项技术符号
    [0x2500, 0x259F], // 制表符
    [0x25A0, 0x25FF], // 几何形状（● ○ ◉ ◆ □ ■ △ ▲ ▽ ▼ ☆ ★ 等）
    [0x2600, 0x26FF], // 杂项符号（✓ ✗ ✔ ✖ ※ 等）
    [0x2700, 0x27BF], // 装饰符号
    [0x3000, 0x303F], // 中文标点（。、！？；：「」『』【】《》等）
    [0xFE10, 0xFE1F], // 竖排标点
    [0xFE30, 0xFE4F], // 兼容性中文标点
    [0xFF00, 0xFFEF], // 全角字符（０-９Ａ-Ｚａ-ｚ）
  ]

  const chars: string[] = []
  for (const [start, end] of ranges) {
    for (let cp = start; cp <= end; cp++) {
      chars.push(String.fromCodePoint(cp))
    }
  }
  return chars.join('')
}

const BASE_CHARS = buildBaseChars()

async function collectChars(): Promise<Set<string>> {
  const chars = new Set<string>(BASE_CHARS)
  const files = await globby(SOURCE_PATTERNS, { cwd: PROJECT_ROOT })

  for (const file of files) {
    const filePath = join(PROJECT_ROOT, file)
    const content = readFileSync(filePath, 'utf-8')
    for (const char of content) {
      chars.add(char)
    }
  }

  return chars
}

async function main() {
  const inputFont = join(PROJECT_ROOT, 'app/assets/fonts/LXGWBright-Medium.ttf')
  const outputFont = join(PROJECT_ROOT, 'app/assets/fonts/LXGWBright-Medium.subset.woff2')

  if (!existsSync(inputFont)) {
    console.error('[字体子集化] 错误：找不到原始字体文件', inputFont)
    process.exit(1)
  }

  // 1. 收集所有源文件中的字符
  console.log('[字体子集化] 扫描源文件，收集字符...')
  const chars = await collectChars()
  console.log(`[字体子集化] 收集到 ${chars.size} 个不同字符`)

  // 2. 将字符写入临时文件（避免命令行转义问题）
  const tempFile = join(os.tmpdir(), 'wattson-font-chars.txt')
  writeFileSync(tempFile, Array.from(chars).join(''), 'utf-8')

  // 3. 调用 pyftsubset 生成子集 WOFF2
  console.log('[字体子集化] 运行 pyftsubset 生成子集...')
  try {
    execSync(
      [
        'pyftsubset',
        `"${inputFont}"`,
        `--text-file="${tempFile}"`,
        `--output-file="${outputFont}"`,
        '--flavor=woff2',
        '--layout-features=*',        // 保留所有 OpenType 布局特性
        '--no-hinting',               // 去除 hinting（Web 不需要）
      ].join(' '),
      { stdio: 'inherit' }
    )
  } finally {
    // 清理临时文件
    if (existsSync(tempFile)) {
      unlinkSync(tempFile)
    }
  }

  // 4. 输出体积对比
  const originalSize = statSync(inputFont).size
  const subsetSize = statSync(outputFont).size
  const ratio = (subsetSize / originalSize * 100).toFixed(1)
  console.log(`[字体子集化] 原始 TTF: ${(originalSize / 1024 / 1024).toFixed(2)}MB -> 子集 WOFF2: ${(subsetSize / 1024).toFixed(1)}KB (${ratio}%)`)
}

main().catch((err) => {
  console.error('[字体子集化] 失败:', err)
  process.exit(1)
})
