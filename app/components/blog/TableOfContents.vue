<template>
  <ClientOnly>
    <aside
      v-if="headings.length > 0"
      class="hidden lg:block w-56 shrink-0"
    >
      <div class="sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto">
        <h3 class="text-sm font-semibold text-foreground-secondary mb-3 uppercase tracking-wider">
          TOC
        </h3>
        <nav class="flex flex-col gap-1 text-sm">
          <a
            v-for="h in headings"
            :key="h.id"
            :href="`#${h.id}`"
            class="text-foreground-secondary hover:text-accent transition-colors py-0.5 border-l-2 border-transparent pl-3"
            :class="{
              'text-accent border-accent': activeId === h.id,
              'pl-6': h.depth === 3,
            }"
            @click.prevent="scrollTo(h.id)"
          >
            {{ h.text }}
          </a>
        </nav>
      </div>
    </aside>
  </ClientOnly>
</template>

<script setup lang="ts">
const props = defineProps<{ content: any }>()

interface Heading {
  id: string
  text: string
  depth: number
}

const headings = computed<Heading[]>(() => {
  // 从 MD 渲染内容中提取标题
  const body = props.content?.body as string
  if (!body) return []

  const headingRegex = /^(#{2,3})\s+(.+)$/gm
  const result: Heading[] = []
  let match: RegExpExecArray | null

  while ((match = headingRegex.exec(body)) !== null) {
    const depth = match[1].length
    const text = match[2].trim()
    const id = text
      .toLowerCase()
      .replace(/[^\w一-鿿\s-]/g, '')
      .replace(/\s+/g, '-')
    result.push({ id, text, depth })
  }

  return result
})

const activeId = ref('')

function onScroll() {
  for (const h of headings.value) {
    const el = document.getElementById(h.id)
    if (el) {
      const rect = el.getBoundingClientRect()
      if (rect.top >= 0 && rect.top < 200) {
        activeId.value = h.id
        break
      }
    }
  }
}

function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    activeId.value = id
  }
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>
