<template>
  <div class="py-12">
    <h1 class="text-3xl font-bold mb-2">{{ t('archive.title') }}</h1>
    <p class="text-foreground-secondary mb-8">
      {{ t('archive.totalPosts', { count: posts.length }) }}
    </p>

    <!-- 标签筛选 -->
    <div class="mb-8">
      <p class="text-sm text-foreground-secondary mb-3">{{ t('archive.filterByTag') }}</p>
      <TagFilter :tags="allTags" :selected-tag="selectedTag" @select="selectedTag = $event" />
    </div>

    <!-- 时间线 -->
    <Timeline
      v-if="posts.length"
      :posts="posts"
      :selected-tag="selectedTag"
    />
    <p v-else class="text-center text-foreground-secondary py-20">{{ t('archive.empty') }}</p>
  </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()
const { posts, allTags } = await usePosts(locale.value)
const selectedTag = ref<string | null>(null)

useHead({
  title: `${t('archive.title')}`,
})
</script>
