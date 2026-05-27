<template>
  <header class="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md">
    <div class="max-w-wide mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
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
          class="px-3 py-2 rounded-lg text-sm font-medium text-foreground-secondary hover:text-foreground hover:bg-background-secondary transition-colors"
          active-class="text-accent bg-accent/10"
        >
          {{ t(`header.nav.${item.key}`) }}
        </NuxtLink>
      </nav>

      <!-- Actions -->
      <div class="flex items-center gap-1">
        <!-- Search -->
        <button
          class="inline-flex items-center justify-center p-2 rounded-lg text-foreground-secondary hover:text-foreground hover:bg-background-secondary transition-colors"
          :title="t('header.search')"
          @click="openSearch"
        >
          <Icon name="tabler:search" class="w-5 h-5" />
        </button>

        <!-- Theme Toggle -->
        <ThemeToggle />

        <!-- Locale Switch -->
        <LocaleSwitch />

        <!-- Mobile Menu Button -->
        <button
          class="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-foreground-secondary hover:text-foreground hover:bg-background-secondary transition-colors"
          aria-label="Menu"
          @click="isMobileNavOpen = true"
        >
          <Icon name="tabler:menu-2" class="w-5 h-5" />
        </button>
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
const { openSearch } = useSearch()

const isMobileNavOpen = ref(false)

const navItems = [
  { key: 'home', path: '/' },
  { key: 'archive', path: '/archive' },
  { key: 'projects', path: '/projects' },
  { key: 'friends', path: '/friends' },
  { key: 'about', path: '/about' },
]
</script>
