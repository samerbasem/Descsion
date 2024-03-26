<template>
    <div>
      <div v-if="loading">Loading...</div>
      <div v-else-if="error">Error: {{ error }}</div>
      <div v-else>
        <h1>{{ report.title }}</h1>
        <p>{{ report.content }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        loading: true,
        error: null,
        report: null
      };
    },
    mounted() {
      // Fetch report data from the Swagger API endpoint
      this.fetchReport();
    },
    methods: {
      fetchReport() {
        // Make a GET request to the Swagger API endpoint
        axios.get('https://localhost:7001/Reports/GetReport')
          .then(response => {
            // Assuming successful response with report data
            this.report = response.data;
            this.loading = false;
          })
          .catch(error => {
            // Handle error
            this.error = error.message || 'An error occurred while fetching the report.';
            this.loading = false;
          });
      }
    }
  };
  </script>
  