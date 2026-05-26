<template>
  <ClientOnly>
    <p class="text-sm text-foreground-secondary font-mono">
      {{ t('footer.uptime', { days: uptime.days, hours: uptime.hours, minutes: uptime.minutes }) }}
    </p>
    <template #fallback>
      <p class="text-sm text-foreground-secondary font-mono">--</p>
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
const { t } = useI18n()
const uptime = useUptime()
</script>
