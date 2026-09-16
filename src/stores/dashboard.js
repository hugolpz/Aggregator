import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDashboardStore = defineStore('dashboard', () => {
  const filterWord = ref('')
  const favorites = ref({})

  function setFilterWord(word) {
    filterWord.value = word
  }

  function toggleFavorite(id) {
    favorites.value[id] = !favorites.value[id]
  }

  function isFavorite(id) {
    return Boolean(favorites.value[id])
  }

  return {
    filterWord,
    favorites,
    setFilterWord,
    toggleFavorite,
    isFavorite,
  }
})
