<template>
  <footer class="border-t border-border bg-background-secondary/50 mt-auto">
    <div class="max-w-wide mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- 运行时长 -->
        <div class="flex flex-col gap-2">
          <h3 class="text-sm font-semibold text-foreground">Status</h3>
          <UptimeCounter />
        </div>

        <!-- 技术栈 -->
        <div class="flex flex-col gap-2">
          <h3 class="text-sm font-semibold text-foreground">{{ t('footer.techStack') }}</h3>
          <div class="flex flex-wrap gap-1.5">
            <a
              v-for="tech in siteConfig.techStack"
              :key="tech.name"
              :href="tech.url"
              target="_blank"
              rel="noopener noreferrer"
              class="text-xs px-2 py-0.5 rounded-full bg-background border border-border text-foreground-secondary hover:text-accent hover:border-accent transition-colors"
            >
              {{ tech.name }}
            </a>
          </div>
        </div>

        <!-- 统计 & 备案 -->
        <div class="flex flex-col gap-2 text-sm text-foreground-secondary">
          <p>&copy; {{ siteConfig.site.since }} - {{ currentYear }} {{ t('footer.copyright') }}</p>
          <p>{{ t('footer.poweredBy', { framework: 'Nuxt 4' }) }}</p>
          <a
            v-if="siteConfig.beian.icp"
            :href="siteConfig.beian.url"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:text-foreground transition-colors"
          >
            {{ siteConfig.beian.icp }}
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { siteConfig } from '~~/data/site-config'

const { t } = useI18n()
const currentYear = new Date().getFullYear()
</script>
