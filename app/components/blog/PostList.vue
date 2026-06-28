<template>
  <div class="flex flex-col gap-2 sm:gap-4">
    <PostCard v-for="(post, index) in posts" :key="post.id" :post="post" />
  </div>
</template>

<script setup lang="ts">
defineProps<{ posts: any[] }>()
</script>
