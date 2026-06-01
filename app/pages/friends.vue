<template>
  <div class="max-w-content py-12 mx-auto">
    <h1 class="text-3xl font-bold mb-2 text-center">{{ t('friends.title') }}</h1>
    <p class="text-foreground-secondary mb-8 text-center">{{ t('friends.description') }}</p>

    <div class="mb-12">
      <div v-if="friends.length" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FriendCard v-for="f in friends" :key="f.name" :friend="f" />
      </div>
      <p v-else class="text-center text-foreground-secondary py-20">{{ t('friends.empty') }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { friends } from '~~/data/friends'

const { t, locale } = useI18n()

const { data: addFriendPage } = await useAsyncData('about', () => {
  return queryCollection('content')
    .where('path', '=', '/add-friend')
    .first()
})

useHead({
  title: `${t('friends.title')}`,
})
</script>
