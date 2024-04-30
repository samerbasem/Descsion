<template>
  <div>
    <v-img class="img" src="@/assets/img106.jpg" cover ></v-img>
     <v-container>
   
      
      <div id="printable-content" >
        

     


        <br/>
        
       
      
        
        
        <h3>واجهة عرض المستخدمين</h3>
       

        <v-row style="direction: ltr;">
          <v-col class="d-flex align-end" cols="6" sm="2">
            <v-btn
              color="indigo-lighten-1"
              rounded
            
              class="text-white flex-grow-1 text-none"
              elevation="24"
              @click="printContent()"
            >
              <span class="material-icons ">print</span>
            </v-btn>
          </v-col>
        </v-row>
        <br/>
          <v-card class="pa-5" elevation="24">
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
            :items-per-page="5"
            :search="search"
            class="elevation-1"
          >
            <template v-slot:item.actions="{ item }">
              <v-btn
                :to="`EditUser/${item.id}`"
                color="primary"
                rounded
                elevation="24"
              >
                تعديل
              </v-btn> 
              
          <!--     <v-btn
                color="red"
                rounded
                dark
                elevation="24"
                @click="deleteData(item.deci_No)"
                >حذف</v-btn
              > -->
             
            </template>
          </v-data-table>
        </v-card>
          <br/>
          
        </div>
        
      
     </v-container>
    
    </div>
   
  </template>
  <script>
  import axios from "axios";
 // import Swal from "sweetalert2";
  export default {
    name: "HomeView",
  
    data() {
      return {
        formdata: {
            FirstName:"",
        LastName:"",
        EmailAddress:"",
        Username: null,
        Password: null
        },
        search:"",
        filter: "",
        loading: true,
        headers: [
          {
            text: "الاسم الاول",
            align: "center",
            sortable: false,
            value: "firstName",
          },
          {
            text:"الاسم الثاني",
            align: "center",
            sortable: false,
            value: "lastName",
          },
          {
            text: "اسم المستخدم",
            align: "center",
            sortable: false,
            value: "username",
          },
          {
            text:"الايميل",
            align: "center",
            sortable: false,
            value: "emailAddress",
          },
          {
            text: "كلمة المرور",
            align: "center",
            sortable: false,
            value: "password",
          },
         
          {
            text: "العمليات",
            align: "center",
            value: "actions",
          },
        ],
        data: [],
      };
    },
  
    mounted() {
      this.fetchData();
    },
    methods: {
      printContent() {
          const printableContent = document.getElementById('printable-content')
          const printWindow = window.open('', '', 'height=1000,width=1000')
          printWindow.document.write(printableContent.innerHTML)
          printWindow.print()
        },
     
      searchRole() {
        this.axios
          .get("https://localhost:7001/User" + this.deci_no)
          .then((resuit) => {
            this.data = resuit.data;
            console.log(resuit);
          });
      },
  
    
  
      fetchData() {
        axios
          .get("https://localhost:7001/User")
          .then((resuit) => {
            this.data = resuit.data;
            this.loading = false;
          });
      },
    },
  
    watch: {
      filter(v) {
        console.log(v);
        this.fetchData(v);
        // call
      },
    },
  };
  </script>
  
  <style scoped>
  .img{
      height:550px;
      width: 3500px;
      background-size: cover;
  }
  .v-btn{
    color: rgb(17, 97, 167);
  }
  </style>
  