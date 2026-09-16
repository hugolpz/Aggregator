<script setup>
import { computed } from 'vue'
import { CdxButton } from '@wikimedia/codex'
import { useDashboardStore } from '@/stores/dashboard'

const props = defineProps({
  sourceId: {
    type: String,
    required: true,
  },
  item: {
    type: Object,
    required: true,
  },
})

const store = useDashboardStore()
const favoriteId = computed(() => `${props.sourceId}:${props.item.id}`)
const isFavorite = computed(() => store.isFavorite(favoriteId.value))

function toggleFavorite() {
  store.toggleFavorite(favoriteId.value)
}

async function shareItem() {
  const shareText = `${props.item.title} - ${props.item.url}`

  if (navigator.share) {
    await navigator.share({
      title: props.item.title,
      text: shareText,
      url: props.item.url,
    })
    return
  }

  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(props.item.url)
  }
}
</script>

<template>
  <article class="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
    <div class="mb-2 flex items-start justify-between gap-3">
      <a :href="item.url" target="_blank" rel="noopener" class="font-semibold text-blue-700 hover:underline">
        {{ item.title }}
      </a>
      <span class="text-xs text-slate-500">#{{ item.id }}</span>
    </div>

    <p v-if="item.date" class="mb-1 text-sm text-slate-600">{{ item.date }}</p>
    <p v-if="item.localisation" class="mb-1 text-sm text-slate-600">📍 {{ item.localisation }}</p>
    <p v-if="item.description" class="mb-3 text-sm text-slate-700">{{ item.description }}</p>

    <div class="flex gap-2">
      <CdxButton action="progressive" weight="quiet" @click="toggleFavorite">
        {{ isFavorite ? '★' : '☆' }} Favorite
      </CdxButton>
      <CdxButton action="default" weight="quiet" @click="shareItem">Share</CdxButton>
    </div>
  </article>
</template>
