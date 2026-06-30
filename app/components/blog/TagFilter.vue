<template>
  <div class="p-5 bg-surface rounded-xl border border-border">
    <div class="flex flex-row gap-2 justify-start ml-4 text-md font-bold mb-3 ">
      <div class="relative before:w-1 before:h-5 before:rounded-md before:bg-background-tertiary
          before:absolute before:-left-4 before:top-px before:hidden md:before:block">
          {{ t('archive.tags') }}
      </div>
      <button v-if="selectedTags?.length" @click="$emit('select', null)" class="cursor-pointer hover:rotate-360 transition-all duration-300">
        <Icon
          name="tabler:reload" class="w-5 h-5"
        />
      </button>
    </div>
    
    <div class="flex flex-wrap gap-2">
      <button
        v-for="tag in tags"
        :key="tag.name"
        class="text-sm px-2 py-1 rounded-lg border transition-all duration-300 cursor-pointer"
        :class="[
          selectedTags?.includes(tag.name)
            ? 'border-border-secondary bg-background-secondary'
            : 'border-border text-foreground-secondary hover:border-border-secondary hover:bg-background-secondary'
        ]"
        @click="$emit('select', tag.name)"
      >
        {{ tag.name }}
        <!-- <span class="text-xs text-foreground-secondary ml-1">({{ tag.count }})</span> -->
      </button>
    </div>
  </div>
  
</template>

<script setup lang="ts">
import type { TagCount } from '~~/app/types'

defineProps<{
  tags: TagCount[]
  selectedTags: string[] | null
}>()

defineEmits<{
  select: [tag: string | null]
}>()

const { t } = useI18n()
</script>
