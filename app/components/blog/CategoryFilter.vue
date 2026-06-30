<template>
  <div class="p-5 bg-surface rounded-xl border border-border">
    <div class="relative ml-4 text-md font-bold mb-3 before:w-1 before:h-5 before:rounded-md before:bg-background-tertiary
        before:absolute before:-left-4 before:top-px before:hidden md:before:block">
        {{ t('archive.categories') }}
    </div>
    <div class="flex flex-col gap-0.5">
      <NuxtLink :to="localePath('/archive')"
        class="group flex flex-row justify-between text-center text-foreground text-md p-2 rounded-lg hover:bg-background-secondary transition-all duration-300  cursor-pointer"
        @click="$emit('select', null)"
      >
        <div class="group-hover:translate-x-2 transition-normal duration-300">
          {{ t('archive.allCategories') }}
        </div>
        <div class="bg-foreground-secondary text-background-secondary w-7 rounded-lg">
          {{ categories.reduce((acc, cur) => acc + cur.count, 0) }}
        </div>
      </NuxtLink>
      <NuxtLink :to="localePath(`/archive?category=${encodeURIComponent(cat.name)}`)"
        v-for="cat in categories"
        :key="cat.name"
        class="group flex flex-row justify-between text-center text-foreground text-md p-2 rounded-lg hover:bg-background-secondary transition-all duration-300 cursor-pointer "
        @click="$emit('select', cat.name)"
      >
      <div class="group-hover:translate-x-2 transition-normal duration-300" >
        {{ cat.name }}
      </div>
      <div class="bg-foreground-secondary text-background-secondary w-7 rounded-lg">
        {{ cat.count }}
      </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TagCount } from '~~/app/types'
const localePath = useLocalePath()

defineProps<{
  categories: TagCount[]
}>()

const { t } = useI18n()
</script>
