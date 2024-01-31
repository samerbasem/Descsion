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
          :items="item"
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
  name: "ReportView",

  data() {
    return {
     
      search: "",
filter:"",
      item: [],
      loading: true,
      headers: [
        {
          text: "رقم الجلسة ",
          align: "center",
          sortable: false,
          value: "meet_No",
        },

        {
          text: "رقم القرار ",
          align: "center",
          sortable: false,
          value: "doc_no",
        },
        {
          text: "التبويب الفرعي ",
          align: "center",
          sortable: false,
          value: "detail_Categ_Name",
        },
        {
          text: "التبويب الرئيسي ",
          align: "center",
          sortable: false,
          value: "general_Categ_Name",
        },

        {
          text: "رقم الكتاب ",
          align: "center",
          sortable: false,
          value: "book_No",
        },
        {
          text: "تاريخ الكتاب ",
          align: "center",
          sortable: false,
          value: "book_Date",
        },
        {
          text: "نوع الكتاب ",
          align: "center",
          sortable: false,
          value: "book_Type_Name",
        },
        {
          text: "الوزارة ",
          align: "center",
          sortable: false,
          value: "org_Name",
        },
        {
          text: "عنوان الاجراء ",
          align: "center",
          sortable: false,
          value: "process_Subj",
        },
        {
          text: "تفاصيل الاجراء ",
          align: "center",
          sortable: false,
          value: "process_Details",
        },
        {
          text: "تاريخ الاستلام ",
          align: "center",
          sortable: false,
          value: "send_Reciev_Date",
        },

        {
          text: "تاريخ الارسال ",
          align: "center",
          sortable: false,
          value: "send_Date",
        },

        {
          text: "حالة الكتاب ",
          align: "center",
          sortable: false,
          value: "status_Name",
        },
        {
          text: "الملاحظات ",
          align: "center",
          sortable: false,
          value: "notes",
        },
      ],
      
      
      
    };
  },

  mounted() {
    this.fetchData();
   
  },
  methods: {
 
    filter() {
   axios.get("" + this.selected).then((response) => {
     this.item = response.data;
   });
 },
 
 

    fetchData() {
      axios.get("https://localhost:7001/api/View","" + this.selected).then((resuit) => {
        this.item = resuit.data;
        this.loading = false;
      });
    },
  }}

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
