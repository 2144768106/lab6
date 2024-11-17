<template>
    <div>
      <h3>Medal Count</h3>
      <p>Gold: {{ country.gold }}</p>
      <p>Silver: {{ country.silver }}</p>
      <p>Bronze: {{ country.bronze }}</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      country: {
        type: Object,
        required: true
      }
    }
  };
  </script>
  
  <style scoped>
  /* 样式可以根据需要调整 */
  h3 {
    font-size: 1.2em;
    margin-bottom: 10px;
  }
  
  p {
    margin: 5px 0;
  }
  </style>
  
  
  