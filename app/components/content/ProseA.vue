<template>
  <!-- 外部链接默认新标签页打开 -->
  <a
    v-if="isExternal"
    :href="props.href"
    target="_blank"
    rel="noopener noreferrer"
  >
    <slot />
  </a>
  <!-- 站内链接保持默认行为 -->
  <a v-else :href="props.href">
    <slot />
  </a>
</template>

<script setup lang="ts">
const props = defineProps({
  href: { type: String, default: '' },
})

/** 判断是否外部链接（以 http:// 或 https:// 开头） */
const isExternal = computed(() => /^https?:\/\//.test(props.href))
</script>
