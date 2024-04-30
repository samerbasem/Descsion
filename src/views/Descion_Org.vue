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
عرض الجهات       
 </v-card-title>
   <form ref="form" @submit.prevent="login()">
       <v-card-subtitle>
           <v-col cols="12" >
  <v-select
   :items="decision"
   label=" ادخل رقم القرار "
   item-text="Deci_No"
   item-value="id"
   v-model="Decision_Orgs.DecisionId"
 ></v-select>
 
                     </v-col>
                     <v-select
                     :items="orgs"
    v-model="Decision_Orgs.OrgId"
    
    item-text="Org_Name"
   item-value="id"
    chips
    label="اختر الجهة "
    multiple
  ></v-select>



  
  <v-text-field
    :value="Decision_Orgs.Send_Date"
    slot="activator"
    label="تاريخ الكتاب "
  ></v-text-field>

<v-date-picker
  color="primary"
  v-model="Decision_Orgs.Send_Date"
></v-date-picker>
         <v-row justify="center" align="center">
         <v-col cols="12" sm="6" md="4">
           <v-btn block type="submit" @click=" submitEntry()" rounded="xl" size="x-large" style="font-size: 20px;"  color="#2196F3"   value="log in">اضافة</v-btn>
         </v-col>
    </v-row>
    <br/>
         </v-card-subtitle>
        </form>  
       <br/>
     </v-card>
    </v-container>
   
    
   </template>
   
   <script>

   import Swal from "sweetalert2";
   import axios from "axios";
import { mapGetters } from "vuex";
import format from "date-fns/format";
   export default {
    name:'Descion_Org',
   
    data() {
       return {
        item:[ ],
        decision:{

            Id:"",
            Deci_No:""
        },
        Decision_Orgs:{
          
        
            
        },
        orgs:{
            Id:"",
      Org_Name:""
        },
          
   headers: [
 
 {
   text: "القرار",
   align: "center",
   sortable: false,
      
   value: "Decision.Deci_No",
 },
 {
  text: "الجهة المختصة",
 align: "center",
 sortable: false,
 value: "Decision_Orgs.orgId",

 }
]
       
        
      
        
         
  
  
  
  
  
  
  
  
  
  
  
  



           
       };
     },
     computed:{
  ...mapGetters(["user", "token","roles"]),
},
     mounted(){
        this.getDeci();
       this.getorg();
       this.getdata();
     },
     created(){
      this.getDeci();
       this.getorg();
       this.getdata();
     },
    methods: {
      singleNotification(notifyText) {
this.$toast.error(notifyText, {
  position: "top-right",
  timeout: 6000,
  closeOnClick: false,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: "button",
  icon: true,
  rtl: true
});},
     async submitEntry() {
      const headers = {
      Authorization: "Bearer " + this.token,
       };
           axios
             .post("https://localhost:7001/DessionOrgs",this.Decision_Orgs,{headers})
             .then((response) => {
              if (response.status == 200 || response.status == 201) {
                Swal.fire({
 icon: "success",
 title: "تم حفظ القرار بنجاح",
 showConfirmButton: true
             
             })
             .then(()=>{});
             
              }
              })
             .catch((err) => {
             if (err.response.status == 400) {
  this.singleNotification("رقم القيد مكرر !");
  
}
      
         });
     },
         getorg() {
           axios
             .get("https://localhost:7001/Org")
             .then((resuit) => {
               this.orgs = resuit.data;
          
              
             });
         },
         getDeci() {
          const headers = {
   Authorization: "Bearer " + this.token,
    };
       axios.get("https://localhost:7001/Decisions",{headers}).then((response) => {
    this.decision = response.data;
        
        
       });
   },
       },
     getdata(){
      axios.get("https://localhost:7001/DessionOrgs").then((response) => {
this.item = response.data
    console.log(response)
    
   });


     },
    
    
  
    
    
    
    
   
   }
   </script>
   
   <style>
   
   </style>