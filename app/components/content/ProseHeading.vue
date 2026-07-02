<template>
  <component :is="`h${level}`" :id="id" class="group flex items-center gap-0.5 scroll-mt-5">
    <slot />
    <a
      v-if="id"
      :href="`#${id}`"
      class="inline-flex items-center no-underline! bg-transparent! group-hover:bg-opacity-100 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
      :aria-label="`链接到此${'#' + level}标题`"
    >
      <div class="group p-1.5 rounded-md text-foreground-secondary hover:bg-background-secondary hover:text-foreground transition-colors">
        <Icon name="tabler:link" :class="[sizeClasses[level]]" />
      </div>
    </a>
  </component>
</template>

<script setup lang="ts">
defineProps<{
  id: string
  level: 1 | 2 | 3 | 4 | 5 | 6
}>()

// ✅ 创建一个映射，将 prop 值映射到完整的类名
const sizeClasses = {
  1: 'size-6',
  2: 'size-5',
  3: 'size-4.5',
  4: 'size-3.5',
  5: 'size-3.5',
  6: 'size-3.5',
}
</script>
