<template>
  <div class="py-12">
    <h1 class="text-3xl font-bold mb-2">{{ t('friends.title') }}</h1>
    <p class="text-foreground-secondary mb-8">{{ t('friends.description') }}</p>

    <div v-if="friends.length" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FriendCard v-for="f in friends" :key="f.name" :friend="f" />
    </div>
    <p v-else class="text-center text-foreground-secondary py-20">{{ t('friends.empty') }}</p>
  </div>
</template>

<script setup lang="ts">
import { friends } from '~~/data/friends'

const { t, locale } = useI18n()

useHead({
  title: `${t('friends.title')} - Wattson's Blog`,
})
</script>
