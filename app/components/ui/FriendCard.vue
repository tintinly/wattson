<template>
  <NuxtLink
    :to="url"
    target="_blank"
    rel="noopener noreferrer"
    class="group block p-4 rounded-xl border border-border bg-surface hover:border-accent/30 hover:shadow-lg transition-all duration-300"
  >
    <div class="flex items-center gap-4">
      <!-- 头像 -->
      <div class="shrink-0 size-16 rounded-lg bg-background-secondary border border-border flex items-center justify-center overflow-hidden">
        <NuxtImg
          :src="friend.avatar"
          :alt="displayName"
          class="absolute w-full h-full object-cover"
          :class="friend.imgLoaded ? '' : 'invisible'" 
          @load="friend.imgLoaded = true"
        />
        <span v-if="!friend.imgLoaded" class="text-xl font-bold text-accent/30">
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

      <Icon
        name="tabler:chevron-right"
        class="w-6 h-6 text-accent shrink-0 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
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
