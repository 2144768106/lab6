import { defineStore } from 'pinia';

export const useCommentsStore = defineStore('comments', {
  state: () => ({
    comments: {}  // 使用对象，键为国家的 ID，值为该国家的评论数组
  }),
  actions: {
    addComment(countryId, comment) {
      if (!this.comments[countryId]) {
        this.comments[countryId] = [];
      }
      this.comments[countryId].push(comment);
    }
  }
});
