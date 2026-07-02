<template>
  <ClientOnly>
    <div class="group relative">
      <pre
        class="bg-[#23303f] dark:bg-[#151B23]  after:content-[attr(data-language)] after:absolute after:top-1 after:right-2 after:p-1 after:text-sm after:transition-all after:duration-300 group-hover:after:opacity-0"
        :data-language="langLabel"><slot /></pre>
      <button
        class="absolute top-2 right-2 p-1.5 rounded-md text-[#e5e5e5] bg-[#5c5c5c] dark:bg-[#282828] opacity-0 group-hover:opacity-100 transition-all hover:text-white hover:bg-[#7b7b7b] dark:hover:bg-[#383838] duration-300 cursor-pointer"
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
const attrs = useAttrs()
const copied = ref(false)
let timer: ReturnType<typeof setTimeout> | null = null

function copyCode(e: MouseEvent) {
  const btn = e.currentTarget as HTMLElement
  const pre = btn.closest('.group')?.querySelector('pre')
  if (!pre) return
  const code = pre.querySelector('code')?.textContent || pre.textContent || ''
  navigator.clipboard.writeText(code.trim()).then(() => {
    copied.value = true
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => { copied.value = false }, 2000)
  }).catch(() => {})
}

/** 从 class 中提取语言名称 */
const langLabel = computed(() => {
  const cls = (attrs.class as string) || ''
  const match = cls.match(/language-(\S+)/)
  return match ? match[1] : 'text'
})

onUnmounted(() => {
  if (timer) clearTimeout(timer)
})
</script>
