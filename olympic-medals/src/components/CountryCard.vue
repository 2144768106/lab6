<template>
  <div @click="goToDetail(country.id)"
       class="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow cursor-pointer">
    <div class="flex items-center justify-between mb-3">
      <div class="flex items-center">
        <span class="w-8 h-8 flex items-center justify-center bg-blue-50 text-blue-600 rounded-full font-semibold">
          {{ rank }}
        </span>
        <span class="ml-3 font-medium text-gray-800">{{ country.name }}</span>
      </div>
    </div>
    <div class="grid grid-cols-3 gap-4 text-center">
      <div class="flex flex-col items-center">
        <MedalIcon type="gold" size="small" />
        <span class="mt-1 text-sm">{{ country.gold }}</span>
      </div>
      <div class="flex flex-col items-center">
        <MedalIcon type="silver" size="small" />
        <span class="mt-1 text-sm">{{ country.silver }}</span>
      </div>
      <div class="flex flex-col items-center">
        <MedalIcon type="bronze" size="small" />
        <span class="mt-1 text-sm">{{ country.bronze }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import MedalIcon from './MedalIcon.vue'
import type { Country } from '../types/medal'

interface Props {
  country: Country
  rank: number
}

defineProps<Props>()
const router = useRouter()

const goToDetail = (id: number) => {
  router.push(`/country/${id}`)
}
</script> 