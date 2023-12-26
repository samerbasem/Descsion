<template>
  <div>
    <v-app-bar color="blue lighten-13" dark>
      <v-toolbar-title style="color: rgb(227, 223, 235); font-size: 35px">
        نظام القرارات
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-col sm="8" md="2">
        <v-btn
          block
          rounded
          size="x"
          style="font-size: 25px"
          color="primary"
          height="50px"
          elevation="13"
          to="/LoginView"
        >
          تسجيل خروج</v-btn
        >
      </v-col>
    </v-app-bar>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
