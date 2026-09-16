<script setup>
import { computed, onMounted, ref } from 'vue'
import SourceCard from '@/components/SourceCard.vue'
import { fetchHtmlItems, fetchRssItems } from '@/services/fetchRssItems'
import { filterItemsByWord } from '@/utils/filter'

const props = defineProps({
  source: {
    type: Object,
    required: true,
  },
  filterWord: {
    type: String,
    default: '',
  },
})

const loading = ref(false)
const error = ref('')
const sourceItems = ref([])

const filteredItems = computed(() => filterItemsByWord(sourceItems.value, props.filterWord))

async function loadSourceItems() {
  loading.value = true
  error.value = ''

  try {
    const allItems = await Promise.all(
      props.source.websiteSearchPages.map(async (page) => {
        if (page.type === 'rss') {
          return fetchRssItems(page.url)
        }

        return fetchHtmlItems(page)
      }),
    )

    sourceItems.value = allItems.flat().map((item) => ({
      ...item,
      localisation: item.localisation ?? props.source.localisations?.[0],
    }))
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Unable to load this source right now.'
    sourceItems.value = []
  } finally {
    loading.value = false
  }
}

onMounted(loadSourceItems)
</script>

<template>
  <SourceCard
    :source-id="source.id"
    :title="source.title"
    :categories="source.category"
    :localisations="source.localisations"
    :search-words="source.searchWords"
    :items="filteredItems"
    :loading="loading"
    :error="error"
  />
</template>
