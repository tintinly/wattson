<template>
  <div class="flex flex-wrap gap-2">
    <button
      class="text-sm px-3 py-1.5 rounded-full border transition-all"
      :class="[
        selectedTag === null
          ? 'border-accent bg-accent/10 text-accent'
          : 'border-border text-foreground-secondary hover:border-accent/50'
      ]"
      @click="$emit('select', null)"
    >
      {{ t('archive.allTags') }}
    </button>
    <button
      v-for="tag in tags"
      :key="tag.name"
      class="text-sm px-3 py-1.5 rounded-full border transition-all"
      :class="[
        selectedTag === tag.name
          ? 'border-accent bg-accent/10 text-accent'
          : 'border-border text-foreground-secondary hover:border-accent/50'
      ]"
      @click="$emit('select', tag.name)"
    >
      {{ tag.name }}
      <span class="text-xs text-foreground-secondary ml-1">({{ tag.count }})</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import type { TagCount } from '~~/app/types'

defineProps<{
  tags: TagCount[]
  selectedTag: string | null
}>()

defineEmits<{
  select: [tag: string | null]
}>()

const { t } = useI18n()
</script>
