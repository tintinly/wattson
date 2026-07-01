<template>
  <ProseHeading :id="id" :level="1">
    <slot />
  </ProseHeading>
</template>

<script setup lang="ts">
defineProps<{ id: string }>()
</script>
