<template>
 <v-container>
  <v-card
    class="mx-auto"
    max-width="800"
    style="margin-top: 300px;"
    elevation="24"
  >
    <v-img
      src="@/assets/img106.jpg"
      height="300px"
      cover
    ></v-img>

    <v-card-title>
      اضافة صلاحيات جديدة
    </v-card-title>
<form ref="form" @submit.prevent="login()">
    <v-card-subtitle>
        <v-col cols="12" >
                    <v-text-field v-model=" role.name" solo label="اضافة صلاحيات" clearable></v-text-field>
                  </v-col>
     
                 
   

   
      <v-row justify="center" align="center">
      <v-col cols="12" sm="6" md="4">
        <v-btn block type="submit" @click=" submitEntry()" rounded="xl" size="x-large" style="font-size: 20px;"  color="#2196F3"   value="log in">اضافة</v-btn>
      
      </v-col>
 </v-row>
 <br/>
 <v-data-table
            :headers="headers"
            :items="item"
            elevation="24"
            :loading="false"
            :items-per-page="20"
            :search="search"
            class="elevation-5"
            
          >
         <!--    <template v-slot:item.actions="{ item }">
              <v-btn
                :to="`EditView/${item.deci_No}`"
                color="primary"
                rounded
                elevation="24"
              >
                تعديل
              </v-btn>
              //
              <v-btn
                color="red"
                rounded
                dark
                elevation="24"
                @click="deleteData(item.deci_No)"
                >حذف</v-btn
              >
           
            </template> -->
          </v-data-table>
      </v-card-subtitle>

    
   
    <v-row>
        
    </v-row>

     </form> 

      
    <br/>
   
   
  </v-card>
 </v-container>

 
</template>

<script>
export default {
 name:'RoleView',

 data() {
    return {
     item:[ ],
     role:{
    
        id:"",
        name:"",
     },
    
     
   
     
      headers: [
    
          {
            text: "الصلاحيات",
            align: "center",
            sortable: false,
            value: "name",
          },
        ]
    };
  },
  mounted(){
    this.fetchData();

  },
  created(){
    this.fetchData();

  },
 methods: {
  async submitEntry() {
 
      // for (const item in this.formdata) {
      //   if (this.formdata[item] === "" || this.formdata[item].length === 0) {
      //     this.error.push(item);
      //     // ;
      //   }
      // }

    
        axios
          .post("https://localhost:7001/Roles", this.role)
          .then((response) => {
            console.log(response);
          
          });
        
   
      },
      fetchData() {
        axios
          .get("https://localhost:7001/Roles",{} )
          .then((resuit) => {
            this.item = resuit.data;
            console.log(this.item);
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
    
 

}
</script>

<style>

</style>