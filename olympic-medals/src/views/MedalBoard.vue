<template>
  <div class="medal-board">
    <div class="controls">
      <el-select v-model="sortBy" placeholder="排序方式" @change="handleSort">
        <el-option label="按金牌排序" value="goldCount" />
        <el-option label="按银牌排序" value="silverCount" />
        <el-option label="按铜牌排序" value="bronzeCount" />
      </el-select>
      
      <el-input
        v-model="searchQuery"
        placeholder="搜索国家"
        style="width: 200px; margin-left: 16px;"
      />
    </div>

    <el-table 
      v-loading="store.loading"
      :data="filteredCountries" 
      style="width: 100%"
    >
      <el-table-column prop="flagUrl" label="国旗" width="100">
        <template #default="scope">
          <img :src="scope.row.flagUrl" class="country-flag" />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="国家" />
      <el-table-column prop="goldCount" label="金牌" sortable />
      <el-table-column prop="silverCount" label="银牌" sortable />
      <el-table-column prop="bronzeCount" label="铜牌" sortable />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button @click="showDetails(scope.row)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog 
      v-model="dialogVisible" 
      title="奖牌详情" 
      width="70%"
    >
      <template v-if="selectedCountry">
        <h3>{{ selectedCountry.name }} 奖牌详情</h3>
        
        <el-tabs>
          <el-tab-pane label="奖牌列表">
            <el-table :data="store.currentCountryDetails">
              <el-table-column prop="sport" label="运动项目" />
              <el-table-column prop="athlete" label="运动员" />
              <el-table-column prop="medalType" label="奖牌类型">
                <template #default="scope">
                  <el-tag :type="getMedalTypeColor(scope.row.medalType)">
                    {{ scope.row.medalType }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="date" label="获得日期" />
            </el-table>
          </el-tab-pane>
          
          <el-tab-pane label="评论区">
            <div class="comments-section">
              <div v-for="comment in store.comments" :key="comment.id" class="comment">
                <div class="comment-header">
                  <span class="username">{{ comment.userName }}</span>
                  <span class="time">{{ comment.createTime }}</span>
                </div>
                <div class="comment-content">{{ comment.content }}</div>
              </div>
              
              <div class="comment-form">
                <el-input
                  v-model="newComment"
                  type="textarea"
                  rows="3"
                  placeholder="写下你的评论..."
                />
                <el-button 
                  type="primary"
                  @click="submitComment"
                  :disabled="!newComment.trim()"
                >
                  发表评论
                </el-button>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useMedalStore } from '../stores/medalStore'
import type { Country } from '../types/medal'

const store = useMedalStore()
const dialogVisible = ref(false)
const selectedCountry = ref<Country | null>(null)
const newComment = ref('')
const searchQuery = ref('')
const sortBy = ref<'gold' | 'silver' | 'bronze'>('gold')

// 过滤国家列表
const filteredCountries = computed(() => {
  return store.countries.filter((country: Country) => 
    country.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const showDetails = async (country: Country) => {
  selectedCountry.value = country
  dialogVisible.value = true
  await Promise.all([
    store.fetchCountryDetails(country.id),
    store.fetchComments(country.id)
  ])
}

const handleSort = () => {
  store.sortBy = sortBy.value
  store.sortCountries()
}

const getMedalTypeColor = (type: string) => {
  const colors = {
    gold: 'warning',
    silver: 'info',
    bronze: 'success'
  }
  return colors[type as keyof typeof colors]
}

const submitComment = async () => {
  if (!selectedCountry.value || !newComment.value.trim()) return
  
  await store.addComment({
    countryId: selectedCountry.value.id,
    content: newComment.value,
    userName: '当前用户', // 这里应该使用实际的用户名
  })
  
  newComment.value = ''
}

onMounted(() => {
  store.fetchCountries()
})
</script>

<style scoped lang="scss">
.medal-board {
  padding: 20px;
  
  .controls {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
  }
  
  .country-flag {
    width: 50px;
    height: 30px;
    object-fit: cover;
  }
  
  .comments-section {
    .comment {
      margin-bottom: 16px;
      padding: 12px;
      border-bottom: 1px solid #eee;
      
      .comment-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 8px;
        
        .username {
          font-weight: bold;
        }
        
        .time {
          color: #999;
          font-size: 0.9em;
        }
      }
    }
    
    .comment-form {
      margin-top: 20px;
      
      .el-button {
        margin-top: 12px;
      }
    }
  }
}
</style> 