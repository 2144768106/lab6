<template>
  <div class="container">
    <!-- 奥运五环 -->
    <div class="olympic-rings">
      <div class="ring ring-blue"></div>
      <div class="ring ring-yellow"></div>
      <div class="ring ring-black"></div>
      <div class="ring ring-green"></div>
      <div class="ring ring-red"></div>
    </div>

    <h1 class="page-title">2024 巴黎奥运会奖牌榜</h1>
    
    <!-- 加载状态 -->
    <div v-if="loading" class="loading-container">
      <div class="loading"></div>
    </div>

    <!-- 数据展示 -->
    <div v-else class="fade-in medal-content">
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th class="rank-column">排名</th>
              <th>国家/地区</th>
              <th class="medal-column">
                <div class="medal-header">
                  <img src="../assets/gold-medal.png" alt="金牌" class="medal-icon" />
                  <span>金牌</span>
                </div>
              </th>
              <th class="medal-column">
                <div class="medal-header">
                  <img src="../assets/silver-medal.png" alt="银牌" class="medal-icon" />
                  <span>银牌</span>
                </div>
              </th>
              <th class="medal-column">
                <div class="medal-header">
                  <img src="../assets/bronze-medal.png" alt="铜牌" class="medal-icon" />
                  <span>铜牌</span>
                </div>
              </th>
              <th class="total-column">总计</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(country, index) in sortedCountries" 
                :key="country.id"
                class="country-row"
                @click="goToDetail(country.id)">
              <td>
                <div class="rank-badge">{{ index + 1 }}</div>
              </td>
              <td class="country-name">
                <div class="country-info">
                  <img 
                    :src="`https://flagcdn.com/48x36/${country.code.toLowerCase()}.png`"
                    :alt="country.name"
                    class="country-flag"
                  />
                  <span class="country-name-text">{{ country.name }}</span>
                </div>
              </td>
              <td class="medal-count gold">{{ country.gold }}</td>
              <td class="medal-count silver">{{ country.silver }}</td>
              <td class="medal-count bronze">{{ country.bronze }}</td>
              <td class="total-count">{{ country.gold + country.silver + country.bronze }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { medalApi } from '../api/medalApi'
import type { Country } from '../types/medal'
import NProgress from 'nprogress'

const router = useRouter()
const countries = ref<Country[]>([])
const loading = ref(true)

const sortedCountries = computed(() => {
  return [...countries.value].sort((a, b) => {
    if (b.gold !== a.gold) return b.gold - a.gold
    if (b.silver !== a.silver) return b.silver - a.silver
    return b.bronze - a.bronze
  })
})

const goToDetail = (id: number) => {
  NProgress.start()
  router.push(`/country/${id}`).finally(() => {
    NProgress.done()
  })
}

onMounted(async () => {
  NProgress.start()
  try {
    const response = await medalApi.getCountries()
    countries.value = response.data
  } catch (error) {
    console.error('获取数据失败:', error)
  } finally {
    loading.value = false
    NProgress.done()
  }
})
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
  background: linear-gradient(135deg, #fff5f5 0%, #fff 100%);
}

.page-title {
  text-align: center;
  font-size: 2.8rem;
  margin: 2rem 0;
  font-weight: bold;
  color: transparent;
  background: linear-gradient(45deg, #FF3366, #FF6B6B);
  -webkit-background-clip: text;
  background-clip: text;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  animation: titlePulse 2s infinite;
}

@keyframes titlePulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
}

.medal-content {
  animation: slideUp 0.6s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.table-container {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(255, 107, 107, 0.1);
  overflow: hidden;
  backdrop-filter: blur(10px);
}

table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}

th {
  background: linear-gradient(to bottom, #f8f9fa, #fff);
  padding: 15px;
  font-weight: 600;
  color: #4a4a4a;
  text-transform: uppercase;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
}

.country-row {
  cursor: pointer;
  transition: all 0.3s ease;
}

.country-row:hover {
  background: linear-gradient(to right, rgba(255, 107, 107, 0.05), transparent);
  transform: translateX(5px);
}

.rank-badge {
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #FF6B6B, #FF8E8E);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(255, 107, 107, 0.2);
}

.country-info {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 10px;
}

.country-flag {
  width: 40px;
  height: 30px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  object-fit: cover;
}

.country-name-text {
  font-size: 1.1rem;
  font-weight: 500;
}

.medal-count {
  text-align: center;
  font-weight: 500;
  font-size: 1.1rem;
}

.medal-count.gold { color: #FFD700; }
.medal-count.silver { color: #C0C0C0; }
.medal-count.bronze { color: #CD7F32; }

.total-count {
  text-align: center;
  font-weight: bold;
  color: #FF6B6B;
  font-size: 1.2rem;
}

.medal-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.medal-icon {
  width: 24px;
  height: 24px;
  transition: transform 0.3s ease;
}

.medal-header:hover .medal-icon {
  transform: rotate(360deg);
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }
  
  .container {
    padding: 10px;
  }
  
  .rank-badge {
    width: 30px;
    height: 30px;
    font-size: 0.9rem;
  }
}
</style> 