<template>
  <button
    class="lg:hidden inline-flex items-center justify-center p-2 sm:p-3 rounded-lg text-foreground hover:bg-background-secondary transition-colors"
    aria-label="Menu"
    @click="$emit('click')"
  >
    <Icon name="tabler:menu-2" class="w-5 h-5" />
  </button>
</template>

<script setup lang="ts">
defineEmits<{
  click: []
}>()
</script>
