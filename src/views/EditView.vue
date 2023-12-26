<template>
  <div class="editEmployee">
    <v-card class="mx-auto" max-width="1200" style="margin-top: 150px;" elevation="24">
      <v-img src="@/assets/img106.jpg" height="300px" cover></v-img>
      <br />
      <v-card-title style="font-size: xx-large; " color="#01579B">واجهة تعديل القرارات</v-card-title>
      <br />
      <br />
      <br />

      <v-card-subtitle>
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="formdata.meet_No"
              solo
              label="رقم الجلسة"
              clearable
              color="#2196F3"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-select
              :items="formdata.MeetTypes"
              label="نوع الجلسة"
              item-text="meet_Type_Name"
              item-value="id"
              v-model="formdata.meet_TypeId"
              solo
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-select
              :items="formdata.GenCatg"
              label="التبويب الرئيسي"
              item-text="general_Categ_Name"
              item-value="id"
              v-model="formdata.general_CategId"
              solo
            ></v-select>
          </v-col>
          <v-col cols="6">
            <v-select
              :items="formdata.DetailCatg"
              label="التبويب الفرعي"
              item-text="detail_Categ_Name"
              item-value="id"
              v-model="formdata.detail_CategId"
              solo
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="formdata.doc_no"
              solo
              label=" رقم الكتاب"
              clearable
              color="#2196F3"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              type="text"
              v-model="formdata.doc_Date"
              solo
              label=" تاريخ  الكتاب"
              clearable
              color="#2196F3"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="formdata.deci_Year"
              solo
              label=" سنة القرار"
              clearable
              color="#2196F3"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="formdata.deci_No"
              solo
              label=" رقم القرار"
              clearable
              color="#2196F3"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-col cols="12">
          <v-text-field
            v-model="formdata.deci_Subject"
            solo
            label=" موضوع القرار"
            clearable
            color="#2196F3"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <h4>
            <a href="#" @click="showDoc(formdata.deci_No)">
              عرض المستند
            </a>
          </h4>
        </v-col>
      </v-card-subtitle>
      <v-row justify="center" align="center">
        <v-col cols="12" sm="6" md="4">
        
          <v-btn block  type="submit" @click.passive="EditmitEntry()" size="x-large" style="font-size: 30px;" color="#2196F3">حفظ التعديل </v-btn>
          
        </v-col>
      </v-row>

      <br />
      <br />
      <br />
    </v-card>
    <br />
      <br />
    <v-footer
    dark
    padless
  >
    <v-card
      class="flex"
      flat
      tile
    >
      <v-card-title class="primary">
        <strong class="subheading">Get connected with us on social networks!</strong>

        <v-spacer></v-spacer>

       
      </v-card-title>

     
    </v-card>
  </v-footer>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "EditView",

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
        
      },
    
    };
  },
  methods: {
    showDoc(id){
      // loading ...
      let loader = this.$loading.show({
        loader: "dots",
        transition: "fade",
        color: "#c30734",
      });
      axios
        .get("https://localhost:7001/Decisions/" + id)
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
    EditmitEntry() {
      axios
        .put("https://localhost:7001/Decisions/" + this.id, this.formdata)
        .then(response => {
          this.$router.push("/ViewDesicion");
          console.log(response);
        })
        .catch(error => {
          console.log(error);
         
        });
    },
    /////////////////////////// ///////////////////////
    MeetTypesList() {
      axios.get("https://localhost:7001/MeetTypes").then(response => {
        this.formdata.MeetTypes = response.data;
      });
    },
    //////////////////////////////////////////////////////////////
    GenCatgList() {
      axios.get("https://localhost:7001/GenCatg").then(response => {
        this.formdata.GenCatg = response.data;
      });
    },
    ///////////////////////////////////////////////////////
    DetailCatgList() {
      axios.get("https://localhost:7001/DetailCatg").then(response => {
        this.formdata.DetailCatg = response.data;
      });
    },

    getData() {
      axios
        .get("https://localhost:7001/Decisions/" + this.id)
        .then(response => {
          if(response.status == 200 || response.status == 201){
            this.formdata.meet_No = response.data.bookinfo.deciDto1.meet_No
            this.formdata.meet_TypeId = response.data.bookinfo.deciDto1.meet_TypeId
            this.formdata.general_CategId = response.data.bookinfo.deciDto1.general_CategId
            this.formdata.detail_CategId = response.data.bookinfo.deciDto1.detail_CategId
            this.formdata.doc_no = response.data.bookinfo.deciDto1.doc_no
            this.formdata.doc_Date = response.data.bookinfo.deciDto1.doc_Date
            this.formdata.deci_Year = response.data.bookinfo.deciDto1.deci_Year
            this.formdata.deci_No = response.data.bookinfo.deciDto1.deci_No
            this.formdata.deci_Subject = response.data.bookinfo.deciDto1.deci_Subject
            
          }
          
          //here you must set values to v mode of each one
        });
    }
  },

  mounted() {
    this.id = this.$route.params.id;
    this.getData();
    this.MeetTypesList();
    this.GenCatgList();
    this.DetailCatgList();
  }
};
</script>