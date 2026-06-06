<template>
  <div class="py-5 px-5 sm:py-8 sm:px-8 bg-surface rounded-xl border border-border flex flex-col">
    <p v-if="!timelineItems.length" class="text-center text-foreground-secondary py-20">{{ t('archive.empty') }}</p>
    <div v-for="(item, index) in timelineItems" :key="index">
      <!-- 年份标题 -->
      <div
        v-if="item.type === 'year'"
        class="flex flex-row h-12 items-center"
      >
        <div class="w-[15%] lg:w-[10%] text-right text-2xl font-bold select-none">
            {{ item.label }}
        </div>
        <div class="w-[15%] lg:w-[10%] relative  h-full flex items-center">
          <div class="mx-auto w-2 h-2 rounded-full group-hover:h-5
                       outline outline-3">
            </div>
        </div>
      </div>

      <!-- 文章条目 -->
      <NuxtLink
        v-else
        :to="localePath(`/posts/${item.slug}`)"
        class="group flex flex-row justify-start items-center h-10 rounded-lg text-base text-foreground-secondary  hover:bg-background-secondary active:bg-background-secondary"
      >
        <div class="w-[15%] lg:w-[10%] text-sm text-right">
            {{ item.dateStr }}
        </div>
        <div class="w-[15%] lg:w-[10%] relative h-full flex items-center
                    before:content-[''] before:w-full before:h-full before:left-[50%] before:translate-y-[-50%] before:border-l-2 before:border-dashed before:absolute">
          <div class="mx-auto w-1 h-1 rounded-full group-hover:h-5
                      bg-foreground-secondary transition-all duration-300">
          </div>
        </div>
        <div class="w-[65%] lg:w-[60%] ">
          <h3 class="text-foreground font-bold group-hover:translate-x-2 truncate transition-all duration-300 ">
            <span v-if="item.locale !== locale" class="inline-block px-1.5 py-0.5 border border-border text-foreground-secondary font-normal text-xs rounded-md bg-background-secondary">
              {{ item.locale }}
            </span>
            {{ item.title }}
          </h3>
        </div>
        <div class="hidden lg:block lg:w-[20%] text-sm text-right truncate px-2">
          #
          <span
            v-for="tag in item.tags"
            :key="tag"
            class="ml-1 cursor-pointer"
          >
            {{ tag }}
          </span>
          
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()
import type { PostContent } from '~~/app/types'

const props = defineProps<{
  posts: PostContent[]
  selectedTag: string | null
}>()

const localePath = useLocalePath()

interface TimelineItem {
  type: 'year' | 'post'
  label?: string
  slug?: string
  title?: string
  dateStr?: string
  tags?: string[]
  locale?: string
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
      dateStr: new Date(post._date).toLocaleDateString(
        locale.value === 'zh-CN' ? 'zh-CN' : 'en-US',
        { month: 'short', day: 'numeric' }
      ),
      tags: post.tags || [],
      locale: post._locale,
    })
  }

  return items
})
</script>
