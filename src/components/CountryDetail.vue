<template>
    <div>
      <h1>{{ country.name }} </h1>
      <p>{{ country.details }}</p>
    </div>
  </template>
  
  <script>
  import MedalTable from '../components/MedalTable.vue';
  
  export default {
    components: {
      MedalTable
    },
    props: {
      country: {
        type: Object,
        required: true
      },
      paginatedAthletes: {
        type: Array,
        required: true
      },
      page: {
        type: Number,
        required: true
      },
      totalPages: {
        type: Number,
        required: true
      },
      goToPage: {
        type: Function,
        required: true
      }
    }
  };
  </script>
  
  <style scoped>
  /* 样式可以根据需要调整 */
  .athlete-card {
    background-color: #fdfdfd;
    padding: 10px;
    margin: 10px 0;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgb(155, 22, 22);
  }
  
  .pagination {
    margin-top: 20px;
    text-align: center;
  }
  
  button {
    padding: 10px 15px;
    margin: 5px;
    border-radius: 5px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  </style>
  