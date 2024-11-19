import { useMedalStore } from '../stores/medalStore'
import type { Country, MedalDetail, Comment } from '../types/medal'

export const medalApi = {
  getCountries: async () => {
    const store = useMedalStore()
    const data = store.getCountries()
    return { data }
  },
  
  getMedalDetails: async (countryId: number) => {
    const store = useMedalStore()
    const data = store.getMedalDetails(countryId)
    return { data }
  },
  
  getComments: async (countryId: number) => {
    const store = useMedalStore()
    const data = store.getComments(countryId)
    return { data }
  },
  
  addComment: async (comment: Omit<Comment, 'id' | 'createTime'>) => {
    const store = useMedalStore()
    const data = store.addComment(comment)
    return { data }
  }
} 