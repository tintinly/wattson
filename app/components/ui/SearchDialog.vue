<template>
  <Teleport to="body">
    <Transition name="dialog">
      <div
        v-if="isSearchOpen"
        class="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="closeSearch" />

        <!-- Dialog -->
        <div
          class="relative w-full max-w-lg mx-4 rounded-2xl bg-surface border border-border shadow-2xl p-4 animate-fade-in"
        >
          <!-- Input -->
          <div class="flex items-center gap-3 px-3 py-2 rounded-xl bg-background-secondary border border-border focus-within:border-accent transition-colors">
            <svg class="w-5 h-5 text-foreground-secondary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              ref="inputRef"
              v-model="query"
              :placeholder="t('search.placeholder')"
              class="flex-1 bg-transparent outline-none text-base text-foreground placeholder:text-foreground-secondary"
              autofocus
            />
            <kbd class="hidden sm:inline text-xs text-foreground-secondary bg-background border border-border px-1.5 py-0.5 rounded">ESC</kbd>
          </div>

          <!-- Results -->
          <div class="mt-4 max-h-72 overflow-y-auto">
            <!-- No input hint -->
            <p v-if="!query.trim()" class="text-sm text-foreground-secondary text-center py-4">
              {{ t('search.shortcut') }}
            </p>

            <!-- No results -->
            <p v-else-if="results.length === 0 && !loading" class="text-sm text-foreground-secondary text-center py-4">
              {{ t('search.noResults') }}
            </p>

            <!-- Loading -->
            <p v-else-if="loading" class="text-sm text-foreground-secondary text-center py-4">
              {{ t('common.loading') }}
            </p>

            <!-- Results -->
            <template v-else>
              <p class="text-xs text-foreground-secondary mb-2 ml-1">
                {{ t('search.results', { count: results.length }) }}
              </p>
              <NuxtLink
                v-for="item in results"
                :key="item.slug"
                :to="localePath(`/posts/${item.slug}`)"
                class="block px-3 py-2.5 rounded-lg hover:bg-background-secondary transition-colors group"
                @click="closeSearch"
              >
                <span class="font-medium text-sm group-hover:text-accent transition-colors">
                  {{ locale === 'en-US' ? item.titleEn : item.title }}
                </span>
                <span class="block text-xs text-foreground-secondary mt-0.5 line-clamp-1">
                  {{ locale === 'en-US' ? item.descriptionEn : item.description }}
                </span>
              </NuxtLink>
            </template>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import Fuse from 'fuse.js'

interface SearchItem {
  slug: string
  title: string
  titleEn: string
  description: string
  descriptionEn: string
  tags: string[]
  tagsEn: string[]
  date: string
  content: string
}

const { t, locale } = useI18n()
const localePath = useLocalePath()
const { isSearchOpen, closeSearch } = useSearch()

const query = ref('')
const results = ref<SearchItem[]>([])
const loading = ref(false)
const inputRef = ref<HTMLInputElement | null>(null)
let fuse: Fuse<SearchItem> | null = null
let allItems: SearchItem[] = []

// 加载搜索索引
watch(isSearchOpen, async (open) => {
  if (!open) return
  query.value = ''
  results.value = []

  if (fuse) {
    nextTick(() => inputRef.value?.focus())
    return
  }

  loading.value = true
  try {
    const res = await fetch('/search-index.json')
    allItems = await res.json()
    fuse = new Fuse(allItems, {
      keys: [
        { name: 'title', weight: 2 },
        { name: 'titleEn', weight: 2 },
        { name: 'description', weight: 1.5 },
        { name: 'descriptionEn', weight: 1.5 },
        { name: 'tags', weight: 1 },
        { name: 'tagsEn', weight: 1 },
        { name: 'content', weight: 0.5 },
      ],
      threshold: 0.4,
      includeScore: true,
    })
  } catch {
    // 索引加载失败，静默处理
  }
  loading.value = false
  nextTick(() => inputRef.value?.focus())
})

// 实时搜索
watch(query, (val) => {
  if (!fuse || !val.trim()) {
    results.value = []
    return
  }
  results.value = fuse.search(val.trim()).slice(0, 10).map(r => r.item)
})

// 全局键盘快捷键
function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && isSearchOpen.value) {
    e.preventDefault()
    closeSearch()
    return
  }
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault()
    isSearchOpen.value ? closeSearch() : useSearch().openSearch()
  }
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<style scoped>
.dialog-enter-active,
.dialog-leave-active {
  transition: opacity 0.2s ease;
}
.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
}
</style>
