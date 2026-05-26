import mediumZoom from 'medium-zoom'

export function useImageZoom() {
  let zoom: ReturnType<typeof mediumZoom> | null = null

  onMounted(() => {
    nextTick(() => {
      // 只对文章内容区域内的图片生效
      const container = document.querySelector('article')
      if (!container) return
      const imgs = container.querySelectorAll('img:not([data-no-zoom])')
      zoom = mediumZoom(imgs, {
        margin: 24,
        background: 'rgba(0, 0, 0, 0.8)',
        scrollOffset: 0,
      })
    })
  })

  onUnmounted(() => {
    zoom?.detach()
  })
}
