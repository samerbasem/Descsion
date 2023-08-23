<template>
  <div>


    <v-container>
       <h1> get data</h1>
    <v-card class="pa-5"
    elevation="24">
        <v-data-table
    :headers="headers"
    :items="data"
    elevation="24"
    :loading="false"
    :items-per-page="5"
    class="elevation-1"
  >
 <template v-slot:item.show="{  }">
    <v-btn color="primary">تعديل</v-btn>
    <v-btn color="red">حذف</v-btn>
    </template>
  
  </v-data-table>
  
    </v-card>
    </v-container>
   
  

  </div>






  
</template>

<script>
import axios from 'axios'
export default {
  name:'AboutView',
 
  data () {
      return {
        loading:true,
        headers: [
          {
            text: 'رقم القرار',
            align: 'center',
            sortable: false,
            value: 'deci_No',
          },
          {
            text: 'سنة القرار',
            align: 'center',
            sortable: false,
            value: 'deci_Year',
          },
          {
            text: 'الموضوع',
            align: 'center',
            sortable: false,
            value: 'deci_Subject',
          },
          {
            text: 'التاريخ والوقت',
            align: 'center',
            sortable: false,
            value: 'doc_Date',
          },
          {
            text: 'الملف',
            align: 'center',
            sortable: false,
            value: 'deci_Path',
          },
          {
            text: 'رقم الكتاب',
            align: 'center',
            sortable: false,
            value: 'doc_no',
          },
          {
            text: 'تاريخ الكتاب',
            align: 'center',
            sortable: false,
            value: 'doc_Date',
          },
          {
            text: 'نوع الجلسة',
            align: 'center',
            sortable: false,
            value:   "show",
          },
        
        ],
        
        
        data:[]
        
      }
    },
   
   
mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
     axios.get('https://localhost:7001/Decisions')
      .then((resuit)=>{
       this.data=resuit.data
       this.loading=false
      })
       
    }
  },
   created(){
   console.log("hello")
   this.fetchData
   }
}
</script>

<style>

</style>