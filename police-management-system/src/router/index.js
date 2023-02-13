import { createRouter, createWebHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import store from "../store";
import HomeView from '../views/HomeView.vue'
// import AboutView from '../views/AboutView.vue'
// import ContactView from '../views/ContactView.vue'
import Admin from "../views/admin/index.vue";


// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes:
  const routes = [
    {
      beforeEnter: (to, from, next) => {
        if (store.state.user) {
          next();
        } else {
          next("/login");
        }
      },
      path: "/admin",
      name: "admin",
      component: Admin,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/admin/case-management",
      name: "cases",
      component: () =>
        import(
          /* webpackChunkName: "cases" */ "../views/admin/caseManagement/Cases.vue"
        ),
    },
    {
      path: "/admin/case-management/create",
      name: "createCase",
      component: () =>
        import(
          /* webpackChunkName: "createCase" */ "../views/admin/caseManagement/CreateCaseManagement.vue"
        ),
    },
    {
      name: "editCase",
      path: "/admin/case-management/edit/:id",
      component: () =>
        import("../views/admin/caseManagement/EditCaseManagement.vue"),
    },
    {
      path: "/admin/evidence",
      name: "evidence",
      component: () => import("../views/admin/evidence/Evidences.vue"),
      children: [],
    },
    {
      path: "/admin/evidence/create",
      component: () => import("../views/admin/evidence/CreateEvidence.vue"),
      name: "creatEvidence",
    },
    {
      path: "/admin/evidence/edit/:id",
      component: () => import("../views/admin/evidence/EditEvidence.vue"),
      name: "editEvidence",
    },
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
    },
    {
      path: "/contact",
      name: "contact",
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/ContactView.vue"),
    },
    {
      path: "/register",
      name: "Register",
      component: () =>
        import(
          /* webpackChunkName: "register" */ "../views/user/RegisterForm.vue"
        ),
    },
    {
      path: "/login",
      name: "login",
      component: () =>
        import(/* webpackChunkName: "login" */ "../views/user/LoginForm.vue"),
    },
  ];
// })

const router = createRouter({
  history: createWebHistory(),
  routes,
});
const guestRouteNames = ["login", "register"];

const routeNames = routes.flatMap((route) =>
  route.children
    ? route.children.flatMap((route) => route.name).concat(route.name)
    : route.name
);
// router.beforeEach((to, from, next) => {
//   const auth = getAuth();
//   onAuthStateChanged(auth, (user) => {
//     if (guestRouteNames.includes(to.name) && user) {
//       next({ name: "home" });
//     } else if (!routeNames.includes(to.name)) {
//       next({ name: "404" });
//     } else {
//       next();
//     }
//   });
// });
export default router;