<template>
  <div class="mx-auto">
    <div class="flex flex-col md:flex-row gap-2 sm:gap-4">
      <!-- 左侧: 分类筛选 + 标签筛选 -->
      <aside class="shrink-0">
        <div class="md:w-70 md:sticky md:top-4 flex flex-col gap-2 sm:gap-4">
          <CategoryFilter :categories="allCategories" :selected-category="selectedCategory" @select="categorySelect($event)" />
          <TagFilter :tags="filteredTags" :selected-tags="selectedTags" @select="tagSelect($event)" />
        </div>
      </aside>

      <!-- 时间线 -->
      <div class="flex-1 min-w-0">
        <section>
          <Timeline :posts="filteredPosts" :selected-tags="selectedTags" :selected-category="selectedCategory" />
        </section>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
// query 参数变化时强制重建组件，触发 setup 重新执行和页面过渡动画
definePageMeta({
  key: (route) => route.path + route.query.category
})

const { t, locale } = useI18n()
const route = useRoute()
const router = useRouter()
const tag = Array.isArray(route.query.tag) ? route.query.tag : route.query.tag?.split(',') 
// const category = Array.isArray(route.query.category) ? route.query.category : route.query.category?.split(',') 

const selectedTags = ref<string[] | null>((tag as string[]) || null)
const selectedCategory = ref<string | null>((route.query.category as string) || null)

const { allCategories } = await usePosts(locale.value)

const { posts:filteredPosts, allTags:filteredTags } = await usePosts(locale.value, selectedCategory.value)

const tagSelect = (tag: string | null) => {
  if (tag !== null) {
    if (selectedTags.value === null || selectedTags.value.length === 0) {
      selectedTags.value = [tag]
    } else if (selectedTags.value.includes(tag)) {
      selectedTags.value = selectedTags.value.filter((t) => t !== tag) 
    } else {
      selectedTags.value = [...selectedTags.value, tag]
    }
    router.replace({
      query: {
        ...route.query,
        tag: selectedTags.value.join(','),
      }
    })
  } else {
    selectedTags.value = []
  }
  
  if (!selectedTags.value?.length) {
    const { tag, ...restQuery } = route.query; 
    router.replace({
      query: restQuery
    })
  }
}

const categorySelect = (category: string | null) => {

  selectedCategory.value = category

  let newQuery = { ...route.query };
  delete newQuery.tag;

  if (selectedCategory.value !== null) {
    newQuery.category = selectedCategory.value;
  } else {
    delete newQuery.category;
  }

  router.push({
    path: route.path, 
    query: newQuery
  })
}



useHead({
  title: `${t('archive.title')}`,
})
</script>
