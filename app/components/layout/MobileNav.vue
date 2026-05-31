<template>
  <Teleport to="body">
    <Transition name="slide">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 md:hidden"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="$emit('close')" />

        <!-- Drawer -->
        <nav class="absolute right-0 top-0 h-full w-42 bg-surface border-l border-border shadow-2xl p-6 pt-20">
          <div class="flex flex-col gap-2">
            <NuxtLink
              v-for="item in navItems"
              :key="item.key"
              :to="localePath(item.path)"
              class="px-4 py-3 rounded-lg text-base font-medium text-foreground-secondary hover:text-foreground hover:bg-background-secondary transition-colors flex items-center gap-2"
              active-class="text-accent bg-accent/10"
              @click="$emit('close')"
            >
              <Icon :name="item.icon" class="w-6 h-6" />
              <span>{{ t(`header.nav.${item.key}`) }}</span>
            </NuxtLink>
          </div>

          <!-- Close button -->
          <button
            class="absolute top-4 right-4 p-2 rounded-lg text-foreground-secondary hover:text-foreground hover:bg-background-secondary transition-colors"
            @click="$emit('close')"
            aria-label="Close menu"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </nav>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { useLocalePath } from '#i18n'

defineProps<{
  isOpen: boolean
  navItems: { key: string; path: string; icon: string }[]
}>()

defineEmits<{
  close: []
}>()

const { t } = useI18n()
const localePath = useLocalePath()
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.3s ease;
}
.slide-enter-active nav,
.slide-leave-active nav {
  transition: transform 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
}
.slide-enter-from nav {
  transform: translateX(100%);
}
.slide-leave-to nav {
  transform: translateX(100%);
}
</style>
