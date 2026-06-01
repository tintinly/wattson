<template>
  <button
    class="inline-flex items-center justify-center p-3 rounded-lg text-foreground hover:text-foreground hover:bg-background-secondary transition-colors"
    @click="toggleColorMode"
  >
    <Icon v-if="colorMode.preference === 'light'" name="tabler:sun" class="w-5 h-5" />
    <Icon v-else-if="colorMode.preference === 'dark'" name="tabler:moon" class="w-5 h-5" />
    <Icon v-else name="tabler:device-desktop" class="w-5 h-5" />
  </button>
</template>

<script setup lang="ts">
const colorMode = useColorMode()

function toggleColorMode() {
  if (colorMode.preference === 'system') {
    colorMode.preference = 'light'
  } else if (colorMode.preference === 'light') {
    colorMode.preference = 'dark'
  } else {
    colorMode.preference = 'system'
  }
}
</script>
