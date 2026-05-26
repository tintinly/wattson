// 搜索状态管理 — 模块级 ref，跨组件共享
const isSearchOpen = ref(false)

export function useSearch() {
  const openSearch = () => {
    isSearchOpen.value = true
  }

  const closeSearch = () => {
    isSearchOpen.value = false
  }

  const toggleSearch = () => {
    isSearchOpen.value = !isSearchOpen.value
  }

  return {
    isSearchOpen,
    openSearch,
    closeSearch,
    toggleSearch,
  }
}
