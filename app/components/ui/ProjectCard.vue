<template>
  <div
    class="group flex flex-col p-6 rounded-xl border border-border bg-surface hover:border-border-secondary hover:bg-background-secondary/70 hover:shadow-sm active:bg-background-secondary active:border-border-secondary active:shadow-sm transition-all duration-300 cursor-pointer"
    @click="openProjectUrl">
    <!-- 截图 -->
    <div v-if="project.image" class="aspect-video -mx-6 -mt-6 mb-4 overflow-hidden rounded-t-xl">
      <NuxtImg :src="project.image" :alt="displayName" class="w-full h-full object-cover bg-foreground-secondary" />
    </div>

    <!-- 项目名称 -->
    <div class="text-lg font-semibold select-none">
      {{ displayName }}
      <Icon name="tabler:chevron-right"
        class="inline w-6 h-6 shrink-0 opacity-100 md:opacity-0 -translate-x-1 -translate-y-0.5 md:group-hover:opacity-100 md:group-hover:translate-x-1 transition-all duration-300" />
    </div>

    <!-- 描述 -->
    <p class="text-sm text-foreground-secondary mt-2 line-clamp-2">
      {{ displayDescription }}
    </p>

    <!-- 技术栈 -->
    <div class="flex flex-wrap gap-1.5 mt-auto pt-4 mb-4 overflow-hidden">
      <span v-for="tech in project.techStack" :key="tech"
        class="text-xs px-2 py-0.5 rounded-full text-foreground-secondary border-border bg-background-secondary select-none">
        {{ tech }}
      </span>
    </div>

    <!-- 链接 -->
    <div class="flex items-center gap-3" @click.stop>
      <a v-if="project.github"
        class="text-sm text-foreground-secondary hover:text-foreground transition-colors"
        :href="project.github" target="_blank" rel="noopener noreferrer">
        <icon name="grommet-icons:github" class="w-6 h-6"></icon>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Project } from '~~/app/types'

const props = defineProps<{ project: Project }>()
const { locale, t } = useI18n()

const displayName = computed(() => locale.value === 'en-US' ? props.project.nameEn : props.project.name)
const displayDescription = computed(() => locale.value === 'en-US' ? props.project.descriptionEn : props.project.description)

function openProjectUrl() {
  const url = props.project.url || props.project.github
  if (url) {
    window.open(url, '_blank', 'noopener,noreferrer')
  }
}
</script>
