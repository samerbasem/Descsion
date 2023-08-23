<template>
  <v-card
    class="mx-auto"
    max-width="1200"
    style="margin-top: 300px;"
    elevation="24"
    value="rounded-xl"
    
  >
    <v-img src="@/assets/img106.jpg" height="300px" cover></v-img>
    <br />
    <v-card-title style="font-size: xx-large; " color="#01579B">واجهة ادخال القرارات</v-card-title>
    <br />
    <br />
    <br />
  
    <v-card-subtitle >
      <v-row>
      <v-col cols="6">
        <v-text-field v-model="message2" solo label=" رقم القرار " clearable  color="#2196F3"></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-autocomplete label="نوع الجلسة" :items="['اعتيادية', 'استثنائية']" color="#2196F3"></v-autocomplete>
      </v-col>
      </v-row>
      <v-row>
      <v-col cols="6">
        <v-autocomplete
          label="التبويب الرئيسي"
          :items="['التشريعات والقوانين', 'القرارات والاوامروالتنسيبات']"
          color="#2196F3"
        ></v-autocomplete>
      </v-col>
      <v-col cols="6">
        <v-autocomplete
          label="التبويب الفرعي"
          :items="['قوانين الاتفاقات', 'تشريعات قوانين الوزارات']"
          color="#2196F3"
        ></v-autocomplete>
      </v-col>
    </v-row>
      <v-row>
        <v-col cols="6">
          <v-text-field v-model="message2" solo label=" رقم الكتاب" clearable color="#2196F3"></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field type="date" v-model="message2" solo label=" تاريخ الكتاب" clearable color="#2196F3"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-text-field v-model="message2" solo label=" سنة القرار" clearable color="#2196F3"></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field v-model="message2" solo label=" رقم القرار" clearable color="#2196F3"></v-text-field>
        </v-col>
      </v-row>
      <v-col cols="12">
        <v-text-field v-model="message2" solo label=" موضوع القرار" clearable  color="#2196F3"></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-file-input v-model="message2" label="تحميل القرار" color="#2196F3"></v-file-input>
      </v-col>
    </v-card-subtitle>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="6" md="4">
        <v-btn block rounded="xl" size="x-large" style="font-size: 30px;" color="#2196F3">ارسال</v-btn>
      </v-col>

     

    
    </v-row>

    <br />
    <br />
    <br />
  </v-card>
</template>

<script>
export default {
  name: "AboutView"
};
</script>

<style>
</style>
