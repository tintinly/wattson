<template>
  <NuxtLink
    :to="url"
    target="_blank"
    rel="noopener noreferrer"
    class="group block p-6 rounded-xl border border-border bg-surface hover:border-accent/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
  >
    <div class="flex items-center gap-4">
      <!-- 头像 -->
      <div class="shrink-0 w-12 h-12 rounded-full bg-background-secondary border border-border flex items-center justify-center overflow-hidden">
        <img
          v-if="friend.avatar"
          :src="friend.avatar"
          :alt="displayName"
          class="w-full h-full object-cover"
        />
        <span v-else class="text-xl font-bold text-accent/30">
          {{ displayName.charAt(0) }}
        </span>
      </div>

      <div class="flex-1 min-w-0">
        <h3 class="font-semibold group-hover:text-accent transition-colors truncate">
          {{ displayName }}
        </h3>
        <p class="text-sm text-foreground-secondary line-clamp-2 mt-1">
          {{ displayDescription }}
        </p>
      </div>

      <!-- 箭头 -->
      <svg class="w-5 h-5 text-foreground-secondary group-hover:text-accent group-hover:translate-x-1 transition-all shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Friend } from '~~/app/types'

const props = defineProps<{ friend: Friend }>()
const { locale } = useI18n()

const displayName = computed(() => locale.value === 'en-US' ? props.friend.nameEn : props.friend.name)
const displayDescription = computed(() => locale.value === 'en-US' ? props.friend.descriptionEn : props.friend.description)
const url = computed(() => props.friend.url)
</script>
