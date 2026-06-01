<template>
  <div class="block py-7 px-7 rounded-xl border border-border bg-surface">
    <!-- 封面图 -->
    <div v-if="post.coverImage" class="aspect-video -mx-7 -mt-7 mb-5 overflow-hidden rounded-t-xl">
      <NuxtImg
        :src="post.coverImage"
        :alt="displayTitle"
        class="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
      />
    </div>

    <!-- 置顶图标 -->
    <!-- <Icon
      v-if="post.featured"
      name="tabler:pin"
      class="w-4 h-4 text-foreground-secondary absolute top-3 right-3 z-10"
    /> -->

    <!-- 第一行: 标题 + hover 箭头 -->
    <NuxtLink 
      :to="localePath(`/posts/${postSlug}`)"
      class="group flex items-center gap-2 mb-3">
      <Icon
        v-if="post.featured"
        name="tabler:pin-filled"
        class="w-5 h-5 group-hover:text-accent"
      />
      <p class="text-xl font-semibold leading-snug group-hover:text-accent transition-colors">
        {{ displayTitle }}
      </p>
      <Icon
        name="tabler:chevron-right"
        class="w-6 h-6 text-accent shrink-0 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
      />
    </NuxtLink>

    <!-- 第二行: 描述 -->
    <p class="text-base text-foreground-secondary line-clamp-2 mb-5">
      {{ displayDescription }}
    </p>

    <!-- 第三行: 日期 + 字数 + 阅读时间-->
    <div class="flex items-center gap-5 text-sm text-foreground-secondary mb-3">
      <span class="inline-flex items-center gap-1">
        <Icon name="tabler:calendar-month-filled" class="w-4 h-4" />
        <time>{{ formattedDate }}</time>
      </span>
      <span class="inline-flex items-center gap-1">
        <Icon name="tabler:pencil-filled" class="w-4 h-4" />
        {{ t('post.wordCount', { count: post._wordCount }) }}
      </span>
      <span class="inline-flex items-center gap-1">
        <Icon name="tabler:clock-filled" class="w-4 h-4" />
        {{ t('post.minRead', { minute: post._readingTime }) }}
      </span>
    </div>

    <!-- 第四行: 标签 -->
    <div class="flex items-center flex-wrap gap-2 text-sm text-foreground-secondary">
      <span class="inline-flex items-center">
        <Icon name="tabler:hash" class="w-4 h-4" />
        <span
          v-for="tag in displayTags.slice(0, 3)"
          :key="tag"
          class="inline-flex items-center cursor-pointer mx-0.5 px-1 py-0.5 rounded hover:bg-background-secondary hover:text-accent transition-colors"
          @click.prevent.stop="toArchiveTag(tag)"
        >
          {{ tag }}
        </span>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ post: any }>()

const { t, locale } = useI18n()
const localePath = useLocalePath()

const displayTitle = computed(() => props.post._title || '')
const displayDescription = computed(() => props.post._description || '')
const displayTags = computed(() => props.post._tags || [])
const postSlug = computed(() => props.post._slug || '')

const formattedDate = computed(() => {
  const d = props.post._date
  if (!d) return ''
  return new Date(d).toLocaleDateString(
    locale.value === 'zh-CN' ? 'zh-CN' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  )
})

function toArchiveTag(tag: string) {
  navigateTo(localePath(`/archive?tag=${encodeURIComponent(tag)}`))
}
</script>
