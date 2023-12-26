import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
//-------------
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView";
import RegistesView from "../views/User/RegistesView";
import UserView from "../views/User/UserView";
import RoleView from "../views/User/RoleView";
import EditUser from "../views/User/EditUser";
import AddPermation from "../views/User/AddPermation";
import EditView from "../views/EditView.vue";
import ShowDecision from "../views/ShowDecision.vue";
import FollowUpDeesion from "../views/FollowUpDeesion.vue";
import ReportView from "../views/ReportView.vue";
import ViewDesicion from "../views/ViewDesicion.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: LoginView,
    meta: { login: true },
  },
  {
    path: "/home",
    name: "home",
    component: HomeView,
    meta: { requiresAuth: true },
  },
  {
    path: "/ViewDesicion",
    name: "ViewDesicion",
    component: ViewDesicion,
    meta: { requiresAuth: true },
  },
  {
    path: "/RegistesView/:id",
    name: "RegistesView",
    component: RegistesView,
    meta: { requiresAuth: true },
  },
  {
    path: "/ShowDecision",
    name: "ShowDecision",
    component: ShowDecision,
    meta: { requiresAuth: true },
  },
  {
    path: "/FollowUpDeesion",
    name: "followUpDesion",
    component: FollowUpDeesion,
    meta: { requiresAuth: true },
  },
  {
    path: "/ReportView",
    name: "ReportView",
    component: ReportView,
    meta: { requiresAuth: true },
  },
  {
    path: "/UserView",
    name: "UserView",
    component: UserView,
    meta: { requiresAuth: true },
  },
  {
    path: "/RoleView",
    name: "RoleView",
    component: RoleView,
    meta: { requiresAuth: true },
  },
  {
    path: "/EditView/:id",
    name: "EditView",
    component: EditView,
    meta: { requiresAuth: true },
  },
  {
    path: "/EditUser/:id",
    name: "EditUser",
    component: EditUser,
    meta: { requiresAuth: true },
  },

  {
    path: "/AddPermation",
    name: "AddPermation",
    component: AddPermation,
    meta: { requiresAuth: true },
  },

  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
    meta: { requiresAuth: true },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.matched.some((route) => route.meta.requiresAuth)) {
    if (store.getters.isAuth) {
      return next();
    } else {
      return next("/");
    }
  }
  next();
});
export default router;
