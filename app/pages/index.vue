<template>
  <div class="py-12">
    <HeroSection />

    <!-- 文章列表 -->
    <section class="mt-16 max-w-content mx-auto">
      <PostList v-if="homePosts.length" :posts="homePosts" />
      <p v-else class="text-center text-foreground-secondary">{{ t('home.noPosts') }}</p>
    </section>

    <!-- 查看全部 -->
    <div v-if="homePosts.length" class="mt-12 text-center">
      <NuxtLink
        :to="localePath('/archive')"
        class="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border hover:border-accent text-foreground-secondary hover:text-accent transition-all hover:shadow-md"
      >
        {{ t('home.viewAll') }}
        <Icon name="tabler:arrow-right" class="w-4 h-4" />
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()

// 使用 Nuxt Content v3 queryCollection 获取文章
const { homePosts } = await usePosts(locale.value)

useHead({
  meta: [
    { name: 'description', content: '个人技术博客' },
  ],
})
</script>
