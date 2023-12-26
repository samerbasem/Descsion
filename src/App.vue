<template>
  <v-app>
    <NavBar1 v-if="isAuth" />
    <router-view />
  </v-app>
</template>
<script>
import { mapGetters } from "vuex";
import NavBar1 from "./components/NavBar1.vue";
export default {
  name: "app",
  components: {
    NavBar1,
  },
  computed: {
    ...mapGetters(["isAuth"]),
  },
  mounted() {
    this.$vuetify.rtl = true;
  },
};
</script>
<style lang="scss">
#app {
  font-family: 'Cairo', sans-serif;
 background-color: #EEF5FF
;
}



</style>
