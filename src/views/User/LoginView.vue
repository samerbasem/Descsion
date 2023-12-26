<template>
  <div>
   
 <v-col  sm="8" md="4">
        <v-btn block rounded
        size="x" 
        style="font-size: 35px; " 
         color="primary" height="70px" 
          elevation="13" to="/RegistesView"> اضافة مستخدم</v-btn>
      </v-col>
      <v-col  sm="8" md="4">
        <v-btn block rounded
        size="x" 
        style="font-size: 35px; " 
         color="primary" height="70px" 
          elevation="13" to="/UserView"> عرض المستخدمين </v-btn>
      </v-col>
<v-card
    class="mx-auto"
    max-width="700"
    style="margin-top: 80px;"
    elevation="24"
  >
    <v-img
      src="@/assets/img106.jpg"
      height="300px"
      cover
    ></v-img>

    <v-card-title>
      تسجيل الدخول
    </v-card-title>
<form ref="form" @submit.prevent="login()">
    <v-card-subtitle>
       
        <v-col cols="12" >
                    <v-text-field v-model="login.username" solo label="اسم المستخدم" clearable></v-text-field>
                  </v-col>
                  <v-col cols="12" >
                    <v-text-field v-model="login.password" solo label="كلمة المرور" clearable></v-text-field>
                  </v-col>
    </v-card-subtitle>

   
      <v-row justify="center" align="center">
      <v-col cols="12" sm="6" md="4">
        <v-btn block type="submit" @click="login" rounded="xl" size="x-large" style="font-size: 20px;" to="/" color="#2196F3"   value="log in">تسجيل دخول</v-btn>
      
      </v-col>

     

    
    </v-row>

     </form> 

      
    <br/>
   
   
  </v-card>
</div>
</template>

<script>
export default {
 name:'LoginView',
 data() {
    return {
      login: {
        username: null,
        password: null
      }
    };
  },
  methods: {
   Login() {
    // var requestBody = new URLSearchParams();
    // requestBody.append("grant_type", "password");
     // requestBody.append("client_id", "AbpPurchases_App");
    requestBody.append("username", this.login.username);
     requestBody.append("password", this.login.password);

      axios
        .post("https://localhost:7001/Auth/login/token",)
        .then(response => {
       
         this.setUserAction(response.data.groupRoles[0]);
           this.setRolesAction(response.data.groupRoles[0].roleName);
           this.setTokenAction(response.data.token);
       loader.hide();
       this.$router.push("home")
        });
    }
  },
 created() {
   if (this.token) {
     this.$router.push({
       name: "HomeView"
      });
    } }
}
</script>

<style>

</style>