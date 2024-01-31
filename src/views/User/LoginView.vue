<template>
  <div>
    <v-card class="mx-auto" max-width="700" style="margin-top: 80px;" elevation="24">
      <v-img src="@/assets/img106.jpg" height="300px" cover></v-img>

      <v-card-title>
        تسجيل الدخول
      </v-card-title>
      <form ref="form" @submit.prevent="login()">
        <v-card-subtitle>

          <v-col cols="12">
            <v-text-field v-model="login.username" solo label="اسم المستخدم" clearable></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="login.password" solo label="كلمة المرور" clearable></v-text-field>
          </v-col>
        </v-card-subtitle>

        <v-row justify="center" align="center">
          <v-col cols="12" sm="6" md="4">
            <v-btn block type="submit" @click="login" rounded="xl" size="x-large" style="font-size: 20px;"
              color="#2196F3">تسجيل دخول</v-btn>

          </v-col>
        </v-row>

      </form>

      <br />

    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'LoginView',
  data() {
    return {
      login: {
        username: null,
        password: null
      }
    };
  },
  computed: {
    ...mapGetters(["token"]),
  },
  methods: {
    ...mapActions(["setUserAction", "setTokenAction", "setRolesAction"]),
    Login() {
      axios
        .post("https://localhost:7001/Auth/login",{
          username: this.login.username,
          password: this.login.password
        })
        .then(response => {
          if(response.status == 200){
            this.setUserAction(response.data.groupedRoles)
            this.setTokenAction(response.data.token)
            this.setRolesAction(response.data.groupedRoles[0].roleName)

            this.$router.push("/HomeView");
          }
        }).catch((err) => {
          console.log(err);
        })
    }
  },
  created() {
    if (this.token) {
      this.$router.push({
        name: "HomeView"
      });
    }
  }
}
</script>

<style></style>