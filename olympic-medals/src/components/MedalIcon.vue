<template>
  <div class="inline-flex items-center medal-icon">
    <img
      :src="medalImageSrc"
      :alt="`${typeText}牌`"
      :class="[
        size === 'small' ? 'w-6 h-6' : 'w-8 h-8',
        'object-contain'
      ]"
    />
    <span 
      v-if="showText" 
      :class="[
        'ml-2 font-medium',
        textColorClass
      ]"
    >
      {{ typeText }}牌
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import goldMedal from '../assets/gold-medal.png'
import silverMedal from '../assets/silver-medal.png'
import bronzeMedal from '../assets/bronze-medal.png'

interface Props {
  type: 'gold' | 'silver' | 'bronze'
  size?: 'normal' | 'small'
  showText?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'normal',
  showText: false
})

const medalImageSrc = computed(() => {
  const medalImages = {
    gold: goldMedal,
    silver: silverMedal,
    bronze: bronzeMedal
  }
  return medalImages[props.type]
})

const typeText = computed(() => {
  const typeMap = {
    gold: '金',
    silver: '银',
    bronze: '铜'
  }
  return typeMap[props.type]
})

const textColorClass = computed(() => {
  const colorMap = {
    gold: 'text-yellow-600',
    silver: 'text-gray-500',
    bronze: 'text-orange-700'
  }
  return colorMap[props.type]
})
</script> 