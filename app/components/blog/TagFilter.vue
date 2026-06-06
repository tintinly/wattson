<template>
  <div class="p-6 flex flex-wrap gap-2 bg-surface rounded-xl border border-border">
    <button
      class="text-sm px-2 py-1 rounded-lg border transition-all"
      :class="[
        selectedTag === null
          ? 'border-border-secondary bg-background-secondary'
          : 'border-border text-foreground-secondary hover:border-border-secondary'
      ]"
      @click="$emit('select', null)"
    >
      {{ t('archive.allTags') }}
    </button>
    <button
      v-for="tag in tags"
      :key="tag.name"
      class="text-sm px-2 py-1 rounded-lg border transition-all"
      :class="[
        selectedTag === tag.name
          ? 'border-border-secondary bg-background-secondary'
          : 'border-border text-foreground-secondary hover:border-border-secondary'
      ]"
      @click="$emit('select', tag.name)"
    >
      {{ tag.name }}
      <!-- <span class="text-xs text-foreground-secondary ml-1">({{ tag.count }})</span> -->
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
