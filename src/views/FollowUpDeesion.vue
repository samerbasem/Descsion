<template>
  <div>
    <v-img src="@/assets/img106.jpg" height="300px" cover></v-img>

    <v-row class="ma-2">
      <v-col cols="12" sm="6" md="4">
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label=" ابحث   "
        ></v-text-field>
      </v-col>
      <v-col cols="12" ref="saveDes">
        <v-data-table
          :headers="headers"
          :items="item"
          elevation="24"
          :search="search"
          :loading="loading"
          loading-text="انتظر كثيرا"
          sort-by="id"
          :items-per-page="20"
          :class="fixed-width-datatable"
        
         
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>واجهة ادخال اجراءات القرارات</v-toolbar-title>
              <v-divider class="mx-6" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="800px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mx-4"
                    v-bind="attrs"
                    v-on="on"
                    v-if="roles.find((el) => el == 'writer' || el == 'admin')"
                  >
                    ادخال اجراءات جديدة
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="text-h5">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row class="ma-2">
                        <v-col cols="12" sm="6" md="4">
                          <v-select
                            :items="decision"
                            label=" ادخل رقم القرار "
                            item-text="deci_No"
                            item-value="id"
                            v-model="editedItem.decisionId"
                          ></v-select>
                        </v-col>
                        <v-col sm="6"
                          ><v-select
                            :items="book_Type"
                            label=" نوع الكتاب "
                            item-text="book_Type_Name"
                            item-value="id"
                            v-model="editedItem.book_TypeId"
                            solo
                          ></v-select
                        ></v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <div class="multiline-content">
                          <v-text-field
                            v-model="editedItem.book_No"
                            label="رقم الكتاب   "
                          ></v-text-field>
                          </div>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.process_Subj"
                            label="موضوع الاجراء   "
                          ></v-text-field>
                        </v-col>
                      </v-row>

                      <v-row>
                        <v-col cols="12" sm="6" md="6"  >
                         
                           <v-textarea 
                            v-model="editedItem.process_Details"
                            label="تفاصيل الاجراء   "
                          ></v-textarea>
                       
                        </v-col>
                     
                      </v-row>
                      <v-row>
                        <v-col cols="12" sm="60" md="4">
                          <v-menu>
                            <v-text-field
                              :value="editedItem.book_Date"
                              slot="activator"
                              label="تاريخ الكتاب "
                            ></v-text-field>
                          </v-menu>
                          <v-date-picker
                            color="primary"
                            v-model="editedItem.book_Date"
                          ></v-date-picker>
                        </v-col>

                        <v-col cols="12" sm="6" md="4">
                          <v-menu>
                            <v-text-field
                              :value="editedItem.send_Reciev_Date"
                              slot="activator"
                              label="تاريخ الارسال "
                            ></v-text-field>
                          </v-menu>
                          <v-date-picker
                            color="primary"
                            v-model="editedItem.send_Reciev_Date"
                          ></v-date-picker>
                        </v-col>
                      </v-row>
                      <v-row class="ma-2">
                        <v-col sm="6">
                          <v-select
                            v-model="editedItem.orgId"
                            :items="org"
                            label="اختر الدائرة او القسم لطفا "
                            item-text="org_Name"
                            item-value="id"
                          >
                          </v-select>
                        </v-col>

                        <!-- 
                  <a href="file.pdf" download>
   Download PDF
</a> -->

                        <v-col cols="12" sm="6" md="4">
                          <v-file-input
                            type="file"
                            accept="pdf/*"
                            v-model="files"
                            label=" حمل ا لكتاب   "
                          ></v-file-input>
                        </v-col>
                      </v-row>
                      <v-row class="ma-2">
                        <v-col sm="6">
                          <v-select
                            :items="suttas"
                            label=" حالة الكتاب  "
                            item-text="status_Name"
                            item-value="id"
                            v-model="editedItem.statusId"
                            solo
                          ></v-select>
                        </v-col>

                        <v-col sm="6"
                          ><v-select
                            :items="period"
                            label=" المدة   "
                            item-text="durationText"
                            item-value="id"
                            v-model="editedItem.durationId"
                            solo
                          ></v-select
                        ></v-col>
                      </v-row>
                      <v-row> </v-row>

                      <v-row>
                        <v-col cols="12" sm="6" md="4"> </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">
                      Cancel
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="save">
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="text-h5"
                    >هل انت متاكد من الحذف</v-card-title
                  >
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDelete"
                      >Cancel</v-btn
                    >
                    <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                      >OK</v-btn
                    >
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>

          <template v-slot:[`item.edit`]="{ item }">
            <v-btn
              v-if="roles.find((el) => el == 'writer' || el == 'admin')"
              class="success"
              elevation="2"
              @click="edit(item)"
              ><v-icon> mdi-pencil</v-icon>
              {{ editTitle }}
            </v-btn>
          </template>
          <template v-slot:[`item.dlt`]="{ item }">
            <v-btn class="red" elevation="2" @click="deleteItem(item)"   v-if="roles.find((el) => el == 'admin')"
              ><v-icon>mdi-delete</v-icon>
              {{ deleteTitle }}
            </v-btn>
          </template>
          <template v-slot:[`item.Process_Path`]="{ item }">
            <v-btn class="primary" elevation="2" @click="showFile(item.id)"
              ><v-icon>mdi-folder</v-icon>
              عرض
            </v-btn>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="getdata"> Reset </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
import Swal from "sweetalert2";
import format from "date-fns/format";
export default {
  name: "followUpDesion",

  data() {
    return {
      loading: true,
      selectedfile: null,
      dialogDelete: false,
      editValue: false,
      dialog: false,
      headers: [
        {
          align: "center",
          sortable: true,
          value: "Id",
        },
        { text: "رقم القرار", value: "decision.deci_No" },
        { text: "نوع الكتاب", value: "book_Type.book_Type_Name" },
        { text: "رقم الكتاب", value: "book_No" },
        { text: "تاريخ الكتاب", value: "book_Date" },
        { text: "تاريخ الارسال", value: "send_Reciev_Date" },
        { text: "موضوع لاجراءا", value: "process_Subj" },
        { text: "تفاصيل لاجراءا", value: "process_Details" },
        { text: "حالة الكتاب", value: "status.status_Name" },
        { text: "مدة انجاز ", value: "duration.durationText" },
        { text: " الدائرة", value: "org.org_Name" },
        { text: "تعديل", value: "edit" },
        { text: "حذف", value: "dlt" },
        { text: "الملاحظات", value: "btn" },
        { text: "تنزيل الكتاب", value: "Process_Path" },
      ],

      editedItem: {
        decisionId: "",
        book_TypeId: "",
        book_No: "",
        book_Date: "",
        process_Subj: "",
        process_Details: "",
        book_Type_Name: "",
        id: "",
        Id: "",
        orgId: "",
        Process_Path: "",
        status_Name: "",
        statusId: "",
        durationId: "",
        send_Reciev_Date: "",
        deci_No: "",
        user_Name: "",
        User_Update: "",
      },
      defaultItem: {
        decisionId: "",
        book_TypeId: "",
        book_No: "",
        book_Date: "",
        process_Subj: "",
        process_Details: "",
        book_Type_Name: "",
        Process_Path: "",
        id: "",
        Id: "",
        orgId: "",

        status_Name: "",
        statusId: "",
        durationId: "",
        send_Reciev_Date: "",
        deci_No: "",
      },
      item: [],
      book_Type: [],
      org: [],
      period: [],
      suttas: [],
      search: "",
      decision: [],
      files: [],
      file: "",
      error: [],
    };
  },
  computed: {
    editTitle() {
      return "تعديل";
    },
    ...mapGetters(["user", "token", "roles"]),

    deleteTitle() {
      return "حذف";
    },

    formTitle() {
      return this.editedIndex === -1 ? "ادخال اجراء جديد" : "تعديل اجراء  جديد";
    },

    formDate() {
      return this.editedItem.book_Date
        ? format(this.editedItem.book_Date, "DD MM YYYY")
        : "";
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  methods: {
    singleNotification(notifyText) {
      this.$toast.error(notifyText, {
        position: "top-right",
        timeout: 6000,
        closeOnClick: false,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: false,
        closeButton: "button",
        icon: true,
        rtl: true,
      });
    },

    showFile(id) {
      // loading ...
      let loader = this.$loading.show({
        loader: "dots",
        transition: "fade",
        color: "#c30734",
      });
      axios
        .get("https://localhost:7001/Decision_Processes/" + id, {
          headers: {
            Authorization: "Bearer " + this.token,
          },
        })
        .then((response) => {
          if (response.status == 200) {
            var base64 = response.data.bookinfo.pdfBase64.trim();
            var formatType = "data:application/pdf;base64," + base64;
            fetch(formatType)
              .then((res) => res.blob())
              .then((blob) => {
                //---loading-overlay---
                loader.hide();
                const data = URL.createObjectURL(blob);
                var link = document.createElement("a");
                link.href = data;
                link.target = "_blank";
                link.click();
                window.URL.revokeObjectURL(blob);
              });
          }
        })
        .catch((error) => {
          //---loading-overlay---
          loader.hide();
        });
    },
    filter() {
      axios.get("" + this.selected).then((response) => {
        this.item = response.data;
      });
    },

    edit(item) {
      this.editValue = true;
      this.editedIndex = item.id;
      this.editedItem = { ...item };
      this.dialog = true;
    },
    onfileselected(event) {
      this.selectedfile = event.target.files(0);
    },

    upload() {
      const headers = {
        Authorization: "Bearer " + this.token,
      };
      axios.post("https://localhost:7001/Decision_Processes", { header });
    },
    deleteItem(item) {
      this.editedIndex = item.id;
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      axios
        .delete("https://localhost:7001/Decision_Processes" + this.editedIndex)
        .then(function (response) {
          if (response.status == 204) {
            alert("تم الحذف بنجاح");
          }

          this.getdata();
        });
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    async save() {
      this.loading = true;

      if (this.editValue) {
        this.update();
      } else {
        const headers = {
          Authorization: "Bearer " + this.token,
        };
        const formData = new FormData();
        formData.append("decisionId", this.editedItem.decisionId);
        formData.append("Book_TypeId", this.editedItem.book_TypeId);
        formData.append("Book_No", this.editedItem.book_No);
        formData.append("Book_Date", this.editedItem.book_Date);
        formData.append("OrgId", this.editedItem.orgId);
        formData.append("Process_Subj", this.editedItem.process_Subj);
        formData.append("Process_Details", this.editedItem.process_Details);
        formData.append("StatusId", this.editedItem.statusId);
        formData.append("DurationId", this.editedItem.durationId);
        formData.append("Send_Reciev_Date", this.editedItem.send_Reciev_Date);
        formData.append("deci_No", this.editedItem.deci_No);
        // formData.append("User_Name", this.editedItem.user_Name);
        formData.append("User_Name", this.user.userName);
        formData.append(" Process_Path", this.editedItem.Process_Path);
        formData.append("File", this.files);

        await axios
          .post("https://localhost:7001/Decision_Processes", formData, {
            headers,
          })
          .then((response) => {
            if (response.status == 200 || response.status == 201) {
              //  loader.hide();
              Swal.fire({
                icon: "success",
                title: "تم حفظ القرار بنجاح",
                showConfirmButton: true,
              }).then(() => {
                // this.$router.push("/");
              });
              this.dialog = false;
              this.loading = false;
              this.getdata();
            }
          })
          .catch((err) => {
            if (err.response.status == 400) {
              this.singleNotification("رقم القيد مكرر !");
            }
          });
      }
      loader.hide();
    },
    async update() {
      this.loading = true;
      const headers = {
        Authorization: "Bearer " + this.token,
      };
      const formData = new FormData();
      formData.append("decisionId", this.editedItem.decisionId);
      formData.append("Book_TypeId", this.editedItem.book_TypeId);
      formData.append("Book_No", this.editedItem.book_No);
      formData.append("Book_Date", this.editedItem.book_Date);
      formData.append("OrgId", this.editedItem.orgId);
      formData.append("Process_Subj", this.editedItem.process_Subj);
      formData.append("Process_Details", this.editedItem.process_Details);
      formData.append("StatusId", this.editedItem.statusId);
      formData.append("DurationId", this.editedItem.durationId);
      formData.append("Send_Reciev_Date", this.editedItem.send_Reciev_Date);
      formData.append("deci_No", this.editedItem.deci_No);
      // formData.append("User_Name", this.editedItem.user_Name);

      formData.append("User_Update", this.user.userName);
      formData.append("Entry_Date", this.Entry_Date);

      formData.append(" Process_Path", this.editedItem.Process_Path);
      formData.append("File", this.files);
      await axios
        .put(
          "https://localhost:7001/Decision_Processes/" + this.editedIndex,
          formData,
          { headers }
        )

        .then(function (response) {
          Swal.fire({
            icon: "success",
            title: "تم حفظ القرار بنجاح",
            showConfirmButton: true,
          }).then(() => {
            // this.$router.push("/");
          });
        });
      this.getdata();
      this.dialog = false;
      this.loading = false;
      this.editValue = false;
    },

    getdata() {
      this.loading = true;
      axios
        .get("https://localhost:7001/Decision_Processes", {
          headers: {
            Authorization: "Bearer " + this.token,
          },
        })
        .then((response) => {
          this.item = response.data;
          this.loading = false;
        });
    },

    getgdata() {
      const headers = {
        Authorization: "Bearer " + this.token,
      };
      axios
        .get("https://localhost:7001/BookTypes", { headers })
        .then((response) => {
          this.book_Type = response.data;
        });
    },
    Decisions() {
      const headers = {
        Authorization: "Bearer " + this.token,
      };
      axios
        .get("https://localhost:7001/Decisions", { headers })
        .then((response) => {
          this.decision = response.data;
        });
    },

    getgdataorg() {
      const headers = {
        Authorization: "Bearer " + this.token,
      };
      axios.get("https://localhost:7001/Org", { headers }).then((response) => {
        this.org = response.data;
      });
    },
    getgdatast() {
      const headers = {
        Authorization: "Bearer " + this.token,
      };
      axios
        .get(" https://localhost:7001/Statuses ", { headers })
        .then((response) => {
          this.suttas = response.data;
        });
    },
    getgdatperiod() {
      const headers = {
        Authorization: "Bearer " + this.token,
      };
      axios
        .get(" https://localhost:7001/Durations ", { headers })
        .then((response) => {
          this.period = response.data;
        });
    },
  },

  mounted() {
    console.log(this.user[0]);
    this.getgdata();
    this.getgdata(),
      this.getgdataorg(),
      this.getgdatast(),
      this.getgdatperiod(),
      this.Decisions();
  },

  created() {
    this.getdata();

    this.getgdata(),
      this.getgdataorg(),
      this.getgdatast(),
      this.getgdatperiod(),
      this.Decisions();
  },
};
</script>
<style>

  white-space: pre-line;
  
.fixed-width-datatable tbody tr {
 
  max-width: 10px; /* Adjust the maximum height as needed */
  overflow: hidden;
  text-overflow: ellipsis; /* You can add ellipsis for overflow text */
}


</style>






