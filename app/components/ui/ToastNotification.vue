<template>
  <Teleport to="body">
    <Transition name="toast">
      <div
        v-if="visible"
        class="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-lg bg-background-secondary text-foreground text-sm shadow-lg"
      >
        {{ message }}
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const { message, visible } = useToast()
</script>

<style scoped>
.toast-enter-active {
  transition: all 0.3s ease-out;
}
.toast-leave-active {
  transition: all 0.25s ease-in;
}
.toast-enter-from {
  opacity: 0;
  transform: translate(-50%, -12px);
}
.toast-leave-to {
  opacity: 0;
  transform: translate(-50%, -12px);
}
</style>
