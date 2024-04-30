<template>
  <v-card class="mx-auto" max-width="700" elevation="24">
    <v-img src="@/assets/img106.jpg" height="300px" cover></v-img>

    <v-card-title> تسجيل الدخول </v-card-title>
    <form ref="form" @submit.prevent="userLogin">
      <v-card-subtitle>
        <v-col cols="12">
          <v-text-field
            v-model="login.username"
            label="اسم المستخدم"
            clearable
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            type="password"
            v-model="login.password"
            label="كلمة المرور"
            clearable
          ></v-text-field>
        </v-col>
      </v-card-subtitle>

      <v-row justify="center" align="center">
        <v-col cols="12" sm="6" md="4">
          <v-btn
            block
            type="submit"
            size="x-large"
            style="font-size: 20px"
            color="#2196F3"
            >تسجيل دخول</v-btn
          >
        </v-col>
      </v-row>
    </form>

    <br />
  </v-card>
</template>

<script>
import axios from "axios";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "LoginView",
  data() {
    return {
      login: {
        username: null,
        password: null,
      },
    };
  },
  computed: {
    ...mapGetters(["isAuth"]),
  },
  methods: {
    ...mapActions(["setUserAction", "setTokenAction", "setRolesAction"]),
    userLogin() {
      // loading ...
      let loader = this.$loading.show({
        loader: "dots",
        transition: "fade",
        color: "#c30734",
      });
      axios
        .post("https://localhost:7001/Auth/login", {
          username: this.login.username,
          password: this.login.password,
        })
        .then((response) => {
          console.log('qqqqq')
          if (response.status == 200 || response.status == 201) {
            this.setUserAction(response.data.GroupedRoles[0]);
            this.setTokenAction(response.data.Token);
            this.setRolesAction(response.data.GroupedRoles[0].RoleName);
            loader.hide();
            this.$router.push("home");
          }
        })
        .catch((err) => {
          loader.hide();
          console.log(err);
        });
    },
  },
  created() {
    if (this.isAuth) {
      this.$router.push({
        name: "home",
      });
    }
  },
};
</script>
