<template>
    <div>
    
        
    
         <v-btn rounded color="red" dark @click="downloadPDF()" style="width: 220px">طباعة التقرير</v-btn> -->
         <v-btn rounded color="#9EB8D9" dark @click="download2PDF()" style="width: 220px">طباعة 2التقرير</v-btn> -->

        
    
    
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
export default {
    name: "ٌReport",

    data() {
        return {
         
        };
    },
    computed: {
        ...mapGetters(["user", "token", "roles"])
    },
    methods: {
        
        downloadPDF() {
            const headers = {
                Authorization: "Bearer " + this.token
            };
            // loading ...
            let loader = this.$loading.show({
                loader: "dots",
                transition: "fade",
                color: "#c30734"
            });
            axios
                .get(
                    "https://localhost:7001/Reports/GetReportWithParameter", {
                        headers,
                    }
                )
                .then(response => {
                    if (response.status == 200) {
                        var base64 = response.data.base64.trim();
                        // -- check format type -------
                        var formatType = "data:application/pdf;base64," + base64;
                        fetch(formatType)
                            .then(response => response.blob())
                            .then(blob => {
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
                .catch(error => {
                    //---loading-overlay---
                    
                    console.log(error);
                    loader.hide();
                });
        },
        download2PDF() {
     const headers = {
         Authorization: "Bearer " + this.token
     };
     // loading ...
     let loader = this.$loading.show({
         loader: "dots",
         transition: "fade",
         color: "#c30734"
     });
     axios
         .get(
             "https://localhost:7001/GetReport", {
                 headers,
             }
         )
         .then(response => {
             if (response.status == 200) {
                 var base64 = response.data.base64.trim();
                 // -- check format type -------
                 var formatType = "data:application/pdf;base64," + base64;
                 fetch(formatType)
                     .then(response => response.blob())
                     .then(blob => {
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
         .catch(error => {
             //---loading-overlay---
             
             console.log(error);
             loader.hide();
         });
 }
    }
};
</script>
