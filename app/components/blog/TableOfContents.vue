<template>
  <aside
    v-if="headings.length > 0"
    class="hidden lg:block md:w-70  shrink-0"
  >
    <div class="sticky top-22 bg-surface rounded-xl border border-border p-4">
      <h3 class="text-sm font-semibold mb-3">
        {{ t('post.toc') }}
      </h3>
      <nav class="flex flex-col gap-0.5 text-sm max-h-[calc(100vh-12rem)] overflow-y-auto">
        <a
          v-for="h in headings"
          :key="h.id"
          :href="`#${h.id}`"
          class="hover:text-foreground active:text-foreground transition-colors py-1 rounded-md px-2"
          :class="[
            activeId === h.id ? 'text-foreground bg-background-secondary' : 'text-foreground-secondary',
            h.depth === 3 ? 'pl-5': ''
          ]"
          @click.prevent="scrollTo(h.id)"
        >
          {{ h.text }}
        </a>
      </nav>
    </div>
  </aside>
</template>

<script setup lang="ts">
const { t } = useI18n()

const props = defineProps<{ content: any }>()

interface Heading {
  id: string
  text: string
  depth: number
}

const headings = computed<Heading[]>(() => {
  // 从 rawbody（原始 markdown）中提取标题
  const body = props.content?.rawbody
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
