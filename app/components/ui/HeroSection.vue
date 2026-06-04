<template>
  <div class="bg-surface rounded-xl border border-border p-6 md:sticky md:top-22 flex flex-col items-center text-center">
    <!-- 头像 -->
    <div class="size-56 rounded-xl overflow-hidden mb-4 border border-border flex items-center justify-center relative shrink-0">
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
      <a
        v-if="siteConfig.social.github"
        :href="siteConfig.social.github"
        target="_blank"
        rel="noopener noreferrer"
        class="p-2 rounded-lg bg-background-secondary border border-border text-foreground-secondary hover:border-border-secondary hover:text-foreground active:border-border-secondary active:text-foreground transition-colors"
        title="GitHub"
      >
        <Icon name="tabler:brand-github" class="w-6 h-6" />
      </a>
      <a
        v-if="siteConfig.social.bilibili"
        :href="siteConfig.social.bilibili"
        target="_blank"
        rel="noopener noreferrer"
        class="p-2 rounded-lg bg-background-secondary border border-border text-foreground-secondary hover:border-border-secondary hover:text-foreground active:border-border-secondary active:text-foreground transition-colors"
        title="Bilibili"
      >
        <Icon name="tabler:brand-bilibili" class="w-6 h-6" />
      </a>
      <button
        v-if="siteConfig.social.qq"
        class="p-2 rounded-lg bg-background-secondary border border-border text-foreground-secondary hover:border-border-secondary hover:text-foreground active:border-border-secondary active:text-foreground transition-colors"
        title="QQ"
        @click="copyId(siteConfig.social.qq, 'QQ')"
      >
        <Icon name="ri:qq-line" class="w-6 h-6" />
      </button>
      <button
        v-if="siteConfig.social.wechat"
        class="p-2 rounded-lg bg-background-secondary border border-border text-foreground-secondary hover:text-foreground hover:border-border-secondary active:text-foreground active:border-border-secondary transition-colors"
        title="微信"
        @click="copyId(siteConfig.social.wechat, '微信')"
      >
        <Icon name="tabler:brand-wechat" class="w-6 h-6" />
      </button>
      <a
        v-if="siteConfig.social.email"
        :href="siteConfig.social.email"
        class="p-2 rounded-lg bg-background-secondary border border-border text-foreground-secondary hover:text-foreground hover:border-border-secondary active:text-foreground active:border-border-secondary transition-colors"
        title="Email"
      >
        <Icon name="tabler:mail" class="w-6 h-6" />
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { siteConfig } from '~~/data/site-config'
const { locale } = useI18n()
const toast = useToast()


const bio = computed(() =>
  locale.value.indexOf('zh') !== -1 ? siteConfig.author.bio : siteConfig.author.bioEn
)

async function copyId(text: string, label: string) {
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
  toast.show(`${label}已复制: ${text}`)
}
</script>
