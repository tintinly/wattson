<template>
  <!-- /_content-media/ 路径的图片不使用 NuxtImg（IPX 无法访问 content 目录） -->
  <img
    :src="props.src"
    :alt="props.alt"
    :width="props.width"
    :height="props.height"
    v-bind="$attrs"
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
          class="relative max-w-[90vw] max-h-[90vh] object-contain shadow-2xl animate-fade-in"
        />
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { withTrailingSlash, withLeadingSlash, joinURL } from 'ufo'

/* $attrs 是所有非 props 的外部属性 */
const props = defineProps({
  src: { type: String, default: '' },
  alt: { type: String, default: '' },
  width: { type: [String, Number], default: undefined },
  height: { type: [String, Number], default: undefined },
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
