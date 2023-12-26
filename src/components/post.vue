<template>
  <div class="addEmployee">
    <v-card
      class="mx-auto"
      max-width="1200"
      style="margin-top: 300px"
      elevation="24"
    >
      <v-img src="@/assets/img106.jpg" height="300px" cover></v-img>
      <br />
      <v-card-title style="font-size: xx-large" color="#01579B"
        >واجهة ادخال القرارات</v-card-title
      >
      <br />
      <br />
      <br />

      <v-card-subtitle>
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="formdata.meet_No"
              solo
              label=" رقم القرار "
              clearable
              color="#2196F3"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-autocomplete
              v-model="formdata.meet_Typeld"
              label="نوع الجلسة"
              :items="['اعتيادية', 'استثنائية']"
              color="#2196F3"
            ></v-autocomplete>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-autocomplete
              label="التبويب الرئيسي"
              :items="['التشريعات والقوانين', 'القرارات والاوامروالتنسيبات']"
              color="#2196F3"
              v-model="formdata.general_Categid"
            ></v-autocomplete>
          </v-col>
          <v-col cols="6">
            <v-autocomplete
              label="التبويب الفرعي"
              :items="['قوانين الاتفاقات', 'تشريعات قوانين الوزارات']"
              color="#2196F3"
              v-model="formdata.detaile_Categid"
            ></v-autocomplete>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="formdata.doc_No"
              solo
              label=" رقم الكتاب"
              clearable
              color="#2196F3"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              type="date"
              v-model="formdata.doc_Date"
              solo
              label=" تاريخ الكتاب"
              clearable
              color="#2196F3"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="formdata.deci_year"
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
          <v-file-input
            v-model="formdata.deci_path"
            label="تحميل القرار"
            color="#2196F3"
          ></v-file-input>
        </v-col>
      </v-card-subtitle>
      <v-row justify="center" align="center">
        <v-col cols="12" sm="6" md="4">
          <v-btn
            block
            type="submit"
            @click.passive="submitEntry()"
            size="x-large"
            style="font-size: 30px"
            color="#2196F3"
            >ارسال</v-btn
          >
        </v-col>
      </v-row>

      <br />
      <br />
      <br />
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "AboutView",

  data() {
    return {
      formdata: {
        meet_No: "",
        meet_Typeld: "",
        general_Categid: "",
        detaile_Categid: "",
        doc_No: "",
        doc_Date: "",
        deci_year: "",
        deci_No: "",
        deci_path: "",
      },
    };
  },

  //  methods:{
  //  submitEntry(){
  //   axios.post("https://localhost:7001/Decisions",{
  //      meet_No:this.meet_NO,
  //meet_Typeld:this.meet_Typeld,
  //general_Categid:this.general_Categid,
  //detaile_Categid:this.detaile_Categid,
  //doc_No:this.doc_No,
  //doc_Date:this.doc_Date,
  //deci_year:this.deci_year,
  //deci_No:this.deci_No,
  //deci_path:this.deci_path,
  //  })
  // .then((Response) =>{
  //   this.$router.push('/HomeView')
  // })

  //}
  // }

  // methods: {

  ///async submitEntry() {
  //await axios.post("https://localhost:7001/Decisions", this.formdata)
  //  .then(response => {
  //    console.log(response)
  //  })

  //}

  ///}
  /////////////////////////////////////////////////
  methods: {
    submitEntry() {
      axios
        .post("https://localhost:7001/Decisions", this.formdata)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
<style scoped></style>
