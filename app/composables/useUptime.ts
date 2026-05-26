export function useUptime() {
  const uptime = ref({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  let timer: ReturnType<typeof setInterval> | null = null

  const tick = () => {
    const start = new Date('2026-05-22T00:00:00').getTime()
    const now = Date.now()
    const diff = Math.max(0, now - start)

    uptime.value = {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    }
  }

  onMounted(() => {
    tick()
    timer = setInterval(tick, 1000)
  })

  onUnmounted(() => {
    if (timer) clearInterval(timer)
  })

  return uptime
}
