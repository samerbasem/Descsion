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
<v-col cols="12">
  <v-data-table
    :headers="headers"
    :items="item"
    :search="search"

    :loading="loading"
    loading-text="انتظر كثيرا"
    sort-by="id"
    :items-per-page="20"
    class="elevation-5"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>واجهة ادخال واعطاء الصلاحيات</v-toolbar-title>
        <v-divider class="mx-6" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="800px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mx-4" v-bind="attrs" v-on="on">
            ادخال صلاحية جديدة
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row class="ma-2">
               
                 <v-col cols="12">
          <v-select
            :items="users"
            item-text="username"
            item-value="id"
            density="أختر اسم المستخدم"
            label="أختر اسم المستخدم"
            v-model="userrole.userId"
          ></v-select>
        </v-col>
        <v-col cols="12">
          <v-combobox
            v-model="userrole.roleId"
            item-text="name"
            item-value="id"
            :items="role"
            label="اختر الصلاحية"
            multiple
            chips
          ></v-combobox>
        </v-col>
                                  
                                
                             
                </v-row>
               
                  
                            
                                                         
                            
               
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-3" text @click="close">خروج </v-btn>
              <v-btn color="blue darken-3" text @click="save"> حفظ </v-btn>
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
    <!-- <template v-slot:[`item.dlt`]="{ item }">
      <v-btn class="red" elevation="2" @click="deleteItem(item)"
        ><v-icon>mdi-delete</v-icon>
        {{ deleteTitle }}
      </v-btn>
    </template> -->
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
        { text: "اسم المستخدم", value: "userName" },
        { text: "الصلاحيات", value: "roleName" },
        { text: "تعديل", value: "edit" },
     
      ],
    
      userrole: {
        id: "",
        username: "",
        userId: "",
        roleId: "",
        name: ""
      },

    
      
      select: "",
      item: [],
      users: [],
      role: []
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
      val || this.closeDelete();  }},
    

  methods: {
 /*    addFiles(){
      const image = e.target.files[0];
                const reader = new FileReader();
                reader.readAsDataURL(image);
                reader.onload = e =>{
                    this.Process_Path = e.target.result;
                    console.log(this.Process_Path)
    } */
  /*   }, */
    filter(){
        console.log(this.selected)
      axios
        .get(""+this.selected)
        .then((response) => {
         
          console.log(response)
       
          this.item=response.data;
        });
       },



    edit(item) {
      this.editValue = true;
      this.editedIndex = item.Id;
      this.userrole = {...item};
      this.dialog = true;
      console.log(this.editedIndex);
    },
    onfileselected(event){ console.log(event)

this.selectedfile=event.target.files(0)

    },



    
    upload(){

axios.post('https://localhost:7001/UserRole')

    },
   /*  deleteItem(item) {
      this.editedIndex = item.id;
      this.userrole = Object.assign({}, item);
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
    }, */

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.userrole = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.userrole = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    async save() {
      this.loading = true;
      if (this.editValue) {
        this.update();
      } else {   
        const formData = new FormData();
        formData.append(" userId",this.userrole.userId)
        formData.append(" roleId",this.userrole.roleId)
       
     
        await axios.post("https://localhost:7001/UserRole", this.userrole
        )
        .then(function (response) {
          console.log(response);
        });
        this.fetchuserrole();
        this.dialog = false;
        this.loading = false;
        
      }
    },
    async update() {
      this.loading = true;

      await axios.put( "https://localhost:7001/UserRole/" +this.editedIndex,this.userrole
        )
        .then(function (response) {
          console.log(response);
        });
      this.fetchuserrole();
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
     
      fetchuser() {
      axios.get("https://localhost:7001/User").then(resuit => {
        this.users = resuit.data;
        this.loading = false;
      });
    },
    fetchrole() {
      axios.get("https://localhost:7001/Roles").then(resuit => {
        this.role = resuit.data;
        this.loading = false;
        console.log(this.items);
      });
    },
    fetchuserrole() {
      axios.get("https://localhost:7001/UserRole")
          .then((resuit) => {
            this.item= resuit.data;
            this.loading = false;
          });
    /*   axios.get("https://localhost:7001/UserRole").then(resuit => {
        this.items = resuit.data;6
        this.loading = false;
        console.log(this.items);
      }); */
    },
       
      
     
    },
  

mounted(){
   this.fetchuser();
    this.fetchrole();
    this.fetchuserrole();
},
  created() {
  this.fetchuserrole();


  },
 
};
</script>
