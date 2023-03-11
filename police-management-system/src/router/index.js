import { createRouter, createWebHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import store from "../store";
import HomeView from '../views/HomeView.vue'
import Admin from "../views/admin/index.vue";
import AdminLayout from "../components/AdminLayout.vue";


const routes = [
    {
      path: "/admin",
      name: "admin",
      component: AdminLayout,
      meta: {
        requiresAuth: true,
        requiresAdmin: true,
      },
      children: [
        {
          path: "dashboard",
          name: "dashboard",
          component: Admin,
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
          name: "transferCase",
          path: "/admin/case-management/transfer/:id",
          component: () =>
            import("../views/admin/caseManagement/TransferCase.vue"),
        },
        {
          name: "caseDetails",
          path: "/admin/case-management/details/:id",
          component: () =>
            import("../views/admin/caseManagement/CaseDetails.vue"),
        },
        {
          path: "evidence",
          name: "evidence",
          component: () => import("../views/admin/evidence/Evidences.vue"),
        },
        {
          path: "evidence/create",
          name: "creatEvidence",
          component: () => import("../views/admin/evidence/CreateEvidence.vue"),
        },
        {
          path: "evidence/edit/:id",
          name: "editEvidence",
          component: () => import("../views/admin/evidence/EditEvidence.vue"),
        },
        {
          path: "evidence/transfer/:id",
          name: "transferEvidence",
          component: () =>
            import("../views/admin/evidence/TransferEvidence.vue"),
        },
        {
          path: "evidence/details/:id",
          name: "detailsEvidence",
          component: () =>
            import("../views/admin/evidence/EvidenceDetails.vue"),
        },
        {
          path: "users",
          name: "users",
          component: () => import("../views/admin/users/Users.vue"),
        },
        {
          path: "transferedEvidences",
          name: "transferedEvidences",
          component: () => import("../views/admin/transferedEvidences.vue"),
        },
        {
          path: "transferedCases",
          name: "transferedCases",
          component: () => import("../views/admin/transferedCases.vue"),
        },
        {
          path: "crimes",
          name: "crimes",
          component: () => import("../views/admin/reports/crimes/crimes.vue"),
        },
        {
          path: "crimes/details/:id",
          name: "detailsCrimes",
          component: () => import("../views/admin/reports/crimes/crimesDetails.vue"),
        },
        {
          path: "accidents",
          name: "accidents",
          component: () => import("../views/admin/reports/accidents/accidents.vue"),
        },
        {
          path: "accidents/details/:id",
          name: "detailsAccidents",
          component: () => import("../views/admin/reports/accidents/accidentsDetails.vue"),
        },
        {
          path: "emergencies",
          name: "emergencies",
          component: () => import("../views/admin/reports/emergencies/emergencies.vue"),
        },
        {
          path: "emergencies/details/:id",
          name: "detailsEmergencies",
          component: () => import("../views/admin/reports/emergencies/emergenciesDetails.vue"),
        },
      ],
    },
    {
      path:"/reports/crimeReport",
      name: "crimeReport",
      component:()=> import("../views/reports/CrimeReport.vue")
    },
    {
      path:"/reports/accidentReport",
      name: "accidentReport",
      component:()=> import("../views/reports/AccidentReport.vue")
    },
    {
      path:"/reports/emergencyReport",
      name: "emergencyReport",
      component:()=> import("../views/reports/EmergencyReport.vue")
    },
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
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
    {
      path: "/404",
      name: "404",
      component: () =>
        import(
          /* webpackChunkName: "register" */ "../views/FourOFourView.vue"
        ),
    },
    {
      path: "/unauthorized",
      name: "unauthorized",
      component: () =>
        import(/* webpackChunkName: "register" */ "../views/unauthorized.vue"),
    },
];

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
router.beforeEach(async (to, from, next) => {
  // const auth = getAuth();
  const role = store.state.userRole;
  const user = store.state.user;
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const requiresAdmin = to.matched.some((record) => record.meta.requiresAdmin);
  if (!routeNames.includes(to.name)) {
    next({ name: "404" });
  }
  if (requiresAuth && !user) {
    next({ name: "login" });
  } else if (requiresAdmin && role !== "admin") {
    next({ name: "unauthorized" });
  } else {
    next();
  }
});
export default router;