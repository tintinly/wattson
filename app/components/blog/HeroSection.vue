<template>
  <div class="bg-surface rounded-xl border border-border p-6 flex flex-col items-center text-center">
    <!-- 头像 -->
    <div class="size-56 rounded-xl overflow-hidden mb-4 flex items-center justify-center relative shrink-0">
      <NuxtImg :src="siteConfig.author.avatar" :alt="siteConfig.author.name" class="inset-0 object-cover" />
    </div>

    <!-- 名字 -->
    <h2 class="text-xl font-semibold mb-2">
      {{ siteConfig.author.name }}
    </h2>

    <!-- 简介 -->
    <p class="text-foreground-secondary mb-4">
      {{ bio }}
    </p>

    <!-- 社交链接 -->
     <div class="flex flex-wrap justify-center gap-1.5">
        <template v-for="item in siteConfig.social" :key="item.name">
          <a v-if="item.type === 'link'" :href="item.url" target="_blank" rel="noopener noreferrer" :title="item.name" 
            class="p-2 rounded-lg bg-background-secondary border border-border text-foreground-secondary hover:border-border-secondary hover:bg-background-tertiary active:border-border-secondary active:bg-background-tertiary transition-colors duration-300">
            <Icon :name="item.icon" class="w-6 h-6" />
          </a>
          <button v-if="item.type === 'account'" :title="item.name" @click="copyId(item.number as string)"
            class="p-2 rounded-lg bg-background-secondary border border-border text-foreground-secondary hover:border-border-secondary hover:bg-background-tertiary active:border-border-secondary active:bg-background-tertiary transition-colors duration-300 cursor-pointer">
            <Icon :name="item.icon" class="w-6 h-6" />
          </button>
        </template>
     </div>
  </div>
</template>

<script setup lang="ts">
import { siteConfig } from '~/data/site-config'
const { locale } = useI18n()
const toast = useToast()


const bio = computed(() =>
  locale.value.indexOf('zh') !== -1 ? siteConfig.author.bio : siteConfig.author.bioEn
)

async function copyId(text: string) {
  try {
    await navigator.clipboard.writeText(text)
  } catch {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    document.execCommand('copy')
    document.body.removeChild(ta)
  }
  toast.show(`已复制: ${text}`)
}
</script>
