<template>
  <div>
    <div id="test-print">
  <v-img src="@/assets/img106.jpg" height="300px" cover></v-img>
  <v-toolbar-title class="h1">واجهة ادخال اجراءات القرارات</v-toolbar-title>
    </div>
  <div id="printable-content" >
  <v-row class="ma-2">
    
    
  
    <v-col cols="12" ref="saveDes">
       
      <v-row style="direction: ltr;">
      <v-col
      class="d-flex align-center"
      cols="6"
      sm="2"
    >
        <v-btn
        class="text-white flex-grow-1 text-none"
              color="blue-lighten-5"
              rounded

              size="large"
              elevation="24"
              @click="printContent()"
              > <span class="material-icons blue-color"> print</span></v-btn
            >
  </v-col>

    </v-row>
  
    <br/>
   
      <v-data-table
        :headers="headers"
        :items="item"
        elevation="24"
        :search="search"
        :loading="loading"
        loading-text="انتظر كثيرا"
        :items-per-page="20"
        class="elevation"
        :item-class="itemRowBackground"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-col cols="6" sm="6" md="4">
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label=" ابحث   "
      ></v-text-field>
    </v-col>
            
            <v-divider class="mx-6" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="800px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="cyan"
                  rounded
                  dark
                  class="mx-4"
                 
                 to="/Follow_Org"

                >
                 ادخال جهات خاصة بالاجراء
                </v-btn>
                <v-btn
                  color="primary"
                  rounded
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
                          :items="Decision"
                          label=" ادخل رقم القرار "
                          item-text="Deci_No"
                          item-value="Id"
                          v-model="editedItem.DecisionId"
                        ></v-select>
                      </v-col>
                      <v-col sm="6"
                        ><v-select
                          :items="Book_Type"
                          label=" نوع الكتاب "
                          item-text="Book_Type_Name"
                          item-value="Id"
                          v-model="editedItem.Book_TypeId"
                          solo
                        ></v-select
                      ></v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.Book_No"
                          label="رقم الكتاب   "
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.Process_Subj"
                          label="موضوع الاجراء   "
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="12" sm="20" md="12">
                        <v-text-field
                          v-model="editedItem.Process_Details"
                          label="تفاصيل الاجراء   "
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="60" md="4">
                        <v-menu>
                          <v-text-field
                            :value="editedItem.Book_Date"
                            slot="activator"
                            label="تاريخ الكتاب "
                          ></v-text-field>
                        </v-menu>
                        <v-date-picker
                          color="primary"
                          v-model="editedItem.Book_Date"
                        ></v-date-picker>
                      </v-col>

                      <v-col cols="12" sm="6" md="4">
                        <v-menu>
                          <v-text-field
                            :value="editedItem.Send_Reciev_Date"
                            slot="activator"
                            label="تاريخ الارسال "
                          ></v-text-field>
                        </v-menu>
                        <v-date-picker
                          color="primary"
                          v-model="editedItem.Send_Reciev_Date"
                        ></v-date-picker>
                      </v-col>
                    </v-row>
                    <v-row class="ma-2">
                   
                   
                   
                   
                   
                   
                   
                   
                   
                   

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
                          :items="Suttas"
                          label=" حالة الكتاب  "
                          item-text="Status_Name"
                          item-value="Id"
                          v-model="editedItem.StatusId"
                          solo
                        ></v-select>
                      </v-col>

                      <v-col sm="6"
                        ><v-select
                          :items="Period"
                          label=" المدة   "
                          item-text="DurationText"
                          item-value="Id"
                          v-model="editedItem.DurationId"
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
         
          <v-btn class="primary" elevation="2" @click="showFile(item.Id)"
            ><v-icon>mdi-folder</v-icon>
            عرض
          </v-btn>
     
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="getdata"> Reset </v-btn>
        </template>
        



        <template v-slot:item.process_Details="{item }">
          <div style="width: 200px">
            {{ item.Process_Details }}
          </div>
        </template>



      </v-data-table>
    </v-col>
  </v-row>
</div>
<v-btn
    class="v-btn--bottom v-btn--floating v-btn--fixed v-btn--right primary"
    color="red"
    dark
    fab
    small
    @click="scrollToTop"
  >
    <v-icon dark>mdi-arrow-up</v-icon>
  </v-btn>
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
        text: "التسلسل",
        align: "center",
        sortable: true,
        value: "Id", class: "blue lighten-7  text-h6  white--text"
      },
      { text: "رقم القرار", value: "Decision.Deci_No" , class: "blue lighten-7  text-h6  white--text"},
      { text: "نوع الكتاب", value: "Book_Type.Book_Type_Name" , class: "blue lighten-7  text-h6  white--text"},
      { text: "رقم الكتاب", value: "Book_No", class: "blue lighten-7  text-h6  white--text" },
      { text: "تاريخ الكتاب", value: "Book_Date" , class: "blue lighten-7  text-h6  white--text"},
      { text: "تاريخ الارسال", value: "Send_Reciev_Date" , class: "blue lighten-7  text-h6  white--text"},
      { text: "موضوع لاجراءا", value: "Process_Subj" , class:"blue lighten-7  text-h6  white--text"},
      { text: "تفاصيل لاجراءا", value: "Process_Details" , class: "blue lighten-7  text-h6  white--text"},
      { text: "حالة الكتاب", value: "Status.Status_Name", class: "blue lighten-7  text-h6  white--text"},
      { text: "مدة انجاز ", value: "Duration.DurationText",class:"blue lighten-7  text-h6  white--text" },
     
      { text: "تعديل", value: "edit" , class: "blue lighten-7  text-h6  white--text"},
      { text: "حذف", value: "dlt", class: "blue lighten-7  text-h6  white--text" },
      { text: "تنزيل الكتاب", value: "Process_Path" , class: "blue lighten-7  text-h6  white--text"},
    ],

    editedItem: {
      DecisionId: "",
      Book_TypeId: "",
      Book_No: "",
      Book_Date: "",
      Process_Subj: "",
      Process_Details: "",
      Book_Type_Name: "",
      Id: "",
      Id: "",
      OrgId: "",
      Process_Path: "",
      Status_Name: "",
      StatusId: "",
      DurationId: "",
      Send_Reciev_Date: "",
      Deci_No: "",
      User_Name: "",
      User_Update: "",
    },
    defaultItem: {
      DecisionId: "",
      Book_TypeId: "",
      Book_No: "",
      Book_Date: "",
      Process_Subj: "",
      Process_Details: "",
      Book_Type_Name: "",
      Process_Path: "",
      Id: "",
      Id: "",
      OrgId: "",

      Status_Name: "",
      StatusId: "",
      DurationId: "",
      Send_Reciev_Date: "",
      Deci_No: "",
    },
    item: [],
    Book_Type: [],
    Org: [],
    Period: [],
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
    return this.editedItem.Book_Date
      ? format(this.editedItem.Book_Date, "DD MM YYYY")
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
  scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
 /*  itemRowBackground: function (item)  {
   return item.isLate == 0 ? 'complete-class' : 'pending-class'
}, */

  /* itemRowBackground: function (item) {
    var today = new Date();
    var dueDate = new Date(item.
    
    
Send_Reciev_Date




); // افترضنا أن هناك خاصية تدعى "dueDate" تحتوي على تاريخ الكتاب

    // التحقق مما إذا كانت الفترة قد تجاوزت شهرًا من تاريخ الكتاب
    if (today > dueDate && today.getMonth() - dueDate.getMonth() >= 0) {
      return 'overdue-class'; // افترضنا وجود كلاس اسمه "overdue-class" لتلوين الخلفية باللون الأحمر
    } else {
      // إذا كانت الفترة لم تتجاوز شهرًا من تاريخ الكتاب، نستخدم الشروط الأصلية
      return item.isLate ==0? 'complete-class' : 'pending-class';
    }
  },
 */
 itemRowBackground: function (item) {
      var today = new Date();
      var dueDate = new Date(item.Send_Reciev_Date);
      
      if (today > dueDate && today.getMonth() - dueDate.getMonth() >= 1) {
        return 'overdue-class';
      } else {
        return 'complete-class';
      }
    },



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
      .get("https://localhost:7001/Decision_Processes/" +id, {
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
    this.editedIndex = item.Id;
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
    axios.post("https://localhost:7001/Decision_Processes", { headers });
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
      formData.append("DecisionId", this.editedItem.DecisionId);
      formData.append("Book_TypeId", this.editedItem.Book_TypeId);
      formData.append("Book_No", this.editedItem.Book_No);
      formData.append("Book_Date", this.editedItem.Book_Date);
      formData.append("OrgId", this.editedItem.OrgId);
      formData.append("Process_Subj", this.editedItem.Process_Subj);
      formData.append("Process_Details", this.editedItem.Process_Details);
      formData.append("StatusId", this.editedItem.StatusId);
      formData.append("DurationId", this.editedItem.DurationId);
      formData.append("Send_Reciev_Date", this.editedItem.Send_Reciev_Date);
      formData.append("Deci_No", this.editedItem.Deci_No);
      // formData.append("User_Name", this.editedItem.user_Name);
      formData.append("User_Name", this.user.UserName);
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
    formData.append("decisionId", this.editedItem.DecisionId);
    formData.append("Book_TypeId", this.editedItem.Book_TypeId);
    formData.append("Book_No", this.editedItem.Book_No);
    formData.append("Book_Date", this.editedItem.Book_Date);
    formData.append("OrgId", this.editedItem.OrgId);
    formData.append("Process_Subj", this.editedItem.Process_Subj);
    formData.append("Process_Details", this.editedItem.Process_Details);
    formData.append("StatusId", this.editedItem.StatusId);
    formData.append("DurationId", this.editedItem.DurationId);
    formData.append("Send_Reciev_Date", this.editedItem.Send_Reciev_Date);
    formData.append("Deci_No", this.editedItem.Deci_No);
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
          title: "تم التعديل بنجاح",
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
        this.Book_Type = response.data;
      });
  },
  Decisions() {
    const headers = {
      Authorization: "Bearer " + this.token,
    };
    axios
      .get("https://localhost:7001/Decisions", { headers })
      .then((response) => {
        this.Decision = response.data;
      });
  },

  getgdataorg() {
    const headers = {
      Authorization: "Bearer " + this.token,
    };
    axios.get("https://localhost:7001/Org", { headers }).then((response) => {
      this.Org = response.data;
    });
  },
  getgdatast() {
    const headers = {
      Authorization: "Bearer " + this.token,
    };
    axios
      .get(" https://localhost:7001/Statuses ", { headers })
      .then((response) => {
        this.Suttas = response.data;
      });
  },
  getgdatperiod() {
    const headers = {
      Authorization: "Bearer " + this.token,
    };
    axios
      .get(" https://localhost:7001/Durations ", { headers })
      .then((response) => {
        this.Period = response.data;
      });
  },
     /************ خاصة بالطباعة********** */
  printContent() {
        const printableContent = document.getElementById('printable-content')
        const printWindow = window.open('', '', 'height=1000,width=1000')
        printWindow.document.write(printableContent.innerHTML)
        printWindow.print()
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
.overdue-class {
  background-color: rgb(246, 139, 139); /* لون الخلفية عند التأخر */
}
.complete-class {
  background-color: rgb(152, 237, 112); /* لون الخلفية عند عدم التأخر */
}

</style>
<style scoped>
.h1 {
font-family: "Cairo", sans-serif;
font-size: 30px;
color: blue;
text-align: center;
}
.v-btn {
color: rgb(21, 85, 141);
}
@media print {
 #test-print {
  display: none;
 }
}
</style>