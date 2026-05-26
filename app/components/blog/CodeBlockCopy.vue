<template>
  <ClientOnly>
    <button
      ref="btnRef"
      class="absolute top-2 right-2 p-1.5 rounded-md text-foreground-secondary bg-background/80 opacity-0 group-hover:opacity-100 hover:!opacity-100 hover:text-foreground hover:bg-background-secondary border border-border transition-all"
      :class="{ '!opacity-100 text-accent': copied }"
      title="Copy code"
      @click="copy"
    >
      <svg v-if="!copied" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
      <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
    </button>
  </ClientOnly>
</template>

<script setup lang="ts">
const copied = ref(false)
let timer: ReturnType<typeof setTimeout> | null = null

function copy() {
  // 找到父级 pre > code 的文本内容
  const pre = (getCurrentInstance()?.vnode.el as HTMLElement)?.closest('pre')
  if (!pre) return
  const code = pre.querySelector('code')?.textContent || ''
  navigator.clipboard.writeText(code).then(() => {
    copied.value = true
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => { copied.value = false }, 2000)
  }).catch(() => {})
}

onUnmounted(() => {
  if (timer) clearTimeout(timer)
})
</script>
