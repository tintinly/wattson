<template>
  <div class="py-12">
    <h1 class="text-3xl font-bold mb-2">{{ t('projects.title') }}</h1>
    <p class="text-foreground-secondary mb-8">{{ t('projects.description') }}</p>

    <div v-if="projects.length" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ProjectCard v-for="p in projects" :key="p.name" :project="p" />
    </div>
    <p v-else class="text-center text-foreground-secondary py-20">{{ t('projects.empty') }}</p>
  </div>
</template>

<script setup lang="ts">
import { projects } from '~~/data/projects'

const { t, locale } = useI18n()

useHead({
  title: `${t('projects.title')} - Wattson's Blog`,
})
</script>
