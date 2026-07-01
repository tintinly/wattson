<template>
  <div class="min-h-screen flex flex-col bg-background text-foreground px-2 sm:px-4 md:px-6 lg:px-8 ">
    <AppHeader />
    <main class="flex-1 w-full max-w-wide mx-auto">
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

<style scoped>
/* 页面过渡动画（Nuxt pageTransition） */
.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease;
}
.page-enter-from {
  opacity: 0;
  transform: translateY(25px);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(25px);
}
</style>
