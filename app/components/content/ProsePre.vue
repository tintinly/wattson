<template>
  <!-- Mermaid 图表渲染 -->
  <MermaidDiagram v-if="isMermaid" :code="code" />
  <!-- 普通代码块 -->
  <ClientOnly v-else>
    <div class="group relative">
      <pre
        :class="props.class"
        class="rounded-xl border border-border bg-background after:content-[attr(data-language)] after:absolute after:top-0.5 after:right-2 after:text-sm after:text-foreground/80 after:transition-all after:duration-300 group-hover:after:opacity-0"
        :data-language="langLabel"><slot /></pre>
      <button
        class="absolute top-3.5 right-5 p-2 rounded-md text-[#e5e5e5] bg-[#939393] dark:bg-[#282828] opacity-0 group-hover:opacity-100 transition-all hover:text-white hover:bg-[#727272] dark:hover:bg-[#383838] duration-300 cursor-pointer"
        :class="{ 'opacity-100! text-green-500': copied }"
        @click="copyCode"
      >
        <Icon v-if="!copied"  name="tabler:copy"></Icon>
        <Icon v-else name="tabler:check"></Icon>
      </button>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
const props = defineProps({
  class: {
    type: String,
    default: '',
  },
  code: {
    type: String,
    default: '',
  },
  language: {
    type: String,
    default: '',
  },
})
const copied = ref(false)
let timer: ReturnType<typeof setTimeout> | null = null

/** 是否为 mermaid 图表代码块 */
const isMermaid = computed(() => (props.language as string)?.toLowerCase() === 'mermaid')

function copyCode(e: MouseEvent) {
  const btn = e.currentTarget as HTMLElement
  const pre = btn.closest('.group')?.querySelector('pre')
  if (!pre) return
  const codeEl = pre.querySelector('code')?.textContent || pre.textContent || ''
  navigator.clipboard.writeText(codeEl.trim()).then(() => {
    copied.value = true
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => { copied.value = false }, 2000)
  }).catch(() => {})
}

/** 从 class 中提取语言名称 */
const langLabel = computed(() => {
  const cls = (props.class as string) || ''
  const match = cls.match(/language-(\S+)/)
  return match ? match[1] : 'text'
})

onUnmounted(() => {
  if (timer) clearTimeout(timer)
})
</script>
