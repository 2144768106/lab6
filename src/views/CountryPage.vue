<template>
  <div>
    <!-- Country Details -->
    <CountryDetail
      :country="country"
      :paginatedAthletes="paginatedAthletes"
      :page="page"
      :totalPages="totalPages"
      :goToPage="goToPage"
    />
    <h3>Sports</h3>
    <ul>
      <li v-for="sport in country.sports" :key="sport">{{ sport }}</li>
    </ul>
    <MedalTable :country="country" />
  
   

    <Comment
      :countryId="countryId"
      :comments="comments"
      :submitComment="submitComment"
    />
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useOlympicStore } from '../stores/olympicStore';
import { useCommentsStore } from '../stores/commentsStore';
import Comment from '../components/Comment.vue';
import CountryDetail from '../components/CountryDetail.vue';
import MedalTable from '../components/MedalTable.vue';  // Import MedalTable component

export default {
  components: {
    Comment,
    CountryDetail,
    MedalTable,  // Register MedalTable component
  },
  setup() {
    const store = useOlympicStore();
    const commentsStore = useCommentsStore();
    const route = useRoute();
    const page = ref(1);
    const athletesPerPage = 3;

    // Get country id from route params
    const countryId = route.params.id;

    // Get country details
    const country = computed(() => store.countries.find(c => c.id == countryId));

    // Get comments for the country
    const comments = computed(() => commentsStore.comments[countryId] || []);

    // Paginate athletes
    const paginatedAthletes = computed(() => {
      if (!country.value || !country.value.athletes) return [];
      const start = (page.value - 1) * athletesPerPage;
      const end = start + athletesPerPage;
      return country.value.athletes.slice(start, end);
    });

    // Total pages for pagination
    const totalPages = computed(() => {
      if (!country.value || !country.value.athletes) return 0;
      return Math.ceil(country.value.athletes.length / athletesPerPage);
    });

    // Change page
    const goToPage = (newPage) => {
      if (newPage >= 1 && newPage <= totalPages.value) {
        page.value = newPage;
      }
    };

    // Submit a new comment
    const submitComment = (commentText) => {
      commentsStore.addComment(countryId, commentText);
    };

    return {
      country,
      comments,
      paginatedAthletes,
      page,
      totalPages,
      goToPage,
      submitComment,
      countryId,
    };
  },
};
</script>

<style scoped>
@import '../assets/CountryPage.css';
</style>

  