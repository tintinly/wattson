<template>
  <ProseHeading :id="id" :level="3">
    <slot />
  </ProseHeading>
</template>

<script setup lang="ts">
defineProps<{ id: string }>()
</script>
