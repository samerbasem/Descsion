<template>
  <div class="addEmployee">
    <v-card
      class="mx-auto"
      max-width="1200"
      style="margin-top: 150px"
      elevation="24"
    >
      <v-img src="@/assets/img106.jpg" height="500px" cover></v-img>
      <br />
      <v-card-title style="justify-content: center" color="primary"
        >واجهة ادخال القرارات</v-card-title
      >
      <br />
      <br />
      <br />

      <v-form ref="form" v-model="valid" lazy-validation>
        <v-card-subtitle>
          <v-row justify="center">
            <v-col cols="6">
              <v-text-field
                v-model="formdata.meet_No"
                solo
                label=" رقم الجلسة"
                clearable
                color="#2196F3"
                :rules="[(v) => !!v || 'يجب ادخال رقم الجلسة']"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-select
                :items="MeetTypes"
                label="نوع الجلسة"
                item-text="meet_Type_Name"
                item-value="id"
                v-model="formdata.meet_TypeId"
                solo
                :rules="[(v) => !!v || 'يجب ادخال نوع الجلسة']"
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
                :rules="[validateNotEmpty, validateDuplicate]"
              
              
               @change="DetailSubCatg(formdata.general_CategId)"    
              ></v-select>
              <v-alert v-if="validationError" type="error">{{ validationError }}</v-alert>
            </v-col>
            <v-col cols="6">
              <v-select
                :items="formdata.DetailCatg"
                label="التبويب الفرعي"
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
              <v-text-field
                v-model="formdata.Doc_no"
                solo
                label=" رقم الكتاب"
                clearable
                color="#2196F3"
                :rules="[(v) => !!v || 'يجب ادخال رقم الكتاب']"
                
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
                :rules="[(v) => !!v || 'يجب ادخال تاريخ الكتاب']"
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
                :rules="[(v) => !!v || 'يجب ادخال سنة القرار']"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="formdata.deci_No"
                solo
                label=" رقم القرار"
                clearable
                color="#2196F3"
                :rules="[validateNotEmpty, validateDuplicate]"
              
              ></v-text-field>
              <v-alert v-if="validationError" type="error">{{ validationError }}</v-alert>
        
            </v-col>
          </v-row>
          <v-col cols="12">
            <v-text-field
              v-model="formdata.deci_Subject"
              solo
              label=" موضوع القرار"
              clearable
              color="#2196F3"
              :rules="[(v) => !!v || 'يجب ادخال موضوع القرار']"
            ></v-text-field>
          </v-col>
          <v-file-input
            v-model="files"
            label="File input"
            show-size
          >
  </v-file-input>
          <v-col cols="12">
            <v-btn
              block
              @click.stop="submitEntry()"
              size="x-large"
              style="font-size: 30px"
              color="#2196F3"
              >ارسال</v-btn
            >
          </v-col>
        </v-card-subtitle>
      </v-form>

      <br />
      <br />
      <br />
    </v-card>
    <br />
    <br />

    <v-footer dark padless >
      <v-card class="flex" flat tile>
        <v-card-title class="primary">
          <strong class="subheading"
            >Get connected with us on social networks!</strong
          >

          <v-spacer></v-spacer>
        </v-card-title>
      </v-card>
    </v-footer>
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
        MeetTypes: [],
        meet_Type_Name: "",
        general_Categ_Name: "",
        GenCatg: [],
        DetailCatg: [],
        detail_Categ_Name: "",
        Doc_no:"",
        doc_Date: "",
        deci_year: "",
        deci_No: "",
        deci_Subject: "",
        meet_TypeId: "",
        detail_CategId: "",
        general_CategId: "",
        file_Path:""
       
      },
      files: [],
      numbers:[],
     
      validationError: '',
      file:"",
      error: [],
    };
  },
  //////////////////////////////////////////////
  methods: {
 
    validateNotEmpty(value) {
      return !!value || 'لايجوز ترك الحقل فارغ ';
    },
    validateDuplicate(value) {
      this.validationError = ''; // Reset previous validation error
      const isDuplicate = this.numbers.includes(Number(value)) && value !== '';
      if (isDuplicate) {
        this.validationError = 'انتبه رقم القرار مكرر';
      }
      return this.validationError || true; // Return true if validation passes, otherwise return the error message
    },
    watch: {
      deci_No(newNumber) {
      // Add the number to the array when the input changes
      this.numbers.push(Number(newNumber));
    }
  },
 
///////
    async submitEntry() {
      this.error = [];
      var isValid = await this.$refs.form.validate();
      if (!isValid) return alert("يجب ادخال كامل البيانات");
      const formData = new FormData();
        formData.append("meet_No",this.formdata.meet_No)
        formData.append("MeetTypes",this.formdata.MeetTypes)
        formData.append("meet_Type_Name",this.formdata.meet_Type_Name)
        formData.append("general_Categ_Name",this.formdata.general_Categ_Name)
        formData.append("GenCatg",this.formdata.GenCatg)
        formData.append("detail_Categ_Name",this.formdata.detail_Categ_Name)
        formData.append("Doc_no",this.formdata.Doc_no)
        formData.append("doc_Date",this.formdata.doc_Date)
        formData.append("deci_year",this.formdata.deci_year)
        formData.append("deci_No",this.formdata.deci_No)
        formData.append("deci_Subject",this.formdata.deci_Subject)
        formData.append("meet_TypeId",this.formdata.meet_TypeId)
        formData.append("detail_CategId",this.formdata.detail_CategId)
        formData.append("general_CategId",this.formdata.general_CategId)
        formData.append("File", this.files);
        
        if (this.error.length === 0) {
        axios
          .post("https://localhost:7001/Decisions", formData)
          .then((response) => {
            if(response.status == 200 || response.status == 201){
             
                this.$router.push("/");
            }
              })
            
         
        } 
      },
    /////////////////////////// خاض جلب بيانات نوع الجلسة///////////////////////
    MeetTypes() {
      axios.get("https://localhost:7001/MeetTypes").then((response) => {
        this.MeetTypes = response.data;
      });
    },
    ///////////////////////////////// خاص جلب بيانات التبويب الرئيسي/////////////////////////////
    GenCatg() {
      axios.get("https://localhost:7001/GenCatg").then((response) => {
        this.formdata.GenCatg = response.data;
      });
    },
    //////////////////////////////جلب بيانات التبويب الفرعي/////////////////////////
    DetailCatg() {
      axios.get("https://localhost:7001/DetailCatg").then((response) => {
        this.formdata.DetailCatg = response.data;
      });
    },
             //////////////////////عمل فكشن ثانية خاصة لغرض عملية توحيد النبويب الرئيسي مف الخيارات الخاصة بالتبويب الفرعي sub_cat_id خاص بالربط بين النيويب الرئيسي مع الفرعي عن طريق الايدي//////////////////////////////
    DetailSubCatg(sub_cat_id) {
      axios.get(`https://localhost:7001/DetailCatg/${sub_cat_id}`).then((response) => {
        this.formdata.DetailCatg = response.data;
      });
    },
  },

  mounted() {
    this.MeetTypes();
    this.GenCatg();
    this.DetailCatg();
  },
};
</script>
