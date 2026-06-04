<template>
  <div class="py-12 max-w-content mx-auto">
    <h1 class="text-3xl font-bold mb-8 text-center">{{ t('about.title') }}</h1>

    <div v-if="aboutPage" class="bg-surface rounded-2xl shadow-lg ring-1 ring-border p-6 sm:p-10 prose prose-lg dark:prose-invert max-w-none">
      <ContentRenderer :value="aboutPage" />
    </div>
    <p v-else class="text-foreground-secondary">{{ t('common.loading') }}</p>
  </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()

// key 包含 locale，切换语言时 refresh 重新查询对应语言的内容
const { data: aboutPage, refresh } = await useAsyncData(`about-${locale.value}`, () => {
  return queryCollection('specials')
    .path(`/specials/about/${locale.value.toLowerCase()}`)
    .first()
})

watch(locale, () => {
  refresh()
})

useHead({
  title: `${t('about.title')}`,
})
</script>
