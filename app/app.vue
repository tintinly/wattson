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