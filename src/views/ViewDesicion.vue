<template>
  <div><br/>
    <v-img class="img" src="@/assets/img106.jpg" cover ></v-img>
    <v-container>
      <br/>
      <br/>
      <!-- <v-row>
      <v-col sm="8" md="6">
        <v-btn
          block
          rounded
          size="large"
          style="font-size: 25px"
          color="blue lighten-8"
          height="50px"
          elevation="13"
          to="/FollowUpDeesion"
          >متابعة اجراءات القرارات</v-btn
        >
      </v-col>
      <v-col sm="8" md="6">
        <v-btn
          block
          rounded
          size="x-large"
          style="font-size: 25px"
          color="blue lighten-8"
          height="50px"
          elevation="13"
          to="/about"
          >ادخال قرار جديد</v-btn
        >
      </v-col>
     </v-row> -->
     <br/> <br/>
      

     

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
 <!--    <v-toolbar
    
      color="primary"
      dark
   
     
    > -->
      
    <!-- </v-toolbar> -->
        <v-data-table 
          :headers="headers"
          :items="data"
          elevation="24"
          :loading="false"
          :items-per-page="10"
          :search="search"
          class="elevation-1"
          max-width="1000px"
    
        >
          <template v-slot:item.actions="{ item }">
            <br/>
            <br/>
            <v-btn
            v-if="
           roles.find((el) => el == 'writer' || el == 'admin')
         "
              :to="`EditView/${item.deci_No}`"
              color="success"
              rounded
              elevation="24"
            ><v-icon> mdi-pencil</v-icon>
              تعديل
            </v-btn>
            <br/>
            <br/>
            <v-btn
            v-if="
            roles.find((el) => el == 'admin')
          "
              color="red"
              rounded
            
              elevation="24"
              @click="deleteData(item.deci_No)"
              > <v-icon>mdi-delete</v-icon>حذف </v-btn
            >
            <br/>
            <br/>
            <v-btn class="primary"  rounded elevation="24" @click="showFile(item.deci_No)"
              ><v-icon >mdi-folder</v-icon>
              الملف
            </v-btn>
            <br/>
            <br/>
          </template>
         
        </v-data-table>
      </v-card>
    
    </v-container>
   
  </div>
</template>
<script>
import axios from "axios";

import { mapGetters } from "vuex";
export default {
  name: "HomeView",

  data() {
    return {
      formdata: {
        meet_No: "",
        MeetTypes: [],
        id: null,
        meet_Type_Name: "",
        general_Categ_Name: "",
        GenCatg: [],
        DetailCatg: [],
        detail_Categ_Name: "",
        doc_no: "",
        doc_Date: "",
        deci_Year: "",
        deci_No: "",
        deci_Subject: "",
        meet_TypeId: "",
        detail_CategId: "",
        general_CategId: "",
        dialogDelete: "",
        selected: "",
      },
      search:"",
      filter: "",
      loading: true,
      headers: [
        {
          text: "رقم القرار",
          align: "center",
          sortable: false,
          value: "deci_No",
         
        },
        {
          text: "سنة القرار",
          align: "center",
          sortable: false,
          value: "deci_Year",
        },
        {
          text: "الموضوع",
          align: "center",
          sortable: false,
          value: "deci_Subject",
        },
        {
          text: "التاريخ والوقت",
          align: "center",
          sortable: false,
          value: "doc_Date",
        },
        {
          text: "الملف",
          align: "center",
          sortable: false,
          value: "deci_Path",
        },
        {
          text: "رقم الكتاب",
          align: "center",
          sortable: false,
          value: "doc_no",
        },
        {
          text: "تاريخ الكتاب",
          align: "center",
          sortable: false,
          value: "doc_Date",
        },
      /*   {
          text: "الملف",
          align: "center",
          sortable: false,
          value: "file_Path",
        }, */
        {
          text: "نوع الجلسة",
          align: "center",
          sortable: false,
          value: "meet_Type.meet_Type_Name",
        },
        {
          text: "التبويب الرئيسي",
          align: "center",
          sortable: false,
          value: "general_Categ.general_Categ_Name",

        },
        {
          text: "التبويب الفرعي",
          align: "center",
          sortable: false,
          value: "detail_Categ.detail_Categ_Name",   //////////////////////عملية اظهار الاسم الموجود في التبويب الفرعي من خلال فصل الاسم الاول من الثاني////////////////

        },
        {
          text: "المستخدم",
          align: "center",
          value: "user_Name",
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
    // {
          //  headers: {
            //  Authorization: "Bearer " + this.token,
          //  }
    // }
    this.fetchData();
  },
  computed:{
    ...mapGetters(["user", "token","roles"]),
  },
  methods: {
    showFile(docID) {
      // loading ...
      let loader = this.$loading.show({
        loader: "dots",
        transition: "fade",
        color: "#c30734",
      });
      axios
        .get("https://localhost:7001/Decisions/" + docID, {
          headers: {
           Authorization: "Bearer " + this.token,
             },
        })
        .then((response) => {
          if (response.status == 200) {
            var base64 = response.data.bookinfo.pdfBase64.trim();
            var formatType = "data:application/pdf;base64," + base64;
            fetch(formatType)
              .then((res) => res.blob())
              .then((blob) => {
                //---loading-overlay---
                loader.hide();
                const data = URL.createObjectURL(blob);
                var link = document.createElement("a");
                link.href = data;
                link.target = "_blank";
                link.click();
                window.URL.revokeObjectURL(blob);
              });
          }
        })
        .catch((error) => {
          //---loading-overlay---
          loader.hide();
          console.log(error);
        });
    },
    searchRole() {
      this.axios
        .get("https://localhost:7001/Decision/" + this.deci_no)
        .then((resuit) => {
          this.data = resuit.data;
          console.log(resuit);
        });
    },
    deleteData(deci_no) {
      this.axios
        .delete("https://localhost:7001/Decisions/" + deci_no)
        .thin((result) => {
          
          if (result.status == 204) {
            alert('هل انتة متأكد من حذف النص');
           
          }
          this.fetchData();
        });
    },

    fetchData() {
      axios
        .get("https://localhost:7001/Decisions", {
            headers: {
              Authorization: "Bearer " + this.token,
            },
          })
        .then((resuit) => {
          this.data = resuit.data;
        });
    },
  },

 
};
</script>

<style scoped>
.img{
    height:200px;
    width: 3500px;
    background-size: cover;
}
.v-btn{
  color: aliceblue;
}
</style>
