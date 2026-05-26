<template>
  <div class="py-12">
    <HeroSection />

    <!-- 置顶文章 -->
    <section v-if="featuredPosts.length" class="mt-20">
      <h2 class="text-2xl font-bold mb-8 flex items-center gap-2">
        <span class="w-2 h-2 bg-accent rounded-full" />
        {{ t('home.featuredPosts') }}
      </h2>
      <PostList :posts="featuredPosts" />
    </section>

    <!-- 最新文章 -->
    <section class="mt-16">
      <h2 class="text-2xl font-bold mb-8 flex items-center gap-2">
        <span class="w-2 h-2 bg-accent rounded-full" />
        {{ t('home.latestPosts') }}
      </h2>
      <PostList v-if="latestPosts.length" :posts="latestPosts" />
      <p v-else class="text-foreground-secondary">{{ t('home.noPosts') }}</p>
    </section>

    <!-- 查看全部 -->
    <div v-if="latestPosts.length" class="mt-12 text-center">
      <NuxtLink
        :to="localePath('/archive')"
        class="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border hover:border-accent text-foreground-secondary hover:text-accent transition-all hover:shadow-md"
      >
        {{ t('home.viewAll') }}
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()

// 使用 Nuxt Content v3 queryCollection 获取文章
const { featuredPosts, latestPosts } = await usePosts(locale.value)

useHead({
  meta: [
    { name: 'description', content: '个人技术博客' },
  ],
})
</script>
