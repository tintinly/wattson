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
  <!-- 站内链接：锚点链接转小写以匹配 github-slugger 生成的 id -->
  <a v-else :href="normalizedHref">
    <slot />
  </a>
</template>

<script setup lang="ts">
const props = defineProps({
  href: { type: String, default: '' },
})

/** 判断是否外部链接（以 http:// 或 https:// 开头） */
const isExternal = computed(() => /^https?:\/\//.test(props.href))

/** 锚点链接转小写以匹配 github-slugger 生成的 heading id */
const normalizedHref = computed(() => {
  if (props.href.startsWith('#')) {
    return props.href.toLowerCase()
  }
  return props.href
})
</script>
