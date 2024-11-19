import type { Country, MedalDetail, Comment } from '../types/medal'

export const medalApi = {
  getCountries: async (): Promise<{ data: Country[] }> => {
    const response = await fetch('https://my-json-server.typicode.com/2144768106/labdb/countries')
    const data = await response.json()
    return { data }
  },
  
  getMedalDetails: async (countryId: number): Promise<{ data: MedalDetail[] }> => {
    const response = await fetch(`https://my-json-server.typicode.com/2144768106/labdb/medalDetails?countryId=${countryId}`)
    const data = await response.json()
    return { data }
  },
  
  getComments: async (countryId: number): Promise<{ data: Comment[] }> => {
    const response = await fetch(`https://my-json-server.typicode.com/2144768106/labdb/comments?countryId=${countryId}`)
    const data = await response.json()
    return { data }
  },
  
  addComment: async (comment: Omit<Comment, 'id' | 'createTime'>): Promise<{ data: Comment }> => {
    const response = await fetch('https://my-json-server.typicode.com/2144768106/labdb/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...comment,
        createTime: new Date().toLocaleString()
      }),
    })
    const data = await response.json()
    return { data }
  }
} 