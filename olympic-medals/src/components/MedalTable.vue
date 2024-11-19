<template>
  <div class="overflow-x-auto">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">排名</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">国家/地区</th>
          <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
            <div class="flex items-center justify-center">
              <MedalIcon type="gold" size="small" />
              <span class="ml-1">金牌</span>
            </div>
          </th>
          <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
            <div class="flex items-center justify-center">
              <MedalIcon type="silver" size="small" />
              <span class="ml-1">银牌</span>
            </div>
          </th>
          <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
            <div class="flex items-center justify-center">
              <MedalIcon type="bronze" size="small" />
              <span class="ml-1">铜牌</span>
            </div>
          </th>
          <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">总计</th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="(country, index) in countries" 
            :key="country.id"
            class="hover:bg-gray-50 cursor-pointer"
            @click="goToDetail(country.id)">
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ index + 1 }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ country.name }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-center">{{ country.gold }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-center">{{ country.silver }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-center">{{ country.bronze }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-center font-medium">
            {{ country.gold + country.silver + country.bronze }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import MedalIcon from './MedalIcon.vue'
import type { Country } from '../types/medal'

interface Props {
  countries: Country[]
}

defineProps<Props>()
const router = useRouter()

const goToDetail = (id: number) => {
  router.push(`/country/${id}`)
}
</script> 