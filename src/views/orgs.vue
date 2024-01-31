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
  name: "orgs",

  data() {
    return {
      formdata: {
        Decision_Orgs: [],
        id: null,

        org: [],
        decision: [],

        doc_no: ""
      },
      search: "",
      filter: "",
      loading: true,
      headers: [
        {
          text: "رقم القرار",
          align: "center",
          sortable: false,
          value: "decision.doc_no"
        },

        {
          text: "الجهة",
          align: "center",
          sortable: false,
          value: "org.org_Name"
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
  color: aliceblue;
}
</style>
