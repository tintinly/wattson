<template>
  <footer class="bg-background mt-auto">    
    <div class="max-w-wide mx-auto mt-8 px-4 sm:px-6 lg:px-8 py-4">
      <!-- 分割线-->
      <div class="transition border-t border-border-secondary my-4 border-dashed "></div>

      <div class="flex flex-col md:flex-row items-center justify-between gap-2 text-sm text-foreground-secondary">

        <!-- Left: Copyright + 备案 -->
        <p class="inline-flex flex-wrap items-center gap-x-2 gap-y-1 justify-center sm:justify-start">
          <span>Copyright &copy; {{ copyrightYears }} <a href="https://home.wattson.dev" target="_blank" rel="noopener noreferrer" class="border-b border-dashed border-border-secondary hover:text-foreground transition-colors">{{ authorName }}</a></span>
          <template v-for="filing in icpFilings" :key="filing.type">
            <span>·</span>
            <a :href="filing.url" target="_blank" rel="noopener noreferrer" class="hover:text-foreground transition-colors">
              {{ filing.icp }}
            </a>
          </template>
        </p>

        <!-- Right: Powered by -->
        <p class="inline-flex">
          Powered by
          <a href="https://nuxt.com" target="_blank" rel="noopener noreferrer" title="Nuxt" class="rounded p-0.5 hover:bg-background hover:text-[#00DC82] transition-colors">
            <Icon name="tabler:brand-nuxt" class="w-4 h-4"/>
          </a>
          <a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer" title="Tailwind CSS" class="rounded p-0.5 hover:bg-background hover:text-[#06B6D4] transition-colors">
            <Icon name="tabler:brand-tailwind" class="w-4 h-4"/>
          </a>
          <a href="https://vuejs.org" target="_blank" rel="noopener noreferrer" title="Vue" class="rounded p-0.5 hover:bg-background hover:text-[#4FC08D] transition-colors">
            <Icon name="tabler:brand-vue" class="w-4 h-4"/>
          </a>
          <a href="https://www.typescriptlang.org" target="_blank" rel="noopener noreferrer" title="TypeScript" class="rounded p-0.5 hover:bg-background hover:text-[#3178C6] transition-colors">
            <Icon name="tabler:brand-typescript" class="w-4 h-4"/>
          </a>
          |
          <a :href="siteConfig.social.rss" target="_blank" rel="noopener noreferrer" title="RSS" class="rounded p-0.5 hover:bg-background hover:text-[#FF6600] transition-colors">
            <Icon name="tabler:rss" class="w-4 h-4"/>
          </a>
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { siteConfig } from '~~/data/site-config'

const { locale } = useI18n()
const authorName = computed(() =>
  locale.value.indexOf('zh') !== -1 ? siteConfig.author.name : siteConfig.author.nameEn
)
const currentYear = new Date().getFullYear()
const copyrightYears = computed(() =>
  Number(siteConfig.site.since) === currentYear ? `${currentYear}` : `${siteConfig.site.since} - ${currentYear}`
)
const icpFilings = computed(() => {
  return siteConfig.filings.filter((filing) => {
    return filing.icp !== ''
  })
})
</script>
