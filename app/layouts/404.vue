<template>
  <div class="flex flex-col items-center justify-center py-32 text-center">
    <h1 class="text-6xl font-bold text-foreground-secondary/30 select-none">404</h1>
    <h2 class="text-2xl font-bold mt-4 mb-2">{{ t('notFound.title') }}</h2>
    <p class="text-foreground-secondary mb-8">{{ t('notFound.description') }}</p>
    <div class="flex gap-4">
      <NuxtLink
        :to="localePath('/')"
        class="px-6 py-3 rounded-full bg-background-secondary text-white hover:bg-background-secondary/80 transition-colors font-medium"
      >
        {{ t('notFound.backHome') }}
      </NuxtLink>
      <button
        class="px-6 py-3 rounded-full border border-border text-foreground-secondary hover:text-foreground hover:border-border transition-colors"
        @click="openSearch"
      >
        {{ t('header.search') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const { openSearch } = useSearch()

useHead({
  title: '404',
})
</script>
