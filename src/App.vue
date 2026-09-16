<script setup>
import { storeToRefs } from 'pinia'
import { CdxTextInput } from '@wikimedia/codex'
import EmploiTerritorialSource from '@/components/sources/EmploiTerritorialSource.vue'
import { useDashboardStore } from '@/stores/dashboard'
import { emploiTerritorialSource } from '@/sources/emploiTerritorialSource'

const dashboardStore = useDashboardStore()
const { filterWord } = storeToRefs(dashboardStore)
</script>

<template>
  <div class="min-h-screen">
    <header class="border-b border-slate-200 bg-white px-6 py-4">
      <div class="mx-auto flex w-full max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 class="text-2xl font-bold text-slate-900">JobSearch Aggregator</h1>
        <div class="w-full sm:w-96">
          <CdxTextInput
            v-model="filterWord"
            input-type="search"
            placeholder="Filter sub-cards by word"
            aria-label="Filter sub-cards by word"
          />
        </div>
      </div>
    </header>

    <main class="mx-auto w-full max-w-6xl px-6 py-6">
      <EmploiTerritorialSource :source="emploiTerritorialSource" :filter-word="filterWord" />
    </main>

    <footer class="border-t border-slate-200 bg-white px-6 py-4 text-center text-sm text-slate-600">
      Aggregator dashboard powered by Vue 3, Pinia, Tailwind CSS and Wikimedia Codex.
    </footer>
  </div>
</template>
