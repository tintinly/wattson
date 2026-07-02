<template>
  <!-- /_content-media/ 路径的图片不使用 NuxtImg（IPX 无法访问 content 目录） -->
  <img
    v-if="isContentMedia"
    :src="refinedSrc"
    :alt="props.alt"
    :width="props.width"
    :height="props.height"
    v-bind="extraAttrs"
  />
  <!-- 其他图片走 NuxtImg IPX 优化 -->
  <img
    v-else
    :src="refinedSrc"
    :alt="props.alt"
    :width="props.width"
    :height="props.height"
    v-bind="extraAttrs"
  />
</template>

<script setup lang="ts">
import { withTrailingSlash, withLeadingSlash, joinURL } from 'ufo'

const props = defineProps({
  src: { type: String, default: '' },
  alt: { type: String, default: '' },
  width: { type: [String, Number], default: undefined },
  height: { type: [String, Number], default: undefined },
})

const attrs = useAttrs()

/** 透传非 props 的外部属性（如 style、class 等） */
const extraAttrs = computed(() => {
  const { src, alt, width, height, ...rest } = attrs
  return rest
})

const isContentMedia = computed(() => props.src?.startsWith('/_content-media/'))

const refinedSrc = computed(() => {
  if (props.src?.startsWith('/') && !props.src.startsWith('//')) {
    const _base = withLeadingSlash(withTrailingSlash(useRuntimeConfig().app.baseURL))
    if (_base !== '/' && !props.src.startsWith(_base)) {
      return joinURL(_base, props.src)
    }
  }
  return props.src
})
</script>
