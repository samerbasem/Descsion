<template>
  <div>
    <v-navigation-drawer v-model="drawer" absolute right temporary>
      <v-list-item>
        <v-list-item-avatar></v-list-item-avatar>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-img src="@/assets/img106.jpg"></v-img>
        <v-list-item v-for="item in items" :key="item.title" link to="/">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
       
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-btn rounded color="#9EB8D9" dark to="/about" style="width: 170px">ادخال قرار جديد</v-btn>
      <br />
      <br />

      <v-btn rounded color="#9EB8D9" dark to="/ViewDesicion" style="width: 170px">عرض القرارات</v-btn>
      <br />
      <br />

      <v-btn
        rounded
        color="#9EB8D9"
        dark
        to="/FollowUpDeesion"
        style="width: 170px"
      >متابعة اجراءات القرارات</v-btn>
      <br />
      <br />
      <v-btn
        rounded
        color="#9EB8D9"
        dark
        to="/ReportView"
        style="width: 170px"
      >تقارير اجراءات القرارات</v-btn>
      <br />
      <br />
      <v-btn
        rounded
        color="#9EB8D9"
        dark
        to="/RegistesView/id"
        style="width: 170px"
      >اضافـــة مستخدم جديد</v-btn>
      <br />
      <br />
      <v-btn rounded color="#9EB8D9" dark to="/RoleView" style="width: 170px">اضافـــة صلاحيات جديدة</v-btn>
      <br />
      <br />
      <v-btn rounded color="#9EB8D9" dark to="/UserView" style="width: 170px">عرض المستخدمين</v-btn>
      <br />
      <br />
      <v-btn
        rounded
        color="#9EB8D9"
        dark
        to="/AddPermation"
        style="width: 170px"
      >اعطاء صلاحيات للمستخدمين</v-btn>
   
    </v-navigation-drawer>
  
    <v-app-bar app clipped-left color="#7C93C3" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <div class="d-flex align-center"></div>

      <v-spacer>
        
      </v-spacer>

      <span class="mr-8">
        مرحبا
        {{ user.userName}}

       
      </span>
      <v-btn  style="left:300px;" color="#7C93C3" height="30px" elevation="10" @click="logoutAction()">تسجيل خروج</v-btn>
      <v-btn text @click="$vuetify.theme.dark = !$vuetify.theme.dark" fab >
        <button
          type="button"
          class="v-icon notranslate mx-2 v-icon--link mdi mdi-theme-light-dark theme--light"
          style
        ></button>
      </v-btn>

     
    </v-app-bar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "NavBar1",
  data: () => ({
    drawer: null,
    items: [
      { title: "الرئيسية", icon: "mdi-view-dashboard" },
      { title: "اتصل بنا", icon: "mdi-forum" }
    ]
  }),
  computed: {
    ...mapGetters(["user", "token", "roles"])
  },
  methods:{
    ...mapActions(["logoutAction"]),
  },
  mounted() {
    this.$vuetify.ltr = true;
  }
};
</script>

<style scoped>
body {
  font-family: "Cairo", sans-serif;
}
span {
  margin-left: 1200px;
}
button{
  margin-left: 200px;
}
</style>
