<template>
  <div class="addEmployee">
    <v-card class="mx-auto" max-width="1200" style="margin-top: 150px" elevation="24">
      <v-img src="@/assets/img106.jpg" height="500px" cover></v-img>
      <br />
      <v-card-title style="justify-content: center" color="primary">واجهة ادخال القرارات</v-card-title>
      <br />
      <br />
      <br />

      <v-form ref="form" v-model="valid" lazy-validation>
        <v-card-subtitle>
          <v-row justify="center">
            <v-col cols="6">
              <label>رقم الجلسة</label>
              <v-text-field
                v-model="formdata.Meet_No"
                solo
                clearable
                color="#2196F3"
                :rules="[(v) => !!v || 'يجب ادخال رقم الجلسة']"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <label>نوع الجلسة</label>
              <v-select
                :items="MeetTypes"
                item-text="Meet_Type_Name"
                item-value="Id"
                v-model="formdata.Meet_TypeId"
                solo
                :rules="[(v) => !!v || 'يجب ادخال نوع الجلسة']"
              ></v-select>
            </v-col>
          </v-row>

          <v-row justify="center">
            <v-col cols="6">
              <label>تاريخ الجلسة</label>
              <v-text-field
                type="date"
                v-model="formdata.Meeting_Date"
                solo
                clearable
                color="#2196F3"
                :rules="[(v) => !!v || 'يجب ادخال تاريخ الجلسة']"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <label>نوع الكتاب</label>
              <v-select
                :items="Deci_Type"
                item-text="Deci_Type_Name"
                item-value="Id"
                v-model="formdata.Deci_TypeId"
                solo
                :rules="[(v) => !!v || 'يجب ادخال نوع الكتاب']"
              ></v-select>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <label>نوع القرار</label>
              <v-select
                :items="DeciDirec"
                item-text="Deci_Direc_Name"
                item-value="Id"
                v-model="formdata.Deci_Direc_TypeId"
                solo
                @change="handleDropdownChange"
                :rules="[(v) => !!v || 'يجب ادخال نوع الكتاب']"
              ></v-select>
            </v-col>

         <!--    <v-col cols="4">
              <label>التبويب الرئيسي</label>
              <v-select
                :items="formdata.GenCatg"
                item-text="General_Categ_Name"
                item-value="id"
                v-model="formdata.General_CategId"
                solo
                :rules="[(v) => !!v || 'يجب ادخال نوع التبويب الرئيسي']"
                @change="DetailSubCatg(formdata.General_CategId)"
              ></v-select>
            </v-col> -->
            <v-col cols="6">
              <label>التبويب الفرعي</label>
              <v-select
                :items="formdata.DetailCatg"
                item-text="Detail_Categ_Name"
                item-value="Id"
                v-model="formdata.Detail_CategId"
                solo
                :rules="[(v) => !!v || 'يجب ادخال نوع التبويب الفرعي']"
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <label>رقم الكتاب</label>
              <v-text-field
                v-model="formdata.Doc_no"
                solo
                clearable
                color="#2196F3"
                :rules="[(v) => !!v || 'يجب ادخال رقم الكتاب']"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <label>تاريخ الكتاب</label>
              <v-text-field
                type="date"
                v-model="formdata.Doc_Date"
                solo
                clearable
                color="#2196F3"
                :rules="[(v) => !!v || 'يجب ادخال تاريخ الكتاب']"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <label>سنة القرار</label>
              <v-text-field
                v-model="formdata.Deci_Year"
                solo
                clearable
                color="#2196F3"
                :rules="[(v) => !!v || 'يجب ادخال سنة القرار']"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <label>رقم القرار</label>
              <v-text-field
                v-model="formdata.Deci_No"
                :disabled="isDisabled"      
                solo
                clearable
                color="#2196F3"
                :rules="[(v) => !!v || 'يجب ادخال رقم القرار']"
              ></v-text-field>
            </v-col>
          </v-row>
          <!-- /******************أضافة جديدةحسب الطلب*********** */ -->
          <v-row>
            <!-- 
              <v-col cols="6">
              <label> الجهه المرسل اليها</label>
              <v-select
                :items="orgs"


                item-text="org_Name"
                item-value="id"
                v-model="formdata.org.orgId"
                solo
                :rules="[(v) => !!v || 'يجب ادخال الجهه المرسل اليها']"
              ></v-select>
            </v-col>-->
            <v-col cols="6">
              <label>موضوع القرار</label>
              <v-textarea
                name="input-7-1"
                v-model="formdata.Deci_Subject"
                solo
                auto-grow
                box
                single-line="false"
                clearable
                color="#2196F3"
                :rules="[(v) => !!v || 'يجب ادخال موضوع القرار']"
              ></v-textarea>
            </v-col>

            <v-col cols="6">
              <label>الملاحظات</label>
              <v-textarea
                name="input-7-1"
                v-model="formdata.Notes"
                solo
                auto-grow
                box
                single-line="false"
                clearable
                color="#2196F3"
                :rules="[(v) => !!v || 'يجب ادخال الملاحظات']"
              ></v-textarea>
            </v-col>
          </v-row>

          <!------------------------------------>

          <v-file-input v-model="Files" label="File input" show-size></v-file-input>
          <v-col cols="12">
            <v-btn
              block
              @click.stop="submitEntry()"
              size="x-large"
              style="font-size: 30px"
              color="#2196F3"
            >حقظ القرار</v-btn>
          </v-col>
        </v-card-subtitle>
      </v-form>

      <br />
      <br />
      <br />
    </v-card>
    <br />
    <br />

    <v-footer dark padless>
      <v-card class="flex" flat tile>
        <v-card-title class="primary">
          <h3>تنفيذ _ قسم تقنية المعلومات _ شعبة هندسةالبرامجيات _ هاتف 2555 - 3005</h3>

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
  name: "AboutView",

  data() {
    return {
      formdata: {
        Meet_No: "",
        MeetTypes: [],
        Deci_Type: [],
        DeciDirec: [],
        Deci_TypeId: "",
        Deci_Direc_Name: "",
        Deci_Type_Name: "",
   
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
        Deci_Direc_TypeId: "",
        Detail_CategId: "",
        General_CategId: "",
        File_Path: "",
        Notes: "",
        Meeting_Date: ""
      },

      Files: [],

      File: "",
      error: []
    };
  },
  computed: {
    ...mapGetters(["user", "token"])
  },
  /////////////////////////هذا خاص في عملية اختيار القرار والتوجية عمل اطفاء الانبيت/////////////////////////////
  computed: {
  isDisabled() {
    console.log('Deci_Direc_TypeId:', this.formdata.Deci_Direc_TypeId);
    const disabled = this.formdata.Deci_Direc_TypeId==2;
    console.log('Disabled:', disabled);
    return disabled;
  }


  },
  //////////////////////////////////////////////
  methods: {
    handleDropdownChange() {
      // You can perform additional actions here when the dropdown changes
    },

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
      });
    },
    async submitEntry() {
      this.error = [];
      var isValid = await this.$refs.form.validate();
      if (!isValid) return this.singleNotification("يجب ادخال كامل البيانات");
      if (this.error.length === 0) {
        let loader = this.$loading.show({
          container: this.$refs.newsContainer,
          loader: "spinner",
          transition: "fade",
          color: "#c30734"
        });
        const headers = {
          Authorization: "Bearer " + this.token
        };
        const formData = new FormData();
        formData.append("Meet_No", this.formdata.Meet_No);
        formData.append(" DeciDirec", this.formdata.DeciDirec);
        formData.append("Deci_Direc_Name", this.formdata.Deci_Direc_Name);
        formData.append("Deci_TypeId", this.formdata.Deci_TypeId);
        formData.append("MeetTypes", this.formdata.MeetTypes);
        formData.append("Meet_Type_Name", this.formdata.Meet_Type_Name);
        formData.append("Deci_Type", this.formdata.Deci_Type);
        formData.append("Deci_Type_Name", this.formdata.Deci_Type_Name);
        formData.append("Deci_Direc_TypeId", this.formdata.Deci_Direc_TypeId);
        formData.append("General_Categ_Name", this.formdata.General_Categ_Name);
        formData.append("GenCatg", this.formdata.GenCatg);
        formData.append("Detail_Categ_Name", this.formdata.Detail_Categ_Name);
        formData.append("Doc_no", this.formdata.Doc_no);
        formData.append("Doc_Date", this.formdata.Doc_Date);
        formData.append("Deci_Year", this.formdata.Deci_Year);
        formData.append("Deci_No", this.formdata.Deci_No);
        formData.append("Deci_Subject", this.formdata.Deci_Subject);
        formData.append("Notes", this.formdata.Notes);
        formData.append("Meet_TypeId", this.formdata.Meet_TypeId);
        formData.append("Detail_CategId", this.formdata.Detail_CategId);
        formData.append("General_CategId", this.formdata.General_CategId);
        formData.append(" Meeting_Date", this.formdata.Meeting_Date);
        /* formData.append("User_Name", this.user.User_Name); */
        formData.append("File", this.Files);
        formData.append("DessionOrgs", this.formdata.DessionOrgs);
        axios
          .post("https://localhost:7001/Decisions", formData, {
            headers
          })
          .then(response => {
            if (response.status == 200 || response.status == 201) {
              loader.hide();
              Swal.fire({
                icon: "success",
                title: "تم حفظ القرار بنجاح",
                showConfirmButton: true
              }).then(() => {
                this.$router.push("/");
              });
            }
          })
          .catch(err => {
            loader.hide();

            if (err.response.status == 400) {
              this.singleNotification("رقم القرار مكرر !");
              console.log(err);
            }
          });
      }
    },
    DeciDirec() {
      axios.get("https://localhost:7001/DeciDirec").then(response => {
        this.DeciDirec = response.data;
      });
    },

    Deci_Type() {
      axios.get("https://localhost:7001/Deci_Type").then(response => {
        this.Deci_Type = response.data;
      });
    },
    /////////////////////////// خاض جلب بيانات نوع الجلسة///////////////////////
    MeetTypes() {
      axios.get("https://localhost:7001/MeetTypes").then(response => {
        this.MeetTypes = response.data;
      });
    },
    ///////////////////////////////// خاص جلب بيانات التبويب الرئيسي/////////////////////////////
    GenCatg() {
      axios.get("https://localhost:7001/GenCatg").then(response => {
        this.formdata.GenCatg = response.data;
      });
    },
    //////////////////////////////جلب بيانات التبويب الفرعي/////////////////////////
    DetailCatg() {
      axios.get("https://localhost:7001/DetailCatg").then(response => {
        this.formdata.DetailCatg = response.data;
      });
    },
    //////////////////////عمل فكشن ثانية خاصة لغرض عملية توحيد النبويب الرئيسي مف الخيارات الخاصة بالتبويب الفرعي sub_cat_id خاص بالربط بين النيويب الرئيسي مع الفرعي عن طريق الايدي//////////////////////////////
    DetailSubCatg(sub_cat_id) {
      axios
        .get(`https://localhost:7001/DetailCatg/${sub_cat_id}`)
        .then(response => {
          this.formdata.DetailCatg = response.data;
        });
    }
    ///////////////////////////////////////خاص في جلي الجهات التي يتم ارسال القرارلها//////////////////////////
    /*  getorg() {
      axios.get("https://localhost:7001/Org").then(response => {
        this.orgs = response.data;
      });
    }, */
  },

  mounted() {
    this.MeetTypes();
    this.GenCatg();
    this.DetailCatg();
    this.Deci_Type();
    this.DeciDirec();
  }
};
</script>
