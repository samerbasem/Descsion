<template>
  <div>
    <div id="test-print">
      <v-img class="img" src="@/assets/img106.jpg" cover></v-img>
      <v-toolbar-title class="h1">واجهة عرض القرارات</v-toolbar-title>
    </div>
    <v-container>
      <br />
      <br />

      <div id="printable-content">
        <div id="test-print">
          <v-row style="direction: ltr;">
            <v-col class="d-flex align-center" cols="6" sm="4">
           <!--    <v-btn
                class="text-white flex-grow-1 text-none"
                color="blue-lighten-5"
                rounded
                size="x-large"
                elevation="24"
                @click="printContent()"
              >
                <span class="material-icons blue-color">print</span>
              </v-btn> -->
              <v-btn
                class="text-white flex-grow-1 text-none"
                color="blue-lighten-5"
                rounded
                size="x-large"
                elevation="24"
                to="/ViewDesicion1"
              >
                <span class="material-icons blue-color">عرض التقرير قبل الطباعة</span>
              </v-btn>
            </v-col>
          </v-row>
        </div>

        <br />
        <br />

        <v-card  elevation="24">
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
   
     
          >-->

          <!-- </v-toolbar> -->
          <v-data-table
            :headers="headers"
            :items="data"
            elevation="24"
            :loading="false"
            :items-per-page="6"
            :search="search"
            class="elevation-1"
       
          >
            <template v-slot:item.actions="{ item }">
              <br />
              <br />
              <div id="test-print">
                <v-btn
                  v-if="
           roles.find((el) => el == 'writer' || el == 'admin')
         "
                  :to="`EditView/${item.Id}`"
                  color="success"
                  rounded
                  elevation="24"
                >
                  <v-icon>mdi-pencil</v-icon>تعديل
                </v-btn>
                <br />
                <br />
                <v-btn
                  v-if="
            roles.find((el) => el == 'admin')
          "
                  color="red"
                  rounded
                  elevation="24"
                  @click="deleteData(item.deci_No)"
                >
                  <v-icon>mdi-delete</v-icon>حذف
                </v-btn>
                <br />
                <br />
                <v-btn class="primary" rounded elevation="24" @click="showFile(item.Deci_No)">
                  <v-icon>mdi-folder</v-icon>الملف
                </v-btn>
              </div>
              <br />
              <br />
            </template>
            /************** هذي العملية خاصة في عمل التسطير في عرض الجدول*********** */
            <template
              v-slot:item.deci_Subject="{item }"
            >
              <div style="width: 200px">{{ item.deci_Subject }}</div>
            </template>

            <template v-slot:item.notes="{item }">
              <div style="width: 100px">{{ item.notes }}</div>
            </template>
          </v-data-table>
         </v-card>
      </div>
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
        Meet_No: "",
        MeetTypes: [],
        Deci_Type:[],
        DeciDirec:[],
        Deci_TypeId:"",
        Deci_Direc_TypeId:"",
        Deci_Direc_Name:"",
        Deci_Type_Name:"",
        Id: null,
        Meet_Type_Name: "",
        General_Categ_Name: "",
        GenCatg: [],
        DetailCatg: [],
        Detail_Categ_Name: "",
        Doc_no: "",
       Doc_Date: "",
        Deci_Year: "",
        Deci_No: "",
        Deci_Subject: "",
        Meet_TypeId: "",
        Detail_CategId: "",
        General_CategId: "",
       DialogDelete: "",
        Selected: "",
        Notes: "",
      Meeting_Date:"",
      },
      search: "",
      filter: "",
      loading: true,
      headers: [
        {
          text: "رقم الجلسة",
          align: "center",
          sortable: false,
          value: "Meet_No"
        },
        {
          text: "نوع الجلسة",
          align: "center",
          sortable: false,
          value: "Meet_Type.Meet_Type_Name"
        },
        {
          text: "تاريخ الجلسة",
          align: "center",
          sortable: false,
          value: "Meeting_Date"
        },
          {
          text: "نوع الكتاب",
          align: "center",
          sortable: false,
          value: "Deci_Type.Deci_Type_Name",class: "blue lighten-3 text-h3"

        },
        {
          text: "رقم القرار",
          align: "center",
          sortable: false,
          value: "Deci_No"
        },
        {
          text: "سنة القرار",
          align: "center",
          sortable: false,
          value: "Deci_Year"
        },
        {
          text: "الموضوع",
          align: "center",
          sortable: false,
          value: "Deci_Subject"
        },
      

        {
          text: "رقم الكتاب",
          align: "center",
          sortable: false,
          value: "Doc_no"
        },
        {
          text: "تاريخ الكتاب",
          align: "center",
          sortable: false,
          value: "Doc_Date"
        },
           {
            text: "التبويب الرئيسي",
          align: "center",
          sortable: false,
          value: "Deci_Direc_Type.Deci_Direc_Name",


        }, 
    /*
        {
          text: "التبويب الرئيسي",
          align: "center",
          sortable: false,
          value: "General_Categ.General_Categ_Name"
        },
        */
        {
          text: "التبويب الفرعي",
          align: "center",
          sortable: false,
          value: "Detail_Categ.Detail_Categ_Name" //////////////////////عملية اظهار الاسم الموجود في التبويب الفرعي من خلال فصل الاسم الاول من الثاني////////////////
        },
        /*
        {
          text: "المستخدم",
          align: "center",
          value: "user_Name",
        },*/

        {
          text: "اسم المستخدم",
          align: "center",
          value: "User_Name"
        },
        {
          text: "الملاحظات",
          align: "center",
          sortable: false,
          value: "Notes"
        },
        {
          text: "العمليات",
          align: "center",
          value: "actions"
        }
      ],
      data: []
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
  computed: {
    ...mapGetters(["user", "token", "roles"])
  },
  methods: {
    showFile(docID) {
      // loading ...
      let loader = this.$loading.show({
        loader: "dots",
        transition: "fade",
        color: "#c30734"
      });
      axios
        .get("https://localhost:7001/Decisions/" + docID, {
          headers: {
            Authorization: "Bearer " + this.token
          }
        })
        .then(response => {
          if (response.status == 200) {
            var base64 = response.data.bookinfo.pdfBase64.trim();
            var formatType = "data:application/pdf;base64," + base64;
            fetch(formatType)
              .then(res => res.blob())
              .then(blob => {
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
        .catch(error => {
          //---loading-overlay---
          loader.hide();
          console.log(error);
        });
    },
    searchRole() {
      this.axios
        .get("https://localhost:7001/Decision/" + this.deci_no, {
          headers: {
            Authorization: "Bearer " + this.token
          }
        })
        .then(resuit => {
          this.data = resuit.data;
          console.log(resuit);
        });
    },
    deleteData(deci_no) {
      this.axios
        .delete("https://localhost:7001/Decisions/" + deci_no, {
          headers: {
            Authorization: "Bearer " + this.token
          }
        })
        .thin(result => {
          if (result.status == 204) {
            alert("هل انتة متأكد من حذف النص");
          }
          this.fetchData();
        });
    },

    fetchData() {
      axios
        .get("https://localhost:7001/Decisions", {
          headers: {
            Authorization: "Bearer " + this.token
          }
        })
        .then(resuit => {
          this.data = resuit.data;
        });
    },
    printContent() {
      //const printableContent = document.getElementById('printable-content');
      //const printWindow = window.open('', '', 'height=1000,width=1000')
      // printWindow.document.write(printableContent.innerHTML)
      // printWindow.print()

      window.print();
    }
  }
};
</script>

<style>
.blue-color {
  color: blue;
}

.img {
  height: 200px;
  width: 3500px;
  background-size: cover;
}
.v-btn {
  color: rgb(13, 73, 124);
}
.h1 {
  font-family: "Cairo", sans-serif;
  font-size: 30px;
  color: blue;
  text-align: center;
}

@media print {
  #test-print {
    display: none;
  }
}
</style>
