<template>
  <ClientOnly>
    <div class="mermaid-diagram my-6 flex justify-center" v-html="svg"></div>
    <template #fallback>
      <div class="mermaid-loading rounded-xl border border-border p-8 text-center text-foreground/60">
        <Icon name="tabler:chart-infographic" class="w-8 h-8 mx-auto mb-2" />
        图表加载中...
      </div>
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
const { code } = defineProps<{ code: string }>()

const svg = ref('')
const id = `mermaid-${Math.random().toString(36).slice(2, 9)}`

onMounted(async () => {
  try {
    const mermaid = await import('mermaid').then(m => m.default)
    mermaid.initialize({
      startOnLoad: false,
      theme: 'base',
      securityLevel: 'loose',
      fontFamily: 'inherit',
    })
    const { svg: rendered } = await mermaid.render(id, code)
    svg.value = rendered
  } catch (e: any) {
    svg.value = `<div class="text-red-500 text-sm">Mermaid 渲染失败：${e.message || e}</div>`
  }
})
</script>
