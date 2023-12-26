<template>
  <div class="editEmployee">
    <v-card class="mx-auto" max-width="1200" style="margin-top: 150px;" elevation="24">
      <v-img src="@/assets/img106.jpg" height="300px" cover></v-img>
      <br />
      <v-card-title style="font-size: xx-large; " color="#01579B"> واجهة تعديل حساب المستخدم</v-card-title>
      <br />
      <br />
      <br />

      <v-card-subtitle>
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="formdata.FirstName"
              solo
              label="الاسم لاول"
              clearable
              color="#2196F3"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="formdata.LastName"
              solo
              label="الاسم الثاني"
              clearable
              color="#2196F3"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="formdata.EmailAddress"
              solo
              label="البريد الالكتروني"
              clearable
              color="#2196F3"
            ></v-text-field>
          </v-col>
         
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="formdata.Username"
              solo
              label="اسم المستخدم"
              clearable
              color="#2196F3"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              type="text"
              v-model="formdata.Password"
              solo
              label="كلمة المرور"
              clearable
              color="#2196F3"
            ></v-text-field>
          </v-col>
        </v-row>
        
        
        <v-col cols="12"></v-col>
      </v-card-subtitle>
      <v-row justify="center" align="center">
        <v-col cols="12" sm="6" md="4">
        
          <v-btn block  type="submit" @click.passive="EditmitEntry()" size="x-large"  style="font-size: 30px;" color="#2196F3">حفظ التعديل </v-btn>
          
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
  name: "EditUser",

  data() {
    return {
      formdata: {
        id:null,
        FirstName:"",
        LastName:"",
        EmailAddress:"",
        Username: null,
        Password: null
      }
    };
  },
  methods: {

        EditmitEntry() {
      axios
        .put("https://localhost:7001/User/" + this.id, this.formdata)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
        this.$router.push("/UserView");
    },
   

    getData() {
      axios
        .get("https://localhost:7001/User/" + this.id)
        .then(response => {
          if(response.status == 200){
            this.formdata.FirstName = response.data.firstName
            this.formdata.LastName = response.data.lastName
            this.formdata.EmailAddress = response.data.emailAddress
            this.formdata.Username = response.data.username
            this.formdata.Password= response.data.password

           
          }
          
          //here you must set values to v mode of each one
        });
    }
  },

  mounted() {
    this.id = this.$route.params.id;
    this.getData();
   
  }
};
</script>