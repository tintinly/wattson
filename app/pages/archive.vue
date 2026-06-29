<template>
  <div class="mx-auto">
    <div class="flex flex-col md:flex-row gap-2 sm:gap-4">
      <!-- 左侧: 分类筛选 + 标签筛选 -->
      <aside class="shrink-0">
        <div class="md:w-70 md:sticky md:top-4 flex flex-col gap-2 sm:gap-4">
          <CategoryFilter :categories="allCategories" :selected-category="selectedCategory" @select="selectedCategory = $event" />
          <TagFilter :tags="allTags" :selected-tag="selectedTag" @select="selectedTag = $event" />
        </div>
      </aside>

      <!-- 时间线 -->
      <div class="flex-1 min-w-0">
        <section>
          <Timeline :posts="posts" :selected-tag="selectedTag" :selected-category="selectedCategory" />
        </section>
      </div>
    </div>
    <!-- <h1 class="text-3xl font-bold mb-2 text-center">{{ t('archive.title') }}</h1>
    <p class="text-foreground-secondary mb-8 text-center">
      {{ t('archive.totalPosts', { count: posts.length }) }}
    </p> -->

  </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()
const route = useRoute()
const { posts, allTags, allCategories } = await usePosts(locale.value)
const selectedTag = ref<string | null>((route.query.tag as string) || null)
const selectedCategory = ref<string | null>((route.query.category as string) || null)
useHead({
  title: `${t('archive.title')}`,
})
</script>
