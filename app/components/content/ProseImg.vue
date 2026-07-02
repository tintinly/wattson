<template>
  <!-- /_content-media/ 路径的图片不使用 NuxtImg（IPX 无法访问 content 目录） -->
  <img
    :src="refinedSrc"
    v-bind="extraAttrs"
    class="cursor-zoom-in"
    @click="open"
  />

  <!-- 灯箱 -->
  <Teleport to="body">
    <Transition name="lightbox">
      <div
        v-if="lightboxOpen"
        class="fixed inset-0 z-50 flex items-center justify-center cursor-zoom-out"
        @click="close"
      >
        <!-- 遮罩 -->
        <div class="absolute inset-0 bg-black/80" />
        <!-- 图片 -->
        <img
          :src="props.src"
          :alt="props.alt"
          class="relative max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl animate-fade-in"
        />
      </div>
    </Transition>
  </Teleport>
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

const lightboxOpen = ref(false)

function open() {
  lightboxOpen.value = true
}

function close() {
  lightboxOpen.value = false
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') close()
}

watch(lightboxOpen, (val) => {
  if (val) {
    document.addEventListener('keydown', onKeydown)
    document.body.style.overflow = 'hidden'
  } else {
    document.removeEventListener('keydown', onKeydown)
    document.body.style.overflow = ''
  }
})

onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})

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

<style scoped>
.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.2s ease;
}
.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}
</style>
