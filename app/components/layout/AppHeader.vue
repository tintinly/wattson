<template>
  <header class="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md">
    <div class="max-w-wide mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
      <!-- Logo -->
      <NuxtLink :to="localePath('/')" class="flex items-center gap-2 font-bold text-xl tracking-tight">
        <span class="text-accent"></span>
        <span class="hidden sm:inline">Wattson's Blog</span>
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
          class="p-2 rounded-lg text-foreground-secondary hover:text-foreground hover:bg-background-secondary transition-colors"
          :title="t('header.search')"
          @click="openSearch"
        >
          <IconSearch class="w-5 h-5" />
        </button>

        <!-- Theme Toggle -->
        <ThemeToggle />

        <!-- Locale Switch -->
        <LocaleSwitch />

        <!-- Mobile Menu Button -->
        <button
          class="md:hidden p-2 rounded-lg text-foreground-secondary hover:text-foreground hover:bg-background-secondary transition-colors"
          aria-label="Menu"
          @click="isMobileNavOpen = true"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
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
import { useLocalePath } from '#i18n'

const { t } = useI18n()
const localePath = useLocalePath()
const { openSearch } = useSearch()

const isMobileNavOpen = ref(false)

const navItems = [
  { key: 'home', path: '/' },
  { key: 'archive', path: '/archive' },
  { key: 'friends', path: '/friends' },
  { key: 'projects', path: '/projects' },
  { key: 'about', path: '/about' },
]
</script>
