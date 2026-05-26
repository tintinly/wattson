<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <PostCard v-for="(post, index) in posts" :key="post.id" :post="post" />
  </div>
</template>

<script setup lang="ts">
defineProps<{ posts: any[] }>()
</script>
