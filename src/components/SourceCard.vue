<script setup>
import SubCardItem from '@/components/SubCardItem.vue'

defineProps({
  sourceId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  categories: {
    type: Array,
    required: true,
  },
  localisations: {
    type: Array,
    default: () => [],
  },
  searchWords: {
    type: Array,
    default: () => [],
  },
  items: {
    type: Array,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <section class="rounded-xl border border-slate-200 bg-slate-50 p-5">
    <header class="mb-4">
      <h2 class="text-xl font-bold text-slate-900">{{ title }}</h2>
      <p class="text-sm text-slate-600">Categories: {{ categories.join(', ') }}</p>
      <p v-if="localisations.length" class="text-sm text-slate-600">
        Localisations: {{ localisations.join(', ') }}
      </p>
      <p v-if="searchWords.length" class="text-sm text-slate-600">Search words: {{ searchWords.join(', ') }}</p>
    </header>

    <p v-if="loading" class="text-sm text-slate-600">Loading source…</p>
    <p v-else-if="error" class="text-sm text-red-700">{{ error }}</p>
    <p v-else-if="!items.length" class="text-sm text-slate-600">No relevant items for this source.</p>

    <div v-else class="grid gap-3">
      <SubCardItem
        v-for="item in items"
        :key="item.id"
        :source-id="sourceId"
        :item="item"
      />
    </div>
  </section>
</template>
