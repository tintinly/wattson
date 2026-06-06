<template>
  <div class="py-4 mx-auto">
    <div class="flex flex-col md:flex-row gap-4">
      <!-- 左侧: 分类筛选 标签筛选 -->
      <aside class="shrink-0 ">
        <div class="md:w-70 md:sticky md:top-22 flex flex-col gap-4">
          <TagFilter :tags="allTags" :selected-tag="selectedTag" @select="selectedTag = $event" />
        </div>
      </aside>

      <!-- 时间线 -->
      <div class="flex-1 min-w-0">
        <section>
          <Timeline :posts="posts" :selected-tag="selectedTag" />
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
const { posts, allTags } = await usePosts(locale.value)
const selectedTag = ref<string | null>((route.query.tag as string) || null)

useHead({
  title: `${t('archive.title')}`,
})
</script>
