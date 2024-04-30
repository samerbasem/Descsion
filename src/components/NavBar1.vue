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

      <v-btn rounded color="#9EB8D9" dark to="/about" style="width: 220px"      v-if="roles.find((el) => el == 'writer' || el == 'admin')">ادخال قرار جديد</v-btn>
      <br />
      <br />
      <v-btn rounded color="#9EB8D9" dark to="/ViewDesicion" style="width: 220px">عرض القرارات</v-btn>

      <br />
      <br />
<!--       <v-btn rounded color="#9EB8D9" dark to="/ViewDesicion1" style="width: 220px">عرض  تقرير القرارات</v-btn> -->


      <v-btn
        rounded
        color="#9EB8D9"
        dark
        to="/FollowUpDeesion"
        style="width: 220px"
      >متابعة اجراءات القرارات</v-btn>
      <br />
      <br />
      <v-btn
        rounded
        color="#9EB8D9"
        dark
        to="/Report"
        style="width: 220px"
      >تقارير اجراءات القرارات</v-btn>
      <br />
      <br />
      <v-btn
    rounded
    color="#9EB8D9"
    dark
    to="/orgs"
    style="width: 220px"
  >عرض الجهات المرسل اليها القرار</v-btn>
  <br />
  <br />
  <v-btn
    rounded
    color="#9EB8D9"
    dark
    to="/Descion_Org"
    style="width: 220px"  v-if="roles.find((el) => el == 'writer' || el == 'admin')"
  >اضافة الجهات المرسل اليها القرار</v-btn>
  <br />
  <br/>
  <v-btn
   rounded
   color="#9EB8D9"
   dark
   to="/Follow_Org"
   style="width: 220px"  v-if="roles.find((el) => el == 'writer' || el == 'admin')"
 >اضافة جهات الاجراءات المرسل اليها القرار</v-btn>
 <br/>
 <br />
 <v-btn
  rounded
  color="#9EB8D9"
  dark
  to="/follow_orgView"
  style="width: 220px"  v-if="roles.find((el) => el == 'writer' || el == 'admin')"
> جراءات الكتب المرسلة للجهات </v-btn>
<br />
<br/>

      <v-btn
        rounded
        color="#9EB8D9"
        dark
        to="/RegistesView/id"
        style="width: 220px"  v-if="roles.find((el) => el == 'admin' )"
      >اضافـــة مستخدم جديد</v-btn>
      <br />
      <br />
      <v-btn rounded color="#9EB8D9" dark to="/RoleView" style="width: 220px"  v-if="roles.find((el) => el == 'admin' )">اضافـــة صلاحيات جديدة</v-btn>
      <br />
      <br />
      <v-btn rounded color="#9EB8D9" dark to="/UserView" style="width: 220px" v-if="roles.find((el) => el == 'admin' )">عرض المستخدمين</v-btn>
      <br />
      <br />
      <v-btn
        rounded
        color="#9EB8D9"
        dark
        to="/AddPermation"
        style="width: 220px" v-if="roles.find((el) => el == 'admin' )"
      >اعطاء صلاحيات للمستخدمين</v-btn>
      <br />
      <br />
    
    
    
    
    
    
    

      <br />
      <br />
    
    
    
    
    
    
    
      <br />
      <br />
    </v-navigation-drawer>

    <v-app-bar app clipped-left color="#7C93C3" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <div class="d-flex align-center"></div>

      <v-spacer></v-spacer>

      <span class="mr-8">
        مرحبا
        {{ user.UserName}}
      </span>
      <v-btn
        style="left:300px;"
        color="#7C93C3"
        height="30px"
        elevation="10"
        @click="logoutAction()"
      >تسجيل خروج</v-btn>
      <v-btn text @click="$vuetify.theme.dark = !$vuetify.theme.dark" fab>
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
  methods: {
    ...mapActions(["logoutAction"])
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
button {
  margin-left: 200px;
}
</style>
