<template>
  <div class="py-12 max-w-content mx-auto">
    <h1 class="text-3xl font-bold mb-8 text-center">{{ t('about.title') }}</h1>

    <div v-if="aboutPage" class="prose prose-lg dark:prose-invert max-w-none">
      <ContentRenderer :value="aboutPage" />
    </div>
    <p v-else class="text-foreground-secondary">{{ t('common.loading') }}</p>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

const { data: aboutPage } = await useAsyncData('about', () => {
  return queryCollection('content')
    .where('path', '=', '/about')
    .first()
})

useHead({
  title: `${t('about.title')}`,
})
</script>
