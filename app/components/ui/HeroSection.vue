<template>
  <div class="bg-surface rounded-xl border border-border p-6 md:sticky md:top-24 flex flex-col items-center text-center">
    <!-- 头像 -->
    <div class="size-50 rounded-xl border-2 border-border overflow-hidden mb-4 bg-background-secondary flex items-center justify-center relative shrink-0">
      <NuxtImg ref="avatarRef" :src="siteConfig.author.avatar" :alt="siteConfig.author.name" class="absolute inset-0 w-full h-full object-cover" :class="imgLoaded ? '' : 'invisible'" @load="imgLoaded = true" />
      <span v-if="!imgLoaded" class="text-3xl">👋</span>
    </div>

    <!-- 名字 -->
    <h2 class="text-base font-semibold mb-2">
      {{ siteConfig.author.name }}
    </h2>

    <!-- 简介 -->
    <p class="text-sm text-foreground-secondary mb-4">
      {{ bio }}
    </p>

    <!-- 社交链接 -->
    <div class="flex flex-wrap justify-center gap-1.5">
      <a
        v-if="siteConfig.social.github"
        :href="siteConfig.social.github"
        target="_blank"
        rel="noopener noreferrer"
        class="p-2.5 rounded-lg bg-background-secondary border border-border text-foreground-secondary hover:text-foreground hover:border-accent transition-colors"
        title="GitHub"
      >
        <Icon name="tabler:brand-github" class="w-5 h-5" />
      </a>
      <a
        v-if="siteConfig.social.bilibili"
        :href="siteConfig.social.bilibili"
        target="_blank"
        rel="noopener noreferrer"
        class="p-2.5 rounded-lg bg-background-secondary border border-border text-foreground-secondary hover:text-foreground hover:border-accent transition-colors"
        title="Bilibili"
      >
        <Icon name="tabler:brand-bilibili" class="w-5 h-5" />
      </a>
      <button
        v-if="siteConfig.social.qq"
        class="p-2.5 rounded-lg bg-background-secondary border border-border text-foreground-secondary hover:text-foreground hover:border-accent transition-colors"
        title="QQ"
        @click="copyId(siteConfig.social.qq, 'QQ')"
      >
        <Icon name="ri:qq-line" class="w-5 h-5" />
      </button>
      <button
        v-if="siteConfig.social.wechat"
        class="p-2.5 rounded-lg bg-background-secondary border border-border text-foreground-secondary hover:text-foreground hover:border-accent transition-colors"
        title="微信"
        @click="copyId(siteConfig.social.wechat, '微信')"
      >
        <Icon name="tabler:brand-wechat" class="w-5 h-5" />
      </button>
      <a
        v-if="siteConfig.social.email"
        :href="siteConfig.social.email"
        class="p-2.5 rounded-lg bg-background-secondary border border-border text-foreground-secondary hover:text-foreground hover:border-accent transition-colors"
        title="Email"
      >
        <Icon name="tabler:mail" class="w-5 h-5" />
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { siteConfig } from '~~/data/site-config'
const { locale } = useI18n()
const toast = useToast()
const avatarRef = ref<HTMLImageElement>()
const imgLoaded = ref(false)

onMounted(() => {
  if (avatarRef.value?.complete) imgLoaded.value = true
})

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
