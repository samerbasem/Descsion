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
            <label>رقم الجلسة</label>
            <v-text-field
              v-model="fields.meet_No"
              solo
              label="رقم الجلسة"
              clearable
              color="#2196F3"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <label>نوع الجلسة</label>
            <v-select
              :items="fields.MeetTypes"
              label="نوع الجلسة"
              item-text="meet_Type_Name"
              item-value="id"
              v-model="fields.meet_TypeId"
              solo
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <label>التبويب الرئيسي</label>
            <v-select
              :items="fields.GenCatg"
              label="التبويب الرئيسي"
              item-text="general_Categ_Name"
              item-value="id"
              v-model="fields.general_CategId"
              solo
            ></v-select>
          </v-col>
          <v-col cols="6">
            <label>التبويب الفرعي</label>
            <v-select
              :items="fields.DetailCatg"
              label="التبويب الفرعي"
              item-text="detail_Categ_Name"
              item-value="id"
              v-model="fields.detail_CategId"
              solo
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <label>رقم الكتاب</label>
            <v-text-field
              v-model="fields.Doc_no"
              solo
              label=" رقم الكتاب"
              clearable
              color="#2196F3"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <label>تاريخ الكتاب</label>
            <v-text-field
              type="text"
              v-model="fields.doc_Date"
              solo
              label=" تاريخ  الكتاب"
              clearable
              color="#2196F3"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <label>سنة القرار</label>
            <v-text-field
              v-model="fields.Deci_Year"
              solo
              label=" سنة القرار"
              clearable
              color="#2196F3"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <label>رقم القرار</label>
            <v-text-field
              v-model="fields.deci_No"
              solo
              label=" رقم القرار"
              clearable
              color="#2196F3"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-col
        cols="6"
        md="6"
      >
        <label>موضوع القرار</label>
        <v-textarea
        v-model="fields.deci_Subject"
          solo
          single-line="false"
          label=" موضوع القرار"
              clearable
              color="#2196F3"
             
              filled
          auto-grow
       
          rows="1"
          row-height="30"
          shaped
          name="input-7-4"
          
        ></v-textarea>

        </v-col>
        <!-- <v-col cols="12">
          <label>موضوع القرار</label>
          <v-text-field
            v-model="fields.deci_Subject"
            solo
            label=" موضوع القرار"
            clearable
            color="#2196F3"
          ></v-text-field>
        </v-col> -->
        <v-col cols="12">
          <h4>
            <a href="#" @click="showDoc(fields.deci_No)">عرض المستند</a>
          </h4>
        </v-col>
      </v-card-subtitle>
      <v-row justify="center" align="center">
        <v-col cols="12" sm="6" md="4">
          <v-btn
            block
            type="submit"
            @click="EditmitEntry()"
            size="x-large"
            style="font-size: 30px;"
            color="#2196F3"
          >حفظ التعديل</v-btn>
        </v-col>
      </v-row>

      <br />
      <br />
      <br />
    </v-card>
    <br />
    <br />
    <v-footer dark padless>
      <v-card class="flex" flat tile>
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
import { mapGetters } from "vuex";
import Swal from "sweetalert2";
export default {
  name: "EditView",

  data() {
    return {
      fields: {
        meet_No: null,
        MeetTypes: [],
        id: null,
        meet_Type_Name: null,
        general_Categ_Name: null,
        GenCatg: [],
        DetailCatg: [],
        detail_Categ_Name: null,
        Doc_no: null,
        doc_Date: null,
        Deci_Year: null,
        deci_No: null,
        deci_Subject: null,
        meet_TypeId: null,
        detail_CategId: null,
        general_CategId: null,
        File: null,
        user_Update:"",
      
      }
    };
  },
  computed: {
    ...mapGetters(["user", "token"])
  },
  methods: {
    showDoc(id) {
      // loading ...
      let loader = this.$loading.show({
        loader: "dots",
        transition: "fade",
        color: "#c30734"
      });
      axios
        .get("https://localhost:7001/Decisions/" + id)
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
    EditmitEntry() {
      let loader = this.$loading.show({
        container: this.$refs.newsContainer,
        loader: "spinner",
        transition: "fade",
        color: "#c30734"
      });
      var formData = new FormData();
      formData.append("meet_No", this.fields.meet_No);
      formData.append("MeetTypes", this.fields.MeetTypes);
      formData.append("meet_Type_Name", this.fields.meet_Type_Name);
      formData.append("general_Categ_Name", this.fields.general_Categ_Name);
      formData.append("GenCatg", this.fields.GenCatg);
      formData.append("detail_Categ_Name", this.fields.detail_Categ_Name);
      formData.append("Doc_no", this.fields.Doc_no);
      formData.append("doc_Date", this.fields.doc_Date);
      formData.append("deci_year", this.fields.Deci_Year);
      formData.append("deci_No", this.fields.deci_No);
      formData.append("deci_Subject", this.fields.deci_Subject);
      formData.append("meet_TypeId", this.fields.meet_TypeId);
      formData.append("detail_CategId", this.fields.detail_CategId);
      formData.append("general_CategId", this.fields.general_CategId);
      formData.append("user_Update", this.user.userName);
     
      
      formData.append("File", this.fields.File);
      axios
        .put("https://localhost:7001/Decisions/" + this.id, formData)
        .then(response => {
          if (response.status == 200) {
            loader.hide();
            Swal.fire({
              icon: "success",
              title: "هل ترغب بالتعديل",
              showConfirmButton: true
            }).then(() => {
              this.$router.push("/ViewDesicion");
            });
           
          }
        })
        .catch(error => {
          loader.hide();
          console.log(error);
        });
    },
    /////////////////////////// ///////////////////////
    MeetTypesList() {
      axios.get("https://localhost:7001/MeetTypes").then(response => {
        this.fields.MeetTypes = response.data;
      });
    },
    //////////////////////////////////////////////////////////////
    GenCatgList() {
      axios.get("https://localhost:7001/GenCatg").then(response => {
        this.fields.GenCatg = response.data;
      });
    },
    ///////////////////////////////////////////////////////
    DetailCatgList() {
      axios.get("https://localhost:7001/DetailCatg").then(response => {
        this.fields.DetailCatg = response.data;
      });
    },

    getData() {
      axios
        .get("https://localhost:7001/Decisions/" + this.id)
        .then(response => {
          if (response.status == 200 || response.status == 201) {
            this.fields.meet_No = response.data.bookinfo.deciDto1.meet_No;
            this.fields.meet_TypeId =
              response.data.bookinfo.deciDto1.meet_TypeId;
            this.fields.general_CategId =
              response.data.bookinfo.deciDto1.general_CategId;
            this.fields.detail_CategId =
              response.data.bookinfo.deciDto1.detail_CategId;
            this.fields.Doc_no = parseInt(
              response.data.bookinfo.deciDto1.doc_no
            );
            this.fields.doc_Date = response.data.bookinfo.deciDto1.doc_Date;
            this.fields.Deci_Year = response.data.bookinfo.deciDto1.deci_Year;
            this.fields.deci_No = response.data.bookinfo.deciDto1.deci_No;
            this.fields.deci_Subject =
              response.data.bookinfo.deciDto1.deci_Subject;
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