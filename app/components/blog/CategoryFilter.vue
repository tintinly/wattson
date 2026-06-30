<template>
  <div class="p-5 bg-surface rounded-xl border border-border">
    <div class="relative ml-4 text-md font-bold mb-3 before:w-1 before:h-5 before:rounded-md before:bg-background-tertiary
        before:absolute before:-left-4 before:top-px before:hidden md:before:block">
        {{ t('archive.categories') }}
    </div>
    <div class="flex flex-col gap-0.5">
      <button
        class="group flex flex-row justify-between text-foreground text-md p-2 rounded-lg transition-all duration-300  cursor-pointer"
        :class="[
          selectedCategory === null
            ? 'bg-background-secondary'
            : 'hover:bg-background-secondary'
        ]"
        @click="$emit('select', null)"
      >
        <div class="group-hover:translate-x-2 transition-normal duration-300">
          {{ t('archive.allCategories') }}
        </div>
        <div class="bg-foreground-secondary text-background-secondary w-7 rounded-lg">
          {{ categories.reduce((acc, cur) => acc + cur.count, 0) }}
        </div>
      </button>
      <button
        v-for="cat in categories"
        :key="cat.name"
        class="group flex flex-row justify-between text-foreground text-md p-2 rounded-lg transition-all duration-300 cursor-pointer "
        :class="[
          selectedCategory === cat.name
            ? 'bg-background-secondary'
            : 'hover:bg-background-secondary'
        ]"
        @click="$emit('select', cat.name)"
      >
      <div class="group-hover:translate-x-2 transition-normal duration-300" >
        {{ cat.name }}
      </div>
      <div class="bg-foreground-secondary text-background-secondary w-7 rounded-lg">
        {{ cat.count }}
      </div>
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
