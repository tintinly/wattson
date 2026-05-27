<template>
  <footer class="border-t border-border bg-background-secondary/50 mt-auto">
    <div class="max-w-wide mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div class="flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-foreground-secondary">

        <!-- Left: Copyright -->
        <p>Copyright &copy; {{ siteConfig.site.since }} - {{ currentYear }} {{ siteConfig.author.name }}</p>

        <!-- Right: Powered by -->
        <p class="inline-flex gap-1.5">
          <template v-for="(filing, i) in icpFilings" :key="filing.type">
            <a :href="filing.url" target="_blank" rel="noopener noreferrer" class="hover:text-foreground transition-colors">
              {{ filing.icp }}
            </a>
            |
          </template>
          Powered by
          <a href="https://nuxt.com" target="_blank" rel="noopener noreferrer" title="Nuxt" class="rounded hover:bg-background hover:text-[#00DC82] transition-colors">
            <Icon name="tabler:brand-nuxt" class="w-4 h-4 inline-block"/>
          </a>
          <a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer" title="Tailwind CSS" class="rounded hover:bg-background hover:text-[#06B6D4] transition-colors">
            <Icon name="tabler:brand-tailwind" class="w-4 h-4 inline-block"/>
          </a>
          <a href="https://vuejs.org" target="_blank" rel="noopener noreferrer" title="Vue" class="rounded hover:bg-background hover:text-[#4FC08D] transition-colors">
            <Icon name="tabler:brand-vue" class="w-4 h-4 inline-block"/>
          </a>
          <a href="https://www.typescriptlang.org" target="_blank" rel="noopener noreferrer" title="TypeScript" class="rounded hover:bg-background hover:text-[#3178C6] transition-colors">
            <Icon name="tabler:brand-typescript" class="w-4 h-4 inline-block"/>
          </a>
          |
          <a :href="siteConfig.social.rss" target="_blank" rel="noopener noreferrer" title="RSS" class="rounded hover:bg-background hover:text-[#FF6600] transition-colors">
            <Icon name="tabler:rss" class="w-4 h-4 inline-block"/>
          </a>
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { siteConfig } from '~~/data/site-config'

const { t } = useI18n()
const currentYear = new Date().getFullYear()
const icpFilings = computed(() => {
  return siteConfig.filings.filter((filing) => {
    return filing.icp !== ''
  })
})
</script>
