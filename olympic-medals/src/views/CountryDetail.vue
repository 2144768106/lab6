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

    <!-- 加载状态 -->
    <div v-if="loading" class="loading-container">
      <div class="loading"></div>
    </div>

    <template v-else>
      <!-- 返回按钮 -->
      <button @click="router.back()" class="btn btn-outline back-btn">
        <span>← 返回榜单</span>
      </button>

      <!-- 国家信息 -->
      <div class="country-header">
        <div class="country-info">
          <country-flag 
            :country="country?.code?.toLowerCase() || ''" 
            class="country-flag"
          />
          <h2 class="country-title">{{ country?.name }}</h2>
        </div>
        <div class="medals-summary">
          <div class="medal-item">
            <img src="../assets/gold-medal.png" alt="金牌" class="medal-icon" />
            <span class="medal-count">{{ country?.gold }}</span>
          </div>
          <div class="medal-item">
            <img src="../assets/silver-medal.png" alt="银牌" class="medal-icon" />
            <span class="medal-count">{{ country?.silver }}</span>
          </div>
          <div class="medal-item">
            <img src="../assets/bronze-medal.png" alt="铜牌" class="medal-icon" />
            <span class="medal-count">{{ country?.bronze }}</span>
          </div>
        </div>
      </div>

      <!-- 奖牌详情表格 -->
      <div class="table-container">
        <h3 class="section-title">获奖详情</h3>
        <table>
          <thead>
            <tr>
              <th>项目</th>
              <th>运动员</th>
              <th>奖牌</th>
              <th>日期</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="detail in medalDetails" :key="detail.id">
              <td>{{ detail.sport }}</td>
              <td>{{ detail.athlete }}</td>
              <td>
                <div class="medal-type">
                  <img :src="getMedalImage(detail.medalType)" :alt="detail.medalType" class="medal-icon-small" />
                  {{ getMedalTypeText(detail.medalType) }}
                </div>
              </td>
              <td>{{ detail.date }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 评论区表格 -->
      <div class="table-container">
        <div class="comments-header">
          <h3 class="section-title">评论区</h3>
          <button class="btn btn-primary" @click="showCommentForm = !showCommentForm">
            {{ showCommentForm ? '取消评论' : '添加评论' }}
          </button>
        </div>

        <!-- 评论表单 -->
        <div v-if="showCommentForm" class="comment-form">
          <input v-model="userName" placeholder="您的名字" class="input" />
          <textarea v-model="commentContent" placeholder="写下您的评论..." class="textarea"></textarea>
          <button 
            @click="submitComment" 
            :disabled="!userName || !commentContent"
            class="btn btn-primary submit-btn"
          >
            发表评论
          </button>
        </div>

        <!-- 评论列表表格 -->
        <table class="comments-table">
          <thead>
            <tr>
              <th>用户</th>
              <th>评论内容</th>
              <th>时间</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="comment in comments" :key="comment.id">
              <td class="user-name">{{ comment.userName }}</td>
              <td class="comment-content">{{ comment.content }}</td>
              <td class="comment-time">{{ comment.createTime }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { medalApi } from '../api/medalApi'
import type { Country, MedalDetail, Comment } from '../types/medal'
import CountryFlag from 'vue-country-flag-next'
import NProgress from 'nprogress'

// 导入奖牌图片
import goldMedalImg from '../assets/gold-medal.png'
import silverMedalImg from '../assets/silver-medal.png'
import bronzeMedalImg from '../assets/bronze-medal.png'

const router = useRouter()
const route = useRoute()
const countryId = parseInt(route.params.id as string)

const loading = ref(true)
const country = ref<Country | null>(null)
const medalDetails = ref<MedalDetail[]>([])
const comments = ref<Comment[]>([])
const userName = ref('')
const commentContent = ref('')
const showCommentForm = ref(false)

const loadData = async () => {
  NProgress.start()
  try {
    const [countryResponse, detailsResponse, commentsResponse] = await Promise.all([
      medalApi.getCountries(),
      medalApi.getMedalDetails(countryId),
      medalApi.getComments(countryId)
    ])
    
    country.value = countryResponse.data.find((c: Country) => c.id === countryId) || null
    medalDetails.value = detailsResponse.data
    comments.value = commentsResponse.data
  } catch (error) {
    console.error('加载数据失败:', error)
  } finally {
    loading.value = false
    NProgress.done()
  }
}

const submitComment = async () => {
  if (!userName.value || !commentContent.value) return

  NProgress.start()
  try {
    const response = await medalApi.addComment({
      countryId,
      userName: userName.value,
      content: commentContent.value
    })
    
    if (response.data) {
      comments.value.unshift(response.data)
      commentContent.value = ''
      showCommentForm.value = false
    }
  } catch (error) {
    console.error('提交评论失败:', error)
  } finally {
    NProgress.done()
  }
}

onMounted(loadData)

const getMedalImage = (type: string) => {
  const medalImages = {
    gold: goldMedalImg,
    silver: silverMedalImg,
    bronze: bronzeMedalImg
  }
  return medalImages[type as keyof typeof medalImages]
}

const getMedalTypeText = (type: string) => {
  const types = {
    gold: '金牌',
    silver: '银牌',
    bronze: '铜牌'
  }
  return types[type as keyof typeof types]
}
</script>

<style scoped>
.country-header {
  text-align: center;
  margin: 2rem 0;
  padding: 2rem;
  background: linear-gradient(to bottom, white, #fff5f5);
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.1);
}

.country-title {
  font-size: 1.8rem;
  font-weight: bold;
  color: #2c3e50;
  line-height: 1.5;
  margin-bottom: 1.5rem;
}

.medals-summary {
  display: flex;
  justify-content: center;
  gap: 3rem;
}

.medal-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.medal-count {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--text-color);
}

.section-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--text-color);
}

.comments-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.comment-form {
  margin: 1rem 0;
  padding: 1rem;
  background: #fff8f8;
  border-radius: 8px;
  display: grid;
  gap: 1rem;
}

.medal-type {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.medal-icon {
  width: 24px;
  height: 24px;
}

.medal-icon-small {
  width: 20px;
  height: 20px;
  object-fit: contain;
}

.back-btn {
  margin-bottom: 2rem;
}

.user-name {
  font-weight: 500;
}

.comment-time {
  color: #666;
  font-size: 0.9rem;
}

.submit-btn {
  justify-self: end;
  min-width: 120px;
}

@media (max-width: 768px) {
  .medals-summary {
    gap: 1.5rem;
  }
  
  .country-title {
    font-size: 2rem;
  }
}

.flag-container {
  width: 64px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.country-flag {
  width: 48px !important;
  height: 36px !important;
  display: block !important;
  object-fit: contain !important;
}

.country-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.btn-primary {
  background-color: var(--primary-color);
  color: white;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background-color: #ff8c8c;
  transform: translateY(-2px);
}

.input:focus, .textarea:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.2);
}
</style> 