<template>
  <ClientOnly>
    <div class="fixed top-16 left-0 z-50 h-0.5 bg-accent transition-all duration-150" :style="{ width: `${progress}%` }" />
  </ClientOnly>
</template>

<script setup lang="ts">
const progress = ref(0)

function onScroll() {
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  progress.value = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>
