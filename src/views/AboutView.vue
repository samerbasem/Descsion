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
                v-model="formdata.meet_No"
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
                item-text="meet_Type_Name"
                item-value="id"
                v-model="formdata.meet_TypeId"
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
                v-model="formdata.meeting_Date"
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
                item-text="deci_Type_Name"
                item-value="id"
                v-model="formdata.deci_TypeId"
                solo
                :rules="[(v) => !!v || 'يجب ادخال نوع الكتاب']"
              ></v-select>
            </v-col>
          </v-row> 

         
          <v-row>
            <v-col cols="4">
              <label>نوع القرار</label>
              <v-select
                :items="DeciDirec"
                item-text="deci_Direc_Name"
                item-value="id"
                v-model="formdata.deci_Direc_TypeId"
                solo
                :rules="[(v) => !!v || 'يجب ادخال نوع الكتاب']"
              ></v-select>
            </v-col>

            <v-col cols="4">
              <label>التبويب الرئيسي</label>
              <v-select
                :items="formdata.GenCatg"
                item-text="general_Categ_Name"
                item-value="id"
                v-model="formdata.general_CategId"
                solo
                :rules="[(v) => !!v || 'يجب ادخال نوع التبويب الرئيسي']"
                @change="DetailSubCatg(formdata.general_CategId)"
              ></v-select>
            </v-col>
            <v-col cols="4">
              <label>التبويب الفرعي</label>
              <v-select
                :items="formdata.DetailCatg"
                item-text="detail_Categ_Name"
                item-value="id"
                v-model="formdata.detail_CategId"
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
                v-model="formdata.doc_Date"
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
                v-model="formdata.deci_year"
                solo
                clearable
                color="#2196F3"
                :rules="[(v) => !!v || 'يجب ادخال سنة القرار']"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <label>رقم القرار</label>
              <v-text-field
                v-model="formdata.deci_No"
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
            </v-col> -->
            <v-col cols="6">
            <label>موضوع القرار</label>
            <v-textarea
              name="input-7-1"
              v-model="formdata.deci_Subject"
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
              <label> الملاحظات</label>
            <v-textarea
              name="input-7-1"
              v-model="formdata.notes"
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
         

          <v-file-input v-model="files" label="File input" show-size></v-file-input>
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
  name: "AboutView",

  data() {
    return {
      formdata: {
        meet_No: "",
        MeetTypes: [],
        Deci_Type:[],
        DeciDirec:[],
        deci_TypeId:"",
        deci_Direc_Name:"",
        deci_Type_Name:"",
        Org_Name:"",
        meet_Type_Name: "",
        general_Categ_Name: "",
        GenCatg: [],
        DetailCatg: [],
        detail_Categ_Name: "",
        Doc_no: "",
        doc_Date: "",
        deci_year: "",
        deci_No: "",
        deci_Subject: "",
        meet_TypeId: "",
        deci_Direc_TypeId:"",
        detail_CategId: "",
        general_CategId: "",
        file_Path: "",
        notes:"",
        meeting_Date:"",
      },
      
   
         
      files: [],

      file: "",
      error: []
    };
  },
  computed: {
    ...mapGetters(["user", "token"])
  },
  //////////////////////////////////////////////
  methods: {
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
        formData.append("meet_No", this.formdata.meet_No);
        formData.append(" DeciDirec", this.formdata.DeciDirec);
        formData.append("deci_Direc_Name", this.formdata.deci_Direc_Name);
        formData.append("deci_TypeId", this.formdata.deci_TypeId);
        formData.append("MeetTypes", this.formdata.MeetTypes);
        formData.append("meet_Type_Name", this.formdata.meet_Type_Name);
        formData.append("Deci_Type", this.formdata.Deci_Type);
        formData.append("deci_Type_Name", this.formdata.deci_Type_Name);
        formData.append("deci_Direc_TypeId", this.formdata.deci_Direc_TypeId);
        formData.append("general_Categ_Name", this.formdata.general_Categ_Name);
        formData.append("GenCatg", this.formdata.GenCatg);
        formData.append("detail_Categ_Name", this.formdata.detail_Categ_Name);
        formData.append("Doc_no", this.formdata.Doc_no);
        formData.append("doc_Date", this.formdata.doc_Date);
        formData.append("deci_year", this.formdata.deci_year);
        formData.append("deci_No", this.formdata.deci_No);
        formData.append("deci_Subject", this.formdata.deci_Subject);
        formData.append("notes", this.formdata.notes);
        formData.append("meet_TypeId", this.formdata.meet_TypeId);
        formData.append("detail_CategId", this.formdata.detail_CategId);
        formData.append("general_CategId", this.formdata.general_CategId);
        formData.append(" meeting_Date", this.formdata. meeting_Date);
        formData.append("User_Name", this.user.userName);
        formData.append("File", this.files);
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
    },
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
  },
 
};
</script>
