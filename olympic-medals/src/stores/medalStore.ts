import { defineStore } from 'pinia'
import { ref } from 'vue'

interface Country {
  id: number
  name: string
  code: string
  gold: number
  silver: number
  bronze: number
}

interface MedalDetail {
  id: number
  countryId: number
  sport: string
  athlete: string
  medalType: 'gold' | 'silver' | 'bronze'
  date: string
}

interface Comment {
  id: number
  countryId: number
  content: string
  userName: string
  createTime: string
}

export const useMedalStore = defineStore('medal', () => {
  const countries = ref<Country[]>([
    {
      id: 1,
      name: '中国',
      code: 'cn',
      gold: 38,
      silver: 32,
      bronze: 18
    },
    {
      id: 2,
      name: '美国',
      code: 'us',
      gold: 39,
      silver: 41,
      bronze: 33
    },
    {
      id: 3,
      name: '日本',
      code: 'jp',
      gold: 27,
      silver: 14,
      bronze: 17
    },
    {
      id: 4,
      name: '英国',
      code: 'gb',
      gold: 22,
      silver: 21,
      bronze: 22
    },
    {
      id: 5,
      name: '俄罗斯奥委会',
      code: 'ru',
      gold: 20,
      silver: 28,
      bronze: 23
    }
  ])

  const medalDetails = ref<MedalDetail[]>([
    {
      id: 1,
      countryId: 1,
      sport: '游泳',
      athlete: '张雨霏',
      medalType: 'gold',
      date: '2024-03-15'
    },
    {
      id: 2,
      countryId: 1,
      sport: '乒乓球',
      athlete: '马龙',
      medalType: 'gold',
      date: '2024-03-16'
    },
    {
      id: 3,
      countryId: 2,
      sport: '游泳',
      athlete: 'Katie Ledecky',
      medalType: 'gold',
      date: '2024-03-15'
    },
    {
      id: 4,
      countryId: 2,
      sport: '田径',
      athlete: 'Sydney McLaughlin',
      medalType: 'gold',
      date: '2024-03-16'
    },
    {
      id: 5,
      countryId: 2,
      sport: '篮球',
      athlete: '美国女篮',
      medalType: 'gold',
      date: '2024-03-17'
    },
    {
      id: 6,
      countryId: 2,
      sport: '体操',
      athlete: 'Simone Biles',
      medalType: 'silver',
      date: '2024-03-18'
    },
    {
      id: 7,
      countryId: 2,
      sport: '排球',
      athlete: '美国女排',
      medalType: 'bronze',
      date: '2024-03-19'
    },
    {
      id: 8,
      countryId: 3,
      sport: '柔道',
      athlete: '大野将平',
      medalType: 'gold',
      date: '2024-03-14'
    },
    {
      id: 9,
      countryId: 3,
      sport: '体操',
      athlete: '内村航平',
      medalType: 'silver',
      date: '2024-03-15'
    },
    {
      id: 10,
      countryId: 3,
      sport: '乒乓球',
      athlete: '伊藤美诚',
      medalType: 'bronze',
      date: '2024-03-16'
    },
    {
      id: 11,
      countryId: 1,
      sport: '举重',
      athlete: '吕小军',
      medalType: 'gold',
      date: '2024-03-17'
    },
    {
      id: 12,
      countryId: 1,
      sport: '跳水',
      athlete: '全红婵',
      medalType: 'gold',
      date: '2024-03-18'
    },
    {
      id: 13,
      countryId: 1,
      sport: '羽毛球',
      athlete: '陈雨菲',
      medalType: 'silver',
      date: '2024-03-19'
    },
    {
      id: 14,
      countryId: 1,
      sport: '射击',
      athlete: '杨倩',
      medalType: 'bronze',
      date: '2024-03-20'
    }
  ])

  const comments = ref<Comment[]>([
    {
      id: 1,
      countryId: 1,
      content: '中国队加油！',
      userName: '体育迷',
      createTime: '2024-03-15 14:30:00'
    },
    {
      id: 2,
      countryId: 1,
      content: '期待更多金牌！',
      userName: '奥运粉丝',
      createTime: '2024-03-15 15:20:00'
    }
  ])

  function getCountries(): Country[] {
    return countries.value
  }

  function getMedalDetails(countryId: number): MedalDetail[] {
    return medalDetails.value.filter(detail => detail.countryId === countryId)
  }

  function getComments(countryId: number): Comment[] {
    return comments.value.filter(comment => comment.countryId === countryId)
  }

  function addComment(comment: Omit<Comment, 'id' | 'createTime'>): Comment {
    const newComment: Comment = {
      ...comment,
      id: comments.value.length + 1,
      createTime: new Date().toLocaleString()
    }
    comments.value.push(newComment)
    return newComment
  }

  return {
    countries,
    medalDetails,
    comments,
    getCountries,
    getMedalDetails,
    getComments,
    addComment
  }
}) 