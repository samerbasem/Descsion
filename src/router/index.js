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
import Report from "../views/Report.vue";
import ViewDesicion from "../views/ViewDesicion.vue";
import ViewDesicion1 from "../views/ViewDesicion1.vue";
import Descion_Org from "../views/Descion_Org.vue";
import Follow_Org from "../views/Follow_Org.vue";
import follow_orgView from "../views/follow_orgView.vue";
import orgs from "../views/orgs.vue";

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
      path: "/ViewDesicion1",
      name: "ViewDesicion1",
      component: ViewDesicion1,
      meta: { requiresAuth: true },
      },
    {
      path: "/Follow_Org",
      name: "Follow_Org",
      component: Follow_Org,
      meta: { requiresAuth: true },
    },
    {
      path: "/follow_orgView",
      name: "follow_orgView",
      component:follow_orgView,
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
    path: "/Report",
    name: "Report",
    component: Report,
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
    path: "/EditView/:Id",
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
    path: "/Descion_Org",
    name: "Descion_Org",
    component: Descion_Org,
    meta: { requiresAuth: true },
  },
  {
    path: "/orgs",
    name: "orgs",
    component: orgs,
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
