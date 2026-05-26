<template>
  <NuxtLink
    :to="localePath(`/posts/${postSlug}`)"
    class="group block p-6 rounded-xl border border-border bg-background hover:border-accent/30 hover:shadow-lg transition-all duration-300"
  >
    <!-- 封面图 -->
    <div v-if="post.coverImage" class="aspect-video -mx-6 -mt-6 mb-4 overflow-hidden rounded-t-xl">
      <img
        :src="post.coverImage"
        :alt="post.coverImageAlt || displayTitle"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
    </div>

    <!-- 内容 -->
    <div class="space-y-3">
      <h3 class="text-lg font-semibold leading-snug group-hover:text-accent transition-colors">
        {{ displayTitle }}
      </h3>
      <p class="text-sm text-foreground-secondary line-clamp-2">
        {{ displayDescription }}
      </p>

      <!-- 标签 + 日期 -->
      <div class="flex items-center justify-between flex-wrap gap-2">
        <div class="flex flex-wrap gap-1.5">
          <span
            v-for="tag in displayTags.slice(0, 3)"
            :key="tag"
            class="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent"
          >
            {{ tag }}
          </span>
        </div>
        <time class="text-xs text-foreground-secondary font-mono">
          {{ formattedDate }}
        </time>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps<{ post: any }>()

const { locale } = useI18n()
const localePath = useLocalePath()

const displayTitle = computed(() => props.post._title || '')
const displayDescription = computed(() => props.post._description || '')
const displayTags = computed(() => props.post._tags || [])
const postSlug = computed(() => props.post._slug || '')

const formattedDate = computed(() => {
  const d = props.post._date
  if (!d) return ''
  return d.toLocaleDateString(
    locale.value === 'zh-CN' ? 'zh-CN' : 'en-US',
    { year: 'numeric', month: '2-digit', day: '2-digit' }
  )
})
</script>
