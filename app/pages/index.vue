<template>
  <div class="py-4  mx-auto">
    <div class="flex flex-col md:flex-row gap-4">
      <!-- 左侧: 作者卡片 -->
      <aside class="md:w-65 shrink-0">
        <HeroSection />
      </aside>

      <!-- 右侧: 文章列表 + 分页 -->
      <div class="flex-1 min-w-0">
        <section>
          <PostList v-if="pagedPosts.length" :posts="pagedPosts" />
          <p v-else class="text-center text-foreground-secondary">{{ t('home.noPosts') }}</p>
        </section>

        <!-- 分页 -->
        <nav v-if="totalPages > 1" class="mt-12 flex items-center justify-between" aria-label="分页导航">
          <!-- 上一页 -->
          <button
            :disabled="currentPage <= 1"
            class="px-3 py-3 sm:px-4 sm:py-2 flex items-center justify-center rounded-lg border border-border bg-surface hover:bg-background-secondary disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm"
            @click="currentPage--"
          >
            <icon name="tabler:chevron-left" class="w-4 h-4 md:mr-1.5" ></icon><span class="hidden sm:inline">{{ t('home.prev') }}</span>
          </button>

          <!-- 页码列表 -->
          <ol class="flex items-center gap-1">
            <li v-for="page in visiblePages" :key="page">
              <button v-if="typeof page === 'number'"
                class="w-10 h-10 disabled:opacity-40 text-sm rounded-lg border border-border bg-surface hover:bg-background-secondary transition-colors"
                :disabled="page === currentPage"
                @click="currentPage = page"
              >
                {{ page }}
              </button>
              <button disabled v-else class="w-10 h-10 rounded-lg text-sm transition-colors">
                {{ page }}
              </button>
            </li>
          </ol>

          <!-- 下一页 -->
          <button
            :disabled="currentPage >= totalPages"
            class="px-3 py-3 sm:px-4 sm:py-2 flex items-center justify-center rounded-lg border border-border bg-surface hover:bg-background-secondary disabled:opacity-40 text-sm"
            @click="currentPage++"
          >
            <span class="hidden sm:inline">{{ t('home.next') }}</span><icon name="tabler:chevron-right" class="w-4 h-4 md:ml-1.5" ></icon>
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()

const PAGE_SIZE = 10

// 分页状态
const currentPage = ref(1)

// 使用 Nuxt Content v3 queryCollection 获取文章
const { homePosts } = await usePosts(locale.value)

const totalPages = computed(() => Math.ceil(homePosts.value.length / PAGE_SIZE))

const pagedPosts = computed(() => {
  const start = (currentPage.value - 1) * PAGE_SIZE
  return homePosts.value.slice(start, start + PAGE_SIZE)
})

// 最大可见页码数，一般为奇数
const maxPageNumber = 7;
// 计算可见页码范围 超过最大页码数一半时居中显示当前页码左右的页码数 首页和末页始终显示
const visiblePages = computed(() => {
  const cur = currentPage.value
  const total = totalPages.value
  const allPages = Array.from({ length: total }, (_, i) => i + 1)
  if (total <= maxPageNumber) {
    return allPages
  } else {
    const pages = []
    // 首页始终显示
    pages.push(1)
    // 中间的页码范围
    const middlePageSize = maxPageNumber - 2
    let start = middlePageSize % 2 !== 0 ? cur - Math.floor(middlePageSize / 2) : cur - Math.floor(middlePageSize / 2) + 1
    let end = start + middlePageSize - 1
    if (start < 2) {
      start = 2
      end = middlePageSize + 1
    }
    if (end > total - 1) {
      end = total - 1
      start = total - middlePageSize
    }
    if (start > 2) {
      if (start === 3) {
        pages.push(2) // 如果只是省略第2页，直接显示2页
      } else {
        pages.push('...')
      }
    }
    for (let i = start; i <= end && i < total; i++) {
      pages.push(i)
    }
    if (end < total - 1) {
      if (end === total - 2) { // 如果只是省略倒数第二页，直接显示倒数第二页
        pages.push(total - 1)
      } else {
        pages.push('...')
      }
    }
    // 末页始终显示
    pages.push(total)
    return pages
  }

})

useHead({
  meta: [
    { name: 'description', content: '个人技术博客' },
  ],
})
</script>
