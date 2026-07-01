<template>
  <ProseHeading :id="id" :level="4">
    <slot />
  </ProseHeading>
</template>

<script setup lang="ts">
defineProps<{ id: string }>()
</script>
