import Vue from "vue";
import "./plugins/axios";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import store from "./store";

//---- loading overlay ------------------
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
Vue.use(Loading);
Vue.config.productionTip = false;
//--- vue-toasted-----------------
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
Vue.use(Toast, {
  transition: "Vue-Toastification__fade",
  maxToasts: 20,
  newestOnTop: true,
});









new Vue({
  vuetify,
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
