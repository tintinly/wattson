<template>
  <article v-if="post" class="py-12">
    <!-- 封面图 -->
    <PostCover v-if="post.coverImage" :src="post.coverImage" :alt="post.coverImageAlt || displayTitle" />

    <!-- 文章头部 -->
    <header class="mb-8 max-w-content mx-auto text-center">
      <h1 class="text-3xl sm:text-4xl font-bold leading-tight mb-4">
        {{ displayTitle }}
      </h1>
      <p v-if="displayDescription" class="text-lg text-foreground-secondary mb-4">
        {{ displayDescription }}
      </p>
      <div class="flex flex-wrap items-center justify-center gap-3 text-sm text-foreground-secondary">
        <time :datetime="post.date">
          {{ t('post.publishedOn') }} {{ formattedDate }}
        </time>
        <span>·</span>
        <span>{{ readingTimeText }}</span>
      </div>
      <div class="flex flex-wrap justify-center gap-1.5 mt-4">
        <span
          v-for="tag in displayTags"
          :key="tag"
          class="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent"
        >
          {{ tag }}
        </span>
      </div>
    </header>

    <!-- 文章内容 -->
    <div class="flex gap-8 max-w-content mx-auto">
      <!-- 主内容 -->
      <div class="flex-1 min-w-0 bg-surface rounded-2xl shadow-lg ring-1 ring-border p-6 sm:p-10 prose prose-lg dark:prose-invert max-w-none">
        <ContentRenderer :value="post" />
      </div>

      <!-- 侧边栏目录 -->
      <TableOfContents :content="post" />
    </div>

  </article>

  <!-- 文章未找到 -->
  <div v-else class="py-20 text-center">
    <h2 class="text-2xl font-bold mb-4">{{ t('notFound.title') }}</h2>
    <NuxtLink :to="localePath('/')" class="text-accent hover:underline">
      ← {{ t('notFound.backHome') }}
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import type { PostContent } from '~~/app/types'

const route = useRoute()
const { t, locale } = useI18n()
const localePath = useLocalePath()

// 从 URL 中提取 slug
const slug = computed(() => {
  const parts = route.params.slug
  if (Array.isArray(parts)) return parts.join('/')
  return parts || ''
})

const { posts } = await usePosts(locale.value)
const post = computed(() => posts.value.find((p: any) => p._slug === slug.value))

const displayTitle = computed(() => post.value?._title || '')
const displayDescription = computed(() => post.value?._description || '')
const displayTags = computed(() => post.value?._tags || [])

// 图片灯箱
useImageZoom()

const formattedDate = computed(() => {
  if (!post.value) return ''
  return new Date(post.value.date).toLocaleDateString(
    locale.value === 'zh-CN' ? 'zh-CN' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  )
})

const readingTimeText = computed(() => {
  // Nuxt Content v3 body 是结构化 AST，用 description 长度估算阅读时间
  const chars = (displayDescription.value || '').length
  const minutes = Math.max(1, Math.ceil(chars / 800))
  return t('post.readingTime', { minute: minutes })
})

useHead(() => ({
  title: `${displayTitle.value}`,
  meta: [
    { name: 'description', content: displayDescription.value },
  ],
}))
</script>
