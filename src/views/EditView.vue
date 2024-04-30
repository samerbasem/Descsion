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
              v-model="fields.Meet_No"
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
              item-text="Meet_Type_Name"
              item-value="Id"
              v-model="fields.Meet_TypeId"
              solo
            ></v-select>
          </v-col>
        </v-row>

        <v-row justify="center">
          <v-col cols="6">
            <label>تاريخ الجلسة</label>
            <v-text-field type="text" v-model="fields.Meeting_Date" solo clearable color="#2196F3"></v-text-field>
          </v-col>

          <v-col cols="6">
            <label>نوع الكتاب</label>
            <v-select
              :items="fields.Deci_Type"
              item-text="Deci_Type_Name"
              item-value="Id"
              v-model="fields.Deci_TypeId"
              solo
            ></v-select>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="6">
            <label>توجية اجراء</label>
            <v-select
              :items="fields.DeciDirec"
              item-text="Deci_Direc_Name"
              item-value="Id"
              v-model="fields.Deci_Direc_TypeId"
              solo
            ></v-select>
          </v-col>
          <!-- <v-col cols="4">
            <label>التبويب الرئيسي</label>
            <v-select
              :items="fields.GenCatg"
              label="التبويب الرئيسي"
              item-text="General_Categ_Name"
              item-value="Id"
              v-model="fields.General_CategId"
              solo
            ></v-select>
          </v-col> -->
          <v-col cols="6">
            <label>التبويب الفرعي</label>
            <v-select
              :items="fields.DetailCatg"
              label="التبويب الفرعي"
              item-text="Detail_Categ_Name"
              item-value="Id"
              v-model="fields.Detail_CategId"
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
              v-model="fields.Doc_Date"
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
              v-model="fields.Deci_No"
              solo
              label=" رقم القرار"
              clearable
              color="#2196F3"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="6">
            <label>موضوع القرار</label>
            <v-textarea
              v-model="fields.Deci_Subject"
              solo
              auto-grow
              box
              single-line="false"
              clearable
              color="#2196F3"
              name="input-7-1"
            ></v-textarea>
          </v-col>
          <v-col cols="6">
            <label>الملاحظات</label>
            <v-textarea
              v-model="fields.Notes"
              solo
              auto-grow
              box
              single-line="false"
              clearable
              color="#2196F3"
              name="input-7-1"
            ></v-textarea>
          </v-col>
        </v-row>

        <v-file-input v-model="File" label="File input" show-size></v-file-input>
        <v-col cols="12">
          <h4>
            <a href="#" @click="showDoc(fields.Id)">عرض المستند</a>
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
        Meet_No: null,
        MeetTypes: [],
        Deci_Type: [],
        DeciDirec: [],
        Deci_TypeId: "",
        Deci_Direc_TypeId: "",
        Deci_Direc_Name: "",
        Deci_Type_Name: "",
        Id: null,
        Meet_Type_Name: null,
        General_Categ_Name: null,
        GenCatg: [],
        DetailCatg: [],
        Detail_Categ_Name: null,
        Doc_no: null,
        Doc_Date: null,
        Deci_Year: null,
        Deci_No: null,
        Deci_Subject: null,
        Meet_TypeId: null,
        Detail_CategId: null,
        General_CategId: null,
        User_Update: "",
        File_Path: "",
        Notes: "",
        Meeting_Date: ""
      },
      File: null
    };
  },
  computed: {
    ...mapGetters(["user", "token"])
  },
  methods: {
    showDoc(Id) {
      // loading ...
      let loader = this.$loading.show({
        loader: "dots",
        transition: "fade",
        color: "#c30734"
      });
      axios
        .get("https://localhost:7001/Decisions/" + Id, {
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
    EditmitEntry() {
      let loader = this.$loading.show({
        container: this.$refs.newsContainer,
        loader: "spinner",
        transition: "fade",
        color: "#c30734"
      });
      var formData = new FormData();
      formData.append("Meet_No", this.fields.Meet_No);
      formData.append("MeetTypes", this.fields.MeetTypes);
      formData.append("Deci_Type", this.fields.Deci_Type);
      formData.append("Deci_Type_Name", this.fields.Deci_Type_Name);
      formData.append("Deci_TypeId", this.fields.Deci_TypeId);
      formData.append("DeciDirec", this.fields.DeciDirec);
      formData.append("Deci_Direc_Name", this.fields.Deci_Direc_Name);
      formData.append("Deci_Direc_TypeId", this.fields.Deci_Direc_TypeId);
      formData.append("Meeting_Date", this.fields.Meeting_Date);
      formData.append("Meet_Type_Name", this.fields.Meet_Type_Name);
      // formData.append("General_Categ_Name", this.fields.General_Categ_Name);
      formData.append("GenCatg", this.fields.GenCatg);
      formData.append("Detail_Categ_Name", this.fields.Detail_Categ_Name);
      formData.append("Doc_no", this.fields.Doc_no);
      formData.append("Doc_Date", this.fields.Doc_Date);
      formData.append("deci_year", this.fields.Deci_Year);
      formData.append("Deci_No", this.fields.Deci_No);
      formData.append("Deci_Subject", this.fields.Deci_Subject);
      formData.append("Notes", this.fields.Notes);
      formData.append("Meet_TypeId", this.fields.Meet_TypeId);
      formData.append("Detail_CategId", this.fields.Detail_CategId);
      formData.append("General_CategId", this.fields.General_CategId);
      formData.append(" File_Path", this.fields.File_Path);
      formData.append("User_Update", this.user.userName);

      formData.append("File", this.File);
      axios
        .put("https://localhost:7001/Decisions/" + this.Id, formData, {
          headers: {
            Authorization: "Bearer " + this.token
          }
        })
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
    Deci_TypeList() {
      axios
        .get("https://localhost:7001/Deci_Type", {
          headers: {
            Authorization: "Bearer " + this.token
          }
        })
        .then(response => {
          this.fields.Deci_Type = response.data;
        });
    },
    /////////////////////////////////////////////////////
    DeciDirecList() {
      axios
        .get("https://localhost:7001/DeciDirec", {
          headers: {
            Authorization: "Bearer " + this.token
          }
        })
        .then(response => {
          this.fields.DeciDirec = response.data;
        });
    },
    /////////////////////////// ///////////////////////
    MeetTypesList() {
      axios
        .get("https://localhost:7001/MeetTypes", {
          headers: {
            Authorization: "Bearer " + this.token
          }
        })
        .then(response => {
          this.fields.MeetTypes = response.data;
        });
    },
    //////////////////////////////////////////////////////////////
    GenCatgList() {
      axios
        .get("https://localhost:7001/GenCatg", {
          headers: {
            Authorization: "Bearer " + this.token
          }
        })
        .then(response => {
          this.fields.GenCatg = response.data;
        });
    },
    ///////////////////////////////////////////////////////
    DetailCatgList() {
      axios
        .get("https://localhost:7001/DetailCatg", {
          headers: {
            Authorization: "Bearer " + this.token
          }
        })
        .then(response => {
          this.fields.DetailCatg = response.data;
        });
    },

    getData() {
      axios
        .get("https://localhost:7001/Decisions/" + this.Id, {
          headers: {
            Authorization: "Bearer " + this.token
          }
        })
        .then(response => {
          if (response.status == 200) {
            console.log(response.data.Bookinfo.deciDto1)
            this.fields.Meet_No = response.data.Bookinfo.deciDto1.Meet_No;
            this.fields.Meet_TypeId = response.data.Bookinfo.deciDto1.Meet_TypeId;
                                         
           // this.fields.General_CategId = response.data.Bookinfo.deciDto1.General_CategId;
          
            this.fields.Detail_CategId = response.data.Bookinfo.deciDto1.Detail_CategId;
             
            this.fields.Doc_no = parseInt(
              response.data.Bookinfo.deciDto1.Doc_no
            );
            this.fields.Doc_Date = response.data.Bookinfo.deciDto1.Doc_Date;
            this.fields.Deci_Year = response.data.Bookinfo.deciDto1.Deci_Year;
            this.fields.Deci_No = response.data.Bookinfo.deciDto1.Deci_No;
            this.fields.File_Path = response.data.Bookinfo.deciDto1.File_Path;

            this.fields.Deci_Type = response.data.Bookinfo.deciDto1.Deci_Type;
            this.fields.Deci_Type_Name = response.data.Bookinfo.deciDto1.Deci_Type_Name;
           
            this.fields.Deci_TypeId = response.data.Bookinfo.deciDto1.Deci_TypeId;
              
            this.fields.Deci_Subject = response.data.Bookinfo.deciDto1.Deci_Subject;
              
            this.fields.Notes = response.data.Bookinfo.deciDto1.Notes;
            this.fields.DeciDirec = response.data.Bookinfo.deciDto1.DeciDirec;
            this.fields.Deci_Direc_TypeId = response.data.Bookinfo.deciDto1.Deci_Direc_TypeId;
             
            this.fields.Deci_Direc_Name = response.data.Bookinfo.deciDto1.Deci_Direc_Name;
             
            this.fields.Meeting_Date = response.data.Bookinfo.deciDto1.Meeting_Date;
             
          }

          //here you must set values to v mode of each one
        });
    }
  },

  mounted() {
    this.Id = this.$route.params.Id;
    this.getData();
    this.MeetTypesList();
   //  this.GenCatgList();
    this.DetailCatgList();
    this.DeciDirecList();
    this.Deci_TypeList();
  }
};
</script>