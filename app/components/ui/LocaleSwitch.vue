<template>
  <div ref="containerRef" class="relative">
    <button
      class="px-2 py-1.5 rounded-lg text-sm font-medium text-foreground-secondary hover:text-foreground hover:bg-background-secondary transition-colors"
      @click="isOpen = !isOpen"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    </button>

    <Transition name="fade">
      <div
        v-if="isOpen"
        class="absolute right-0 top-full mt-1 w-32 rounded-xl bg-background border border-border shadow-xl py-1 z-50"
      >
        <button
          v-for="loc in availableLocales"
          :key="loc.code"
          class="w-full px-4 py-2 text-sm text-left hover:bg-background-secondary transition-colors flex items-center justify-between"
          :class="{ 'text-accent font-medium': currentLocale === loc.code }"
          @click="switchTo(loc.code)"
        >
          {{ loc.label }}
          <svg v-if="currentLocale === loc.code" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'

const { locale } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const availableLocales = [
  { code: 'zh-CN', label: '中文' },
  { code: 'en-US', label: 'English' },
]

const currentLocale = computed(() => locale.value)
const isOpen = ref(false)
const containerRef = ref<HTMLElement | null>(null)

onClickOutside(containerRef, () => {
  isOpen.value = false
})

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && isOpen.value) {
    e.preventDefault()
    isOpen.value = false
  }
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))

async function switchTo(code: string) {
  if (code === locale.value) {
    isOpen.value = false
    return
  }
  isOpen.value = false
  const path = switchLocalePath(code as 'zh-CN' | 'en-US')
  await navigateTo(path)
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
