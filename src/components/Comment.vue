<template>
  <div class="comment-section">
    <h3>Comments</h3>
<h4>You can cheer for the athletes!</h4>
    <!-- Display existing comments -->
    <div v-if="comments.length > 0">
      <ul>
        <li v-for="(comment, index) in comments" :key="index">
          {{ comment }}
        </li>
      </ul>
    </div>
    <div v-else>
      <p>There are no comments yet.</p>
    </div>

    <!-- Add a new comment -->
    <textarea v-model="newComment" placeholder="Add a comment..." rows="4"></textarea>
    <button @click="submitComment">Submit Comment</button>
  </div>
</template>

<script>
import { ref, watch } from 'vue';

export default {
  props: {
    countryId: {
      type: [String, Number],
      required: true
    },
    comments: {
      type: Array,
      required: true
    },
    submitComment: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    const newComment = ref('');

    // 提交评论
    const submitComment = () => {
      if (newComment.value.trim()) {
        props.submitComment(newComment.value.trim());
        newComment.value = ''; // 清空评论输入框
      }
    };

    return { newComment, submitComment };
  }
};
</script>

<style scoped>
@import '../assets/comment.css';
</style>

  