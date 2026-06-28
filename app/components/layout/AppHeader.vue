<template>
  <header class="z-40 w-full mb-2 sm:mb-4">
    <div
      class="max-w-wide mx-auto flex h-18 border bg-surface border-border rounded-b-xl items-center justify-between px-4 sm:px-6 lg:px-8 transition-all duration-300" 
    >
      <!-- Logo -->
      <NuxtLink :to="localePath('/')" class="flex items-center gap-2 font-semibold sm:text-xl tracking-tight">
        <span class="truncate">{{ siteTitle }}</span>
      </NuxtLink>

      
      
      <!-- Actions -->
      <div class="flex items-center gap-0 sm:gap-1">
        <SearchButton />
        <ThemeToggle />
        <LocaleSwitch />
        <MobileMenuButton @click="isMobileNavOpen = true" />
      </div>
    </div>

    <!-- Desktop Nav -->
    <div class="fixed top-0 left-1/2 -translate-x-1/2 my-2 rounded-xl  border-border" 
      :class="isScrolled
        ? 'backdrop-blur-sm shadow-md border-b-border border '
        : 'bg-surface'
      "
    >
      <nav class="relative p-2 z-40 hidden md:flex items-center gap-1">
        <NuxtLink
          v-for="item in navItems"
          :key="item.key"
          :to="localePath(item.path)"
          class="px-3.5 py-2 rounded-lg text-foreground/80 font-semibold transition-colors flex items-center gap-1.5"
          :class="isScrolled
            ? 'hover:bg-background-secondary/70 active:bg-background-secondary/70'
            : 'hover:bg-background-secondary active:bg-background-secondary'
          "
          v-bind:active-class="isScrolled
            ? 'bg-background-secondary/70'
            : 'bg-background-secondary'
          "

        >
          <Icon :name="item.icon" class="hidden lg:inline-block w-4 h-4" />
          <span>{{ t(`header.nav.${item.key}`) }}</span>
        </NuxtLink>
      </nav>
    </div>

    <!-- Mobile Nav -->
    <MobileNav
      :is-open="isMobileNavOpen"
      :nav-items="navItems"
      @close="isMobileNavOpen = false"
    />
  </header>
</template>

<script setup lang="ts">
import { siteConfig } from '~~/data/site-config'
import { useLocalePath } from '#i18n'

const { t, locale } = useI18n()

// 滚动毛玻璃效果：滚动超过 40px 后启用
const isScrolled = ref(false)
function onScroll() {
  isScrolled.value = window.scrollY > 0
}
onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

const siteTitle = computed(() =>
  locale.value.indexOf('zh') !== -1 ? siteConfig.site.title : siteConfig.site.titleEn
)
const localePath = useLocalePath()

const isMobileNavOpen = ref(false)

const navItems = [
  { key: 'home', path: '/', icon: 'tabler:home' },
  { key: 'archive', path: '/archive', icon: 'tabler:archive' },
  { key: 'projects', path: '/projects', icon: 'tabler:code' },
  { key: 'friends', path: '/friends', icon: 'tabler:users' },
  { key: 'about', path: '/about', icon: 'tabler:user-circle' },
]
</script>
