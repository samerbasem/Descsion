<template>
  <div class="editEmployee">
    <v-card class="mx-auto" max-width="1200" style="margin-top: 150px;" elevation="24">
      <v-img src="@/assets/img106.jpg" height="300px" cover></v-img>
      <br />
      <v-card-title style="font-size: xx-large; " color="#01579B">واجهة تعديل حساب المستخدم</v-card-title>
      <br />
      <br />
      <br />

      <v-card-subtitle>
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="fields.firstName"
              solo
              label="الاسم لاول"
              clearable
              color="#2196F3"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="fields.lastName"
              solo
              label="الاسم الثاني"
              clearable
              color="#2196F3"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="fields.emailAddress"
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
              v-model="fields.username"
              solo
              label="اسم المستخدم"
              clearable
              color="#2196F3"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              type="text"
              v-model="fields.password"
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
          <v-btn
            block
            type="submit"
            @click.passive="EditmitEntry()"
            size="x-large"
            style="font-size: 30px;"
            color="#2196F3"
          >حفظ التعديل</v-btn>
        </v-col>
      </v-row>

      <br />
      <br />
      <br />
    </v-card>
    <br />
    <br />
    <v-footer dark padless>
      <v-card class="flex" flat tile>
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
import { mapGetters } from "vuex";
import Swal from "sweetalert2";
export default {
  name: "EditUser",

  data() {
    return {
      id: null,
      fields: {
        firstName: "",
        lastName: "",
        emailAddress: "",
        username: null,
        password: null
      }
    };
  },
  computed: {
    ...mapGetters(["user", "token"])
  },

  methods: {
    EditmitEntry() {
      let loader = this.$loading.show({
        container: this.$refs.newsContainer,
        loader: "spinner",
        transition: "fade",
        color: "#c30734"
      });
          /**********في حالة التعديل بدون تعديل البي دي اف فقط بيانات********** */
      var data = {
        firstName: this.fields.firstName,
        lastName: this.fields.lastName,
        emailAddress: this.fields.emailAddress,
        username: this.fields.username,
        password:this.fields.password
      }
      
      axios
        .put("https://localhost:7001/User/" + this.id, data, {
                                               /**************** يتم اضافتها مع كل اي بي اي  وتوضع بعد id  or data or formdata*********** */
          headers: {
            Authorization: "Bearer " + this.token
          }
        })
        .then(response => {
          if (response.status == 200) {
            loader.hide();
                                                   /******كارت يظهر بعد عملية الحفظ او التعديل****** */
            Swal.fire({
              icon: "success",
              title: "تم التعديل بنجاح",
              showConfirmButton: true
            }).then(() => {
              this.$router.push("/UserView");
            });
          }
        })
        .catch(error => {
          loader.hide();
          console.log(error);
        });
    },

    getData() {
      axios
        .get("https://localhost:7001/User/" + this.id, {
          headers: {
            Authorization: "Bearer " + this.token
          }
        })
        .then(response => {
          if (response.status == 200) {
            this.fields.firstName = response.data.firstName;
            this.fields.lastName = response.data.lastName;
            this.fields.emailAddress = response.data.emailAddress;
            this.fields.username = response.data.username;
            this.fields.password= response.data.password;
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