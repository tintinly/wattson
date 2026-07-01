<template>
  <div>
    <!-- 文章未找到 -->
    <div v-if="!post" class="py-20 text-center">
      <h2 class="text-2xl font-bold mb-4">{{ t('notFound.title') }}</h2>
      <NuxtLink :to="localePath('/')" class="hover:underline">
        ← {{ t('notFound.backHome') }}
      </NuxtLink>
    </div>

    <!-- 文章卡片 + TOC -->
    <div v-else class="max-w-wide mx-auto py-4 flex flex-col md:flex-row justify-center gap-4">
    <!-- TOC 侧边栏 -->
      <aside class="shrink-0 ">
        <div class="md:w-70 md:sticky md:top-4 flex flex-col gap-4">
          <TableOfContents :content="post" />
        </div>
      </aside>
    

    <!-- 文章卡片：与首页 PostCard 保持一致 -->
    <article class="w-full min-w-0 bg-surface rounded-xl border border-border py-5 px-5 sm:py-8 sm:px-8">
      <!-- 封面图：与 PostCard 完全一致 -->
      <div v-if="post.coverImage" class="aspect-video -mx-5 -mt-5 sm:-mx-8 sm:-mt-8 mb-5 overflow-hidden rounded-t-xl">
        <ProseImg
          :src="post.coverImage"
          :alt="post.coverImageAlt || displayTitle"
          class="w-full h-full object-cover"
        />
      </div>

      <!-- 字数 + 阅读时间 -->
      <div class="flex flex-wrap items-center gap-5 text-sm text-foreground-secondary/50 mb-3">
        <span class="inline-flex items-center gap-1">
          <div class="p-1 rounded-md bg-background-secondary">
            <Icon name="tabler:pencil" class="w-4 h-4" />
          </div>
          {{ t('post.wordCount', { count: post._wordCount }) }}
        </span>
        <span class="inline-flex items-center gap-1">
          <div class="p-1 rounded-md bg-background-secondary">
            <Icon name="tabler:clock" class="w-4 h-4" />
          </div>
          {{ t('post.minRead', { minute: post._readingTime }) }}
        </span>
      </div>

      <!-- 标题 -->
      <div class="flex items-center gap-2 mb-3">
        <span v-if="post._locale !== locale" class="inline-block px-1.5 py-0.5 border border-border text-xs text-foreground-secondary rounded-md bg-background-secondary">
          {{ post._locale }}
        </span>
        <h1 class="text-2xl font-semibold leading-snug">
          {{ displayTitle }}
        </h1>
      </div>

      <!-- 日期 + 分类 + 标签-->
      <div class="flex flex-wrap items-center gap-5 text-sm text-foreground-secondary mb-3">
        <span class="inline-flex items-center gap-0.5">
          <div class="p-1.5 rounded-md bg-background-secondary">
            <Icon name="tabler:calendar-month" class="w-5 h-5" />
          </div>
          <time class="p-1.5 rounded-md">{{ formattedDate }}</time>
        </span>
        <span class="inline-flex items-center gap-0.5">
          <div class="p-1.5 rounded-md bg-background-secondary">
            <Icon name="tabler:category" class="w-5 h-5" />
          </div>
          <NuxtLink class="p-1.5 rounded-md hover:bg-background-secondary active:bg-background-secondary transition duration-300"
            :to="localePath(`/archive?category=${encodeURIComponent(post._category)}`)">
            {{ post._category }}
          </NuxtLink>
        </span>
        <span class="inline-flex items-center gap-0.5">
          <div class="p-1.5 rounded-md bg-background-secondary">
            <Icon name="tabler:hash" class="w-5 h-5" />
          </div>
          <template v-for="tag in displayTags"
            :key="tag">
            <NuxtLink class="inline-flex items-center cursor-pointer p-1.5 rounded-md hover:bg-background-secondary active:bg-background-secondary transition duration-300"
              :to="localePath(`/archive?tag=${encodeURIComponent(tag)}`)"
            >
              {{ tag }}
            </NuxtLink>
            <div v-if="tag !== displayTags[displayTags.length - 1]">
              /
            </div>
          </template>
        </span>
      </div>

      <!-- 分隔线 -->
      <hr class="my-6 border-border" />

      <!-- 文章正文 -->
      <div class="prose prose-lg dark:prose-invert max-w-none">
        <ContentRenderer :value="post" />
      </div>
    </article>
  </div>
  </div>
</template>

<script setup lang="ts">
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

const displayTitle = computed(() => post.value?.title || '')
const displayDescription = computed(() => post.value?.description || '')
const displayTags = computed(() => post.value?.tags || [])

// 图片灯箱
useImageZoom()

const formattedDate = computed(() => {
  if (!post.value) return ''
  return new Date(post.value.date).toLocaleDateString(
    locale.value === 'zh-CN' ? 'zh-CN' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  )
})

useHead(() => ({
  title: `${displayTitle.value}`,
  meta: [
    { name: 'description', content: displayDescription.value },
  ],
}))
</script>
