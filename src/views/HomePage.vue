<template>
    <div>
      <h1>Olympic Medal Table</h1>
      <div v-for="country in paginatedCountries" :key="country.id" class="country-card">
        <router-link :to="'/country/' + country.id">
          <h2>{{ country.name }}</h2>
          <p>Gold: {{ country.gold }} | Silver: {{ country.silver }} | Bronze: {{ country.bronze }}</p>
        </router-link>
      </div>
  
      <div class="pagination">
        <button @click="goToPage(page - 1)" :disabled="page === 1">—</button>
        <span>{{ page }}</span>
        <button @click="goToPage(page + 1)" :disabled="page >= totalPages">+</button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, computed } from 'vue';
  import { useOlympicStore } from '../stores/olympicStore';
  
  export default {
    setup() {
      const store = useOlympicStore();
      const page = ref(1);
      const countriesPerPage = 5;
  
      const paginatedCountries = computed(() => {
        const start = (page.value - 1) * countriesPerPage;
        const end = start + countriesPerPage;
        return store.countries.slice(start, end);
      });
  
      const totalPages = computed(() => Math.ceil(store.countries.length / countriesPerPage));
  
      const goToPage = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages.value) {
          page.value = newPage;
        }
      };
  
      return { page, paginatedCountries, totalPages, goToPage };
    }
  };
  </script>
  
  <style scoped>
  @import '../assets/HomePage.css';
  </style>
  
  