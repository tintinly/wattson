<template>
  <button
    class="inline-flex items-center justify-center p-2 rounded-lg text-foreground hover:bg-background-secondary transition-colors"
    :title="t('header.search')"
    @click="openSearch"
  >
    <Icon name="tabler:search" class="w-5 h-5" />
  </button>
</template>

<script setup lang="ts">
const { t } = useI18n()
const { openSearch } = useSearch()
</script>
