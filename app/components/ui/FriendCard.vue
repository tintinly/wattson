<template>
  <NuxtLink
    :to="url"
    target="_blank"
    rel="noopener noreferrer"
    class="group block p-4 rounded-xl border border-border bg-surface hover:bg-background-secondary/70 hover:border-border-secondary hover:shadow-lg active:bg-background-secondary/70 active:border-border-secondary active:shadow-lg transition-all duration-300"
  >
    <div class="flex items-center gap-4">
      <!-- 头像 -->
      <div class="shrink-0 size-16 rounded-lg flex items-center justify-center overflow-hidden">
        <NuxtImg
          :src="friend.avatar"
          :alt="displayName"
          class="object-cover text-xs"
        />
      </div>

      <div class="flex-1 min-w-0">
        <h3 class="font-semibold transition-colors truncate">
          {{ displayName }}
        </h3>
        <p class="text-sm text-foreground-secondary line-clamp-2 mt-1">
          {{ displayDescription }}
        </p>
      </div>

      <Icon
        name="tabler:chevron-right"
        class="w-6 h-6 shrink-0 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-active:opacity-100 group-active:translate-x-0 transition-all duration-300"
      />    
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Friend } from '~~/app/types'

const props = defineProps<{ friend: Friend }>()
const { locale } = useI18n()

const displayName = computed(() => locale.value === 'en-US' ? props.friend.nameEn : props.friend.name)
const displayDescription = computed(() => locale.value === 'en-US' ? props.friend.introductionEn : props.friend.introduction)
const url = computed(() => props.friend.url)
</script>
