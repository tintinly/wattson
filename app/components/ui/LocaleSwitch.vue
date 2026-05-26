<template>
  <div class="relative" @keydown.escape="isOpen = false">
    <button
      class="px-2 py-1.5 rounded-lg text-sm font-medium text-foreground-secondary hover:text-foreground hover:bg-background-secondary transition-colors"
      @click="isOpen = !isOpen"
    >
      {{ currentLocale === 'zh-CN' ? '中' : 'EN' }}
    </button>

    <Transition name="fade">
      <div
        v-if="isOpen"
        class="absolute right-0 top-full mt-1 w-32 rounded-xl bg-background border border-border shadow-xl py-1 z-50"
        @click.self="isOpen = false"
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
const { locale } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const availableLocales = [
  { code: 'zh-CN', label: '中文' },
  { code: 'en-US', label: 'English' },
]

const currentLocale = computed(() => locale.value)
const isOpen = ref(false)

async function switchTo(code: string) {
  if (code === locale.value) {
    isOpen.value = false
    return
  }
  isOpen.value = false
  const path = switchLocalePath(code)
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
