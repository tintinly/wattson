<template>
  <div class="space-y-0">
    <div v-for="(item, index) in timelineItems" :key="index">
      <!-- 年份标题 -->
      <div
        v-if="item.type === 'year'"
        class="sticky top-16 z-10 py-4 bg-background/95 backdrop-blur-sm"
      >
        <h2 class="text-3xl font-bold text-accent/30 select-none">
          {{ item.label }}
        </h2>
      </div>

      <!-- 文章条目 -->
      <NuxtLink
        v-else
        :to="localePath(`/posts/${item.slug}`)"
        class="group flex items-start gap-4 py-4 border-b border-border/50 hover:bg-background-secondary/50 active:bg-background-secondary/50 transition-colors -mx-4 px-4 rounded-lg"
      >
        <time class="shrink-0 text-sm text-foreground-secondary font-mono mt-1">
          {{ item.dateStr }}
        </time>
        <div class="flex-1 min-w-0">
          <h3 class="text-base font-medium group-hover:text-accent group-active:text-accent transition-colors truncate">
            {{ item.title }}
          </h3>
          <div class="flex flex-wrap gap-1.5 mt-1.5">
            <span
              v-for="tag in item.tags"
              :key="tag"
              class="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PostContent } from '~~/app/types'

const props = defineProps<{
  posts: PostContent[]
  selectedTag: string | null
}>()

const { locale } = useI18n()
const localePath = useLocalePath()

interface TimelineItem {
  type: 'year' | 'post'
  label?: string
  slug?: string
  title?: string
  dateStr?: string
  tags?: string[]
}

const timelineItems = computed<any[]>(() => {
  const filtered = props.selectedTag
    ? props.posts.filter((p: any) => p.tags?.includes(props.selectedTag!))
    : props.posts

  const items: any[] = []
  let lastYear = 0

  for (const post of filtered) {
    const date = post._date
    const year = date?.getFullYear()
    if (year !== lastYear) {
      items.push({ type: 'year', label: String(year) })
      lastYear = year
    }
    items.push({
      type: 'post',
      slug: post._slug,
      title: post.title,
      dateStr: date?.toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit' }),
      tags: post.tags || [],
    })
  }

  return items
})
</script>
