<template>
  <div>
   
    <v-img src="@/assets/img106.jpg" height="300px" cover></v-img>
   
    <v-select
    v-model="selected"
    :items="dec"
    label="اختر رقم القرار لطفا "
    item-text="deci_No"
    item-value="id"
    @change="filter()"
  ></v-select>
  <v-row>

<v-col cols="12">
  <v-data-table
    :headers="headers"
    :items="item"
    

    :loading="loading"
    loading-text="انتظر كثيرا"
    sort-by="id"
    :items-per-page="20"
    class="elevation-5"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>واجهة ادخال اجراءات القرارات</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mx-4" v-bind="attrs" v-on="on">
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
                  <v-col sm="6"
                    ><v-select :items="book_Type" 
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
                    <v-text-field
                      v-model="editedItem.book_No"
                      label="رقم الكتاب   "
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.book_Date"
                      label="تاريخ الكتاب "
                      type="date"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.send_Reciev_Date"
                      label="تاريخ الارسال "
                      type="date"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row class="ma-2">
                  <v-col sm="6">
                  <v-select
                  v-model="editedItem.decisionId"
    :items="dec"
    label="اختر الدائرة او القسم لطفا "
    item-text="deci_No"
    item-value="id"
    
  >
  </v-select>
                  </v-col>

                
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-file-input  type="file"  
                      v-model="editedItem.Process_Path" 
                      label=" حمل ا لكتاب dd  "

                    ></v-file-input>
                  </v-col>
                </v-row>
                <v-row class="ma-2">
                  <v-col sm="6">
                    <v-select :items="suttas" 
                      label=" حالة الكتاب  "
                     item-text="status_Name"
                     item-value="id"
                     v-model="editedItem.statusId"
                      solo
                    ></v-select >
                  </v-col>
                </v-row> 
                <v-row class="ma-2">
                  <v-col sm="6"
                    ><v-select :items="period" 
                      label=" المدة   "
                     item-text="durationText"
                     item-value="id"
                     v-model="editedItem.durationId"
                      solo
                    ></v-select
                  ></v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.process_Subj"
                      label="موضوع الاجراء   "

                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.user_Name"
                      label="اسم المستخدم"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.addDeci_Process "
                      label="addDeci Process "
                    ></v-text-field>
                  </v-col>
                </v-row>
                  <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.process_Details"
                      label="تفاصيل الاجراء   "
                    ></v-text-field>
                  </v-col>
                </v-row>
             
                <v-row>
                  <v-col cols="12" sm="6" md="4"> </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
              <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">هل انت متاكد من الحذف</v-card-title>
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
      <v-btn class="success" elevation="2" @click="edit(item)"
        ><v-icon> mdi-pencil</v-icon>
        {{ editTitle }}
      </v-btn>
    </template>
    <template v-slot:[`item.dlt`]="{ item }">
      <v-btn class="red" elevation="2" @click="deleteItem(item)"
        ><v-icon>mdi-delete</v-icon>
        {{ deleteTitle }}
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
import axios from "axios";
export default {
  name: "advance",
 
  data() {

    return {
      selected:null,
      loading: true,
      selectedfile:null,
      dialogDelete: false,
      editValue:false,
      dialog: false,
      headers: [
        {
          align: "center",
          sortable: true,
          value: "Id",
        },
      
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
        { text: "اسم المستخدم", value: "user_Name" },
        
        { text: "تنزيل الكتاب", value: "Process_Path" },
      ],
    
      editedItem: {
        decisionId:"",
        book_TypeId:"",
        book_No: "",
        book_Date:"",
        process_Subj: "",
        process_Details:"",
        book_Type_Name:"",
        id:"",
        orgId:"",
        Process_Path:"",
        status_Name:"",
        statusId:"",
        durationId:"",
        send_Reciev_Date:"",
        deci_No:""

      
        
      },
      defaultItem: {
        DecisionId:"",
        book_TypeId:"",
        book_No: "",
        book_Date:"",
        process_Subj: "",
        process_Details:"",
        book_Type_Name:"",
        user_Name:"",
        addDeci_Process:1,
      Id:"",
      orgId:"",
        Process_Path:"",
        status_Name:"",
        statusId:"",
        durationId:"",
        send_Reciev_Date:"",
        deci_No:""
      },
      item:[],
      book_Type:[],
      org:[],
      period:[],
      suttas:[],
    dec:[]
    };
  },
  computed: {
    editTitle() {
      return "تعديل";
    },
    deleteTitle() {
      return "حذف";
    },

    formTitle() {
      return this.editedIndex === -1 ? "ادخال اجراء جديد" : "تعديل اجراء  جديد";
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();  
    }
  },
  methods: {

    filter(){
        console.log(this.selected)
      axios
        .get("https://localhost:7001/Decision_Processes"+this.selected)
        .then((response) => {
         
          console.log(response)
          console.log("aaaaa")
          this.dec=response.data;
        });
       },



    edit(item) {
      this.editValue = true;
      this.editedIndex = item.id;
      this.editedItem = {...item};
      this.dialog = true;
      console.log(this.editedIndex);
    },
    onfileselected(event){ console.log(event)

this.selectedfile=event.target.files(0)

    },



    
    upload(){

axios.post('https://localhost:7001/Decision_Processes')

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
          console.log(response);
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

        await axios.post("https://localhost:7001/Decision_Processes", this.editedItem)

      
        this.getdata();
        this.dialog = false;
        this.loading = false;
        
      }
    },
    async update() {
      this.loading = true;

      await axios.put( "https://localhost:7001/Decision_Processes/" +this.editedIndex, this.editedItem
        )
        .then(function (response) {
          console.log(response);
        });
      this.getdata();
      this.dialog = false;
      this.loading = false;
      this.editValue = false;
    },




    getdata() {
      this.loading = true;
      axios
        .get("https://localhost:7001/Decision_Processes", {})
        .then((response) => {
          this.item = response.data;
          this.loading = false;
          console.log(this.item);
        });
      },
     
      
        getgdata(){axios
        .get('https://localhost:7001/BookTypes')
        .then((response) => {
          this.book_Type=response.data;
        });
        }, 
       
        getgdataorg(){axios
        .get('https://localhost:7001/Org')
        .then((response) => {
          this.org=response.data;
        });
        },  
        getgdatast(){axios
        .get(' https://localhost:7001/Statuses ')
        .then((response) => {
          this.suttas=response.data;
        });
        },  
        getgdatperiod(){axios
        .get(' https://localhost:7001/Durations ')
        .then((response) => {
          this.period=response.data;
        });
        },  
    },
  

mounted(){
  this.getgdata()

},

  created() {
   this.getdata()


    this.getgdata(),
    this.getgdataorg(),
    this.getgdatast(),
    this.getgdatperiod()
  },
};
</script>
