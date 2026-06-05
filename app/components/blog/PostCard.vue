<template>
  <div class="block py-5 px-5 sm:py-8 sm:px-8 rounded-xl border border-border bg-surface">
    <!-- 封面图（可点击进入文章） -->
    <NuxtLink v-if="post.coverImage" :to="localePath(`/posts/${postSlug}`)" class="block h-54 -mx-5 -mt-5 sm:-mx-8 sm:-mt-8 mb-5 overflow-hidden rounded-t-xl">
      <NuxtImg
        :src="post.coverImage"
        :alt="displayTitle"
        class="w-full h-full object-cover object-center hover:scale-105 active:scale-105 transition-transform duration-500"
      />
    </NuxtLink>

    <!-- 置顶 + 标题 + 箭头 -->
    <NuxtLink 
      :to="localePath(`/posts/${postSlug}`)"
      class="block group text-2xl font-semibold hover:text-accent active:text-accent transition-colors leading-snug gap-2 mb-3">
      <Icon
        v-if="post.featured"
        name="tabler:pin"
        class="inline w-5 h-5 -translate-y-0.5 "
      />
        {{ displayTitle }}
      <Icon
        name="tabler:chevron-right"
        class="inline w-6 h-6  shrink-0 opacity-100 md:opacity-0 -translate-x-1 -translate-y-0.5 md:group-hover:opacity-100 md:group-hover:translate-x-1 transition-all duration-300"
      />
    </NuxtLink>

    <!-- 日期-->
    <div class="flex flex-wrap items-center gap-5 text-sm text-foreground-secondary mb-3">
      <span class="inline-flex items-center gap-1">
        <div class="p-1.5 rounded-md bg-background-secondary">
          <Icon name="tabler:calendar-month" class="w-4.5 h-4.5" />
        </div>
        <time>{{ formattedDate }}</time>
      </span>
    </div>

    <!-- 描述 -->
    <p class="text-base text-foreground-secondary mb-3">
        <span v-if="post._locale !== locale" class="inline-block px-1.5 py-0.5 border border-border text-xs rounded-md bg-background">
          {{ post._locale }}
        </span>
        {{ displayDescription }}
    </p>

    <!-- 标签 -->
    <div class="flex flex-wrap items-center gap-1 text-xs text-foreground-secondary">
      <span
        v-for="tag in displayTags.slice(0, 3)"
        :key="tag"
        class="inline-flex items-center cursor-pointer mx-0.5 px-1 py-0.5 rounded  border border-border bg-background-secondary hover:bg-background-tertiary hover:border-border-secondary active:bg-background-tertiary active:border-border-secondary"
        @click.prevent.stop="toArchiveTag(tag)"
      >
        # {{ tag }}
      </span>
    </div>
  </div>
  
</template>

<script setup lang="ts">
const props = defineProps<{ post: any }>()

const { t, locale } = useI18n()
const localePath = useLocalePath()

const displayTitle = computed(() => props.post.title || '')
const displayDescription = computed(() => props.post.description || '')
const displayTags = computed(() => props.post.tags || [])
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
