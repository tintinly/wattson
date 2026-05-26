<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) => titleChunk ? `${titleChunk} - Wattson's Blog` : "Wattson's Blog"
})
</script>