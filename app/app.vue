<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup lang="ts">
import { siteConfig } from '~~/data/site-config'
const { locale } = useI18n()

const siteTitle = computed(() =>
  locale.value.indexOf('zh') !== -1 ? siteConfig.site.title : siteConfig.site.titleEn
)

useHead({
  titleTemplate: (titleChunk) => titleChunk ? `${titleChunk} - ${siteTitle.value}` : siteTitle.value
})
</script>

<style scoped>
/* 页面过渡动画（Nuxt pageTransition） */
.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease;
}
.page-enter-from {
  opacity: 0;
  transform: translateY(25px);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(25px);
}
</style>
