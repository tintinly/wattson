<template>
  <div class="p-5 bg-surface rounded-xl border border-border">
    <div class="relative ml-4 text-md font-bold mb-4 before:w-1 before:h-5 before:rounded-md before:bg-background-tertiary
        before:absolute before:-left-4 before:top-px before:hidden md:before:block">
        {{ t('archive.categories') }}
    </div>
    <div class="flex flex-wrap gap-2">
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
