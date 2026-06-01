<template>
  <div class="mb-8 -mx-4 sm:mx-0 overflow-hidden rounded-xl">
    <NuxtImg
      :src="src"
      :alt="alt || ''"
      class="w-full max-h-96 object-cover"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  src: string
  alt?: string
}>()
</script>
