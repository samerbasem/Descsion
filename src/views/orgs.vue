<template>
  <div>
    <br />
    <v-img class="img" src="@/assets/img106.jpg" cover></v-img>
    <br />
    <div id="printable-content">
    <v-toolbar-title>واجهة عرض الجهات المرسل اليها االقرارت</v-toolbar-title>
    <br />
    
    <v-container>
   
      <v-row style="direction: ltr;">
        <v-col
        class="d-flex align-center"
        cols="6"
        sm="2"
      >
          <v-btn
          class="text-white flex-grow-1 text-none"
                color="blue-lighten-5"
                rounded
             
                size="x-large"
                elevation="24"
                @click="printContent()"
                > <span class="material-icons blue-color"> print</span></v-btn
              >
    </v-col>

      </v-row>
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
        >
          <!-- <template v-slot:item.actions="{ item }">
            <br/>
            <br/>
            <v-btn
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
          </template>-->
        </v-data-table>
      </v-card>
    </v-container>
   
  </div>
</div>
</template>
<script>
import axios from "axios";

export default {
  name: "orgs",

  data() {
    return {
      formdata: {
        Decision_Orgs: [],
        id: null,

        org: [],
        decision: [],

        Doc_no: ""
      },
      search: "",
      filter: "",
      loading: true,
      headers: [
        {
          text: "رقم القرار",
          align: "center",
          sortable: false,
          value: "Decision.Doc_no"
        },

        {
          text: "الجهة",
          align: "center",
          sortable: false,
          value: "Org.Org_Name"
        },

        {
          text: "تاريخ الارسال",
          align: "center",
          sortable: false,
          value: "Send_Date"
        }
      ],
      data: []
    };
  },

  mounted() {
    this.fetchData();
  },
  methods: {
    /*  showFile(docID) {
      // loading ...
      let loader = this.$loading.show({
        loader: "dots",
        transition: "fade",
        color: "#c30734",
      });
      axios
        .get("https://localhost:7001/Decisions/" + docID)
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
    }, */

     /***********خاصة بالطباعة********* */
    printContent() {
          const printableContent = document.getElementById('printable-content')
          const printWindow = window.open('', '', 'height=1000,width=1000')
          printWindow.document.write(printableContent.innerHTML)
          printWindow.print()
        },

    searchRole() {


      const headers = {
     Authorization: "Bearer " + this.token,
   };
      this.axios
        .get("https://localhost:7001/Decision/" + this.deci_no,{headers})
        .then(resuit => {
          this.data = resuit.data;
          console.log(resuit);
        });
    },

    fetchData() {
      axios.get("https://localhost:7001/DessionOrgs").then(resuit => {
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
  color: rgb(24, 84, 137);
}
</style>
