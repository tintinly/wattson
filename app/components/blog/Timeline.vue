<template>
  <div class="py-4 px-4 sm:py-7 sm:px-7 bg-surface rounded-xl border border-border flex flex-col">
    <p v-if="!timelineItems.length" class="text-center text-foreground-secondary py-20">{{ t('archive.empty') }}</p>
    <div v-for="(item, index) in timelineItems" :key="index">
      <!-- 年份标题 -->
      <div v-if="item.type === 'year'" class="flex flex-row h-15 items-center text-foreground">
        <div class="w-[20%] lg:w-[10%] text-right text-2xl font-bold select-none">
          {{ item.label }}
        </div>
        <div class="w-[15%] lg:w-[10%] relative  h-full flex items-center">
          <div class="mx-auto w-2 h-2 rounded-full group-hover:h-5 
              outline-3  z-10">
          </div>
        </div>
      </div>

      <!-- 文章条目 -->
      <NuxtLink v-else :to="localePath(`/posts/${item.slug}`)"
        class="group flex flex-row justify-start items-center h-10 rounded-lg text-base  hover:bg-background-secondary active:bg-background-secondary  transition-all duration-300">
        <div class="w-[20%] lg:w-[10%] text-xs text-right text-foreground-secondary/75">
          {{ item.dateStr }}
        </div>
        <div
          class="w-[15%] lg:w-[10%] relative h-full flex items-center
                    before:content-[''] before:w-full before:h-full before:left-[50%] before:translate-y-[-50%] before:translate-x-[-1px] before:border-l-2 before:border-dashed before:absolute before:border-foreground-secondary/25">
          <div class="mx-auto w-1 h-1 rounded-full group-hover:h-5
                      bg-foreground-secondary ring-4 ring-surface group-hover:ring-background-secondary
                      relative z-10 transition-all duration-300">
          </div>
        </div>
        <div class="w-[65%] lg:w-[60%] ">
          <h3 class="text-foreground/80 font-bold text-sm sm:text-base group-hover:translate-x-2 truncate transition-all duration-300 ">
            <span v-if="item.locale !== locale"
              class="inline-block px-1.5 py-0.5 border border-border text-foreground-secondary font-normal text-xs rounded-md bg-background-secondary">
              {{ item.locale }}
            </span>
            {{ item.title }}
          </h3>
        </div>
        <div class="hidden lg:block lg:w-[20%] text-sm text-right truncate px-2  text-foreground-secondary/75">
          #
          <span v-for="tag in item.tags" :key="tag" class="ml-1 cursor-pointer">
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
  selectedTags: string[] | null
  selectedCategory: string | null
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
  let filtered = props.posts

  if (props.selectedTags?.length) {
    filtered = filtered.filter((p: any) => (p.tags.some((tag) => props.selectedTags?.includes(tag))))
  }

  if (props.selectedCategory) {
    filtered = filtered.filter((p: any) => p._category === props.selectedCategory)
  }

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
