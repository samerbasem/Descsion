<template>
    <div>
      <br />
      <v-img class="img" src="@/assets/img106.jpg" cover></v-img>
      <v-toolbar-title>واجهة عرض الجهات المرسل اليها االقرارت</v-toolbar-title>
      <v-container>
        <br />
        <br />
  
        <v-card class="pa-3" elevation="24">
          <v-card-title>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="البحث "
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
  
          <v-data-table
            :headers="headers"
            :items="data"
            elevation="24"
            :loading="false"
            :items-per-page="10"
            :search="search"
            class="elevation-1"
            max-width="1000px"
          ></v-data-table>
        
        </v-card>
      </v-container>
    </div>
  </template>
  <script>
  import axios from "axios";
  
  export default {
    name: "follow_orgView",
  
    data() {
      return {
        formdata: {
            Proc_Orgs: [],
          id: null,
          book_No:"",
          org: [],
          Decision_Processes: [],
  
         
        },
        search: "",
        filter: "",
        loading: true,
        headers: [
          {
            text: "رقم الكتاب",
            align: "center",
            sortable: false,
            value: "book_No"
          },
  
          {
            text: "الجهة",
            align: "center",
            sortable: false,
            value: "orgName"
          },
  
          {
            text: "تاريخ الارسال",
            align: "center",
            sortable: false,
            value: "send_Date"
          }
        ],
        data: []
      };
    },
  
    mounted() {
      this.fetchData();
      this.searchRole();
    },
    methods: {
   
   
   
   
   
   
   
   
   
   
   
   



   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
  
      searchRole() {
  
  
        const headers = {
       Authorization: "Bearer " + this.token,
     };
        this.axios
          .get("https://localhost:7001/Decision_Processes/" + this.book_No,{headers})
          .then(resuit => {
            this.data = resuit.data;
            console.log(resuit);
          });
      },
  
      fetchData() {
        axios.get("https://localhost:7001/ProcOrgs").then(resuit => {
          this.data = resuit.data;
          this.loading = false;
        });
      }
    }
  };
  </script>
  
  <style scoped>
  .img {
    height: 200px;
    width: 3500px;
    background-size: cover;
  }
  .v-btn {
    color: aliceblue;
  }
  </style>
  