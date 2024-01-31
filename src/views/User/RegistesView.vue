<template>

<v-card
    class="mx-auto"
    max-width="700"
    style="margin-top: 300px;"
    elevation="24"
  >
    <v-img
      src="@/assets/img106.jpg"
      height="300px"
      cover
    ></v-img>

    <v-card-title>
      اضافة مستخدم جديد
    </v-card-title>

     <v-form ref="form" v-model="valid" lazy-validation>
        <v-card-subtitle>
          <v-row justify="center">
            <v-col cols="6">
              <v-text-field
                v-model="formdata.FirstName"
                solo
                label="الاسم الاول"
                clearable
                color="#2196F3"
                :rules="[(v) => !!v || 'يجب ادخال الاسم الاول']"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="formdata.LastName"
                solo
                label="الاسم الثاني" 
                clearable
                color="#2196F3"
                :rules="[(v) => !!v || 'يجب ادخال الاسم الثاني']"
              ></v-text-field>
            </v-col>

          </v-row>
        
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="formdata.Username"
                solo
                label="اسم المستخدم"
                clearable
                color="#2196F3"
                :rules="[(v) => !!v || 'يجب ادخال اسم المستخدم']"
              ></v-text-field>
            </v-col>
          
          </v-row>
          <v-row>
           
            <v-col cols="12">
              <v-text-field
                v-model="formdata.EmailAddress"
                solo
                label="الايميل"
                clearable
                color="#2196F3"
                :rules="[(v) => !!v || 'يجب ادخال البريد الالكتروني']"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-col cols="12">
            <v-text-field
              v-model="formdata.Password"
              solo
              label="كلمة المرور" 
              clearable
              color="#2196F3"
              :rules="[(v) => !!v || 'يجب ادخال كلمة المرور']"
            ></v-text-field>
          </v-col>
   
          <v-col cols="12">
            <v-btn
              block
              @click.stop="submitEntry()"
              size="x-large"
              style="font-size: 30px"
              color="#2196F3"
              >اضافة مستخدم</v-btn
            >
          </v-col>
        </v-card-subtitle>
      </v-form>

      
    <br/>
   
   
  </v-card>
 
</template>

<script>
  import Swal from "sweetalert2";
import axios from "axios";
export default {
 name:'RegistesView',
 data() {
    return {
      formdata: {
        FirstName:"",
        LastName:"",
        EmailAddress:"",
        Username: null,
        Password: null
      }
    };
  },
 methods: {
  async submitEntry() {
      this.error = [];
      var isValid = await this.$refs.form.validate();

      if (!isValid) return alert("يجب ادخال كامل البيانات");

      // for (const item in this.formdata) {
      //   if (this.formdata[item] === "" || this.formdata[item].length === 0) {
      //     this.error.push(item);
      //     // ;
      //   }
      // }

      if (this.error.length === 0) {
        axios
          .post("https://localhost:7001/User", this.formdata)
          .then((response) => {

            if (response.status == 200 || response.status == 201) {
   //  loader.hide();
   Swal.fire({
     icon: "success",
     title: "تمت اضافة المستخدم بنجاح",
     showConfirmButton: true,
   }).then(() => {
     // this.$router.push("/");
   });
    this.$router.push("/UserView");
 
    
 
    
 
 }
})
 .catch((err) => {
   if (err.response.status == 400) {
     this.singleNotification(" اسم المستخدم مكرر");
   }
 });




            
            console.log(response);
         
         
        // .then((Response) =>{

        //  });

        /*  alert("تم ادخال البيانات بنجاح")
     
      console.warn(this.error)
    } */
      }
    },
 },
}

</script>

<style>

</style>