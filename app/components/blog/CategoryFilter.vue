<template>
  <div class="p-6 flex flex-wrap gap-2 bg-surface rounded-xl border border-border">
    <button
      class="text-sm px-2 py-1 rounded-lg border transition-all"
      :class="[
        selectedCategory === null
          ? 'border-border-secondary bg-background-secondary'
          : 'border-border text-foreground-secondary hover:border-border-secondary'
      ]"
      @click="$emit('select', null)"
    >
      {{ t('archive.allCategories') }}
    </button>
    <button
      v-for="cat in categories"
      :key="cat.name"
      class="text-sm px-2 py-1 rounded-lg border transition-all"
      :class="[
        selectedCategory === cat.name
          ? 'border-border-secondary bg-background-secondary'
          : 'border-border text-foreground-secondary hover:border-border-secondary'
      ]"
      @click="$emit('select', cat.name)"
    >
      {{ cat.name }}
    </button>
  </div>
</template>

<script setup lang="ts">
import type { TagCount } from '~~/app/types'

defineProps<{
  categories: TagCount[]
  selectedCategory: string | null
}>()

defineEmits<{
  select: [category: string | null]
}>()

const { t } = useI18n()
</script>
