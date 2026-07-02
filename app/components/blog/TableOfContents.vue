<template>
  <aside
    v-if="headings.length > 0"
    class="hidden lg:block md:w-70  shrink-0"
  >
    <div class="bg-surface rounded-xl border border-border p-4">
      <h3 class="text-sm font-semibold mb-3">
        {{ t('post.toc') }}
      </h3>
      <nav class="flex flex-col gap-0.5 text-sm max-h-[60vh] overflow-y-auto">
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
const props = defineProps<{ toc: any }>()

interface Heading {
  id: string
  text: string
  depth: number
}

const headings = computed<Heading[]>(() => {
  const links = props.toc?.links || []
  if (!links) return []

  const result: Heading[] = []
  function handleLinksTree(tree: any[], list: any[]) {
    tree.forEach((item) => {
      list.push(item)
      // 如果存在 children 下一层，则递归遍历并赋值
      if (item?.children?.length) {
        handleLinksTree(item.children, data);
      }
    });
    return data;
  }
  const data = [] as any[];
  var linkList = handleLinksTree(links, data)

  for (const item of linkList) {
    result.push({ id: item.id, text: item.text, depth: item.depth })
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
    el.scrollIntoView()
    activeId.value = id
  }
  // history.replaceState(null, '', `#${id}`)
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>
