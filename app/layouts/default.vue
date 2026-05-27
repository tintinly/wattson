<template>
  <div class="min-h-screen flex flex-col bg-background text-foreground">
    <AppHeader />
    <main class="flex-1 w-full max-w-wide mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <slot />
    </main>
    <AppFooter />
    <ClientOnly>
      <SearchDialog />
      <ToastNotification />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
// View Transition 和布局由 Nuxt 内置支持
// Header/Footer 固定，<NuxtPage /> 内容自动应用 view transition
</script>
