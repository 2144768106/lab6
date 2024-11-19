<template>
  <div class="api-test">
    <h2>API 测试</h2>
    
    <div class="test-section">
      <h3>国家列表</h3>
      <button @click="testGetCountries">测试获取国家列表</button>
      <pre>{{ countriesResult }}</pre>
    </div>

    <div class="test-section">
      <h3>奖牌详情</h3>
      <button @click="testGetMedalDetails">测试获取奖牌详情 (国家ID: 1)</button>
      <pre>{{ medalDetailsResult }}</pre>
    </div>

    <div class="test-section">
      <h3>评论列表</h3>
      <button @click="testGetComments">测试获取评论 (国家ID: 1)</button>
      <pre>{{ commentsResult }}</pre>
    </div>

    <div class="test-section">
      <h3>添加评论</h3>
      <button @click="testAddComment">测试添加评论</button>
      <pre>{{ addCommentResult }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { medalApi } from '../api/medalApi'

const countriesResult = ref('')
const medalDetailsResult = ref('')
const commentsResult = ref('')
const addCommentResult = ref('')

const testGetCountries = async () => {
  try {
    const result = await medalApi.getCountries()
    countriesResult.value = JSON.stringify(result, null, 2)
  } catch (error) {
    countriesResult.value = `Error: ${error}`
  }
}

const testGetMedalDetails = async () => {
  try {
    const result = await medalApi.getMedalDetails(1)
    medalDetailsResult.value = JSON.stringify(result, null, 2)
  } catch (error) {
    medalDetailsResult.value = `Error: ${error}`
  }
}

const testGetComments = async () => {
  try {
    const result = await medalApi.getComments(1)
    commentsResult.value = JSON.stringify(result, null, 2)
  } catch (error) {
    commentsResult.value = `Error: ${error}`
  }
}

const testAddComment = async () => {
  try {
    const result = await medalApi.addComment({
      countryId: 1,
      userName: "测试用户",
      content: "测试评论"
    })
    addCommentResult.value = JSON.stringify(result, null, 2)
  } catch (error) {
    addCommentResult.value = `Error: ${error}`
  }
}
</script>

<style scoped>
.api-test {
  padding: 20px;
}

.test-section {
  margin-bottom: 20px;
}

button {
  margin: 10px 0;
  padding: 5px 10px;
}

pre {
  background: #f5f5f5;
  padding: 10px;
  border-radius: 4px;
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style> 