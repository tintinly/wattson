<template>
  <header class="sticky top-0 z-40 w-full bg-surface/80 backdrop-blur-md">
    <div class="max-w-wide mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
      <!-- Logo -->
      <NuxtLink :to="localePath('/')" class="flex items-center gap-2 font-bold text-xl tracking-tight">
        <span class="text-accent"></span>
        <span class="hidden sm:inline">{{ siteTitle }}</span>
      </NuxtLink>

      <!-- Desktop Nav -->
      <nav class="hidden md:flex items-center gap-1">
        <NuxtLink
          v-for="item in navItems"
          :key="item.key"
          :to="localePath(item.path)"
          class="px-3 py-2 rounded-lg text-sm font-medium text-foreground hover:text-foreground hover:bg-background-secondary transition-colors flex items-center gap-1.5"
          active-class="bg-background-secondary"
        >
          <Icon :name="item.icon" class="w-5 h-5" />
          <span>{{ t(`header.nav.${item.key}`) }}</span>
        </NuxtLink>
      </nav>

      <!-- Actions -->
      <div class="flex items-center gap-1">
        <SearchButton />
        <ThemeToggle />
        <LocaleSwitch />
        <MobileMenuButton @click="isMobileNavOpen = true" />
      </div>
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
