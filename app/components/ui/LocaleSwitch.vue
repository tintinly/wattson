<template>
  <div ref="containerRef" class="relative">
    <button
      class="inline-flex items-center justify-center p-2 sm:p-3 rounded-lg text-sm font-medium text-foreground hover:text-foreground hover:bg-background-secondary transition-colors"
      @click="isOpen = !isOpen"
    >
      <Icon name="tabler:world" class="w-5 h-5" />
    </button>

    <Transition name="fade">
      <div
        v-if="isOpen"
        class="absolute right-0 top-full w-32 rounded-xl bg-surface border border-border shadow-xl p-1 z-50"
      >
        <button
          v-for="loc in availableLocales"
          :key="loc.code"
          class="w-full my-1 px-4 py-2 text-sm text-center hover:bg-background-secondary rounded-lg transition-colors flex items-center justify-between gap-1.5"
          :class="{ 'text-accent font-medium bg-background-secondary': currentLocale === loc.code }"
          @click="switchTo(loc.code)"
        >
          {{ loc.label }}
          <Icon v-if="currentLocale === loc.code" name="tabler:check" class="w-4 h-4" />
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
  { code: 'zh-CN', label: '简体中文' },
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
