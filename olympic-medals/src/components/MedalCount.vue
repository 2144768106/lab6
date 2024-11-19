<template>
  <div class="flex flex-col items-center transition-custom">
    <MedalIcon :type="type" size="small" />
    <span class="mt-1 text-sm font-medium" :class="textColorClass">{{ count }}</span>
  </div>
</template>

<script setup lang="ts">
import MedalIcon from './MedalIcon.vue'
import { computed } from 'vue'

interface Props {
  type: 'gold' | 'silver' | 'bronze'
  count: number
}

const props = defineProps<Props>()

const textColorClass = computed(() => {
  const colorMap = {
    gold: 'text-yellow-600',
    silver: 'text-gray-500',
    bronze: 'text-orange-700'
  }
  return colorMap[props.type]
})
</script> 