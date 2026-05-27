<template>
  <div class="py-16 flex flex-col items-center justify-center text-center max-w-content mx-auto">
    <div class="w-24 h-24 rounded-full bg-background-secondary border-2 border-border flex items-center justify-center mb-6">
      <span class="text-4xl">👋</span>
    </div>
    <h1 class="text-3xl sm:text-4xl font-bold mb-4">
      {{ t('home.greeting', { name: 'Wattson' }) }}
    </h1>
    <p class="text-lg text-foreground-secondary max-w-md">
      {{ siteConfig.author.bio }}
    </p>
    <div class="flex gap-3 mt-6">
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
const { t } = useI18n()
</script>
