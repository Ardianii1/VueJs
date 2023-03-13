import { createRouter, createWebHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import store from "../store";
import HomeView from '../views/HomeView.vue'
import Admin from "../views/admin/index.vue";
import AdminLayout from "../components/AdminLayout.vue";

const auth =getAuth()

const requireAuth = (to, from, next) => {
  const currentUser = auth.currentUser;
  const userRole = localStorage.getItem("userRole");
  if (currentUser && userRole) {
    next();
  } else {
    next("/login");
  }
};
const requireAdmin = (to, from, next) => {
  const userRole = localStorage.getItem("userRole");
  if (userRole === "admin") {
    next();
  } else {
    next("/unauthorized");
  }
};
const routes = [
  {
    path: "/admin",
    name: "admin",
    component: AdminLayout,
    beforeEnter: requireAuth,
    beforeEnter: requireAdmin,
    meta: {
      requiresAuth: true,
      // requiresAdmin: true,
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
        component: () => import("../views/admin/caseManagement/Cases.vue"),
      },
      {
        path: "/admin/case-management/create",
        name: "createCase",
        component: () =>
          import("../views/admin/caseManagement/CreateCaseManagement.vue"),
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
        component: () => import("../views/admin/evidence/TransferEvidence.vue"),
      },
      {
        path: "evidence/details/:id",
        name: "detailsEvidence",
        component: () => import("../views/admin/evidence/EvidenceDetails.vue"),
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
        path: "accidents",
        name: "accidents",
        component: () =>
          import("../views/admin/reports/accidents/accidents.vue"),
      },

      {
        path: "emergencies",
        name: "emergencies",
        component: () =>
          import("../views/admin/reports/emergencies/emergencies.vue"),
      },
      
    ],
  },
  {
    path: "/crimes/details/:id",
    name: "detailsCrimes",
    component: () => import("../views/admin/reports/crimes/crimesDetails.vue"),
  },
  {
    path: "/accidents/details/:id",
    name: "detailsAccidents",
    component: () =>
      import("../views/admin/reports/accidents/accidentsDetails.vue"),
  },
  {
    path: "/emergencies/details/:id",
    name: "detailsEmergencies",
    component: () =>
      import("../views/admin/reports/emergencies/emergenciesDetails.vue"),
  },
  {
    path: "/reports/crimeReport",
    name: "crimeReport",
    component: () => import("../views/reports/CrimeReport.vue"),
  },
  {
    path: "/reports/accidentReport",
    name: "accidentReport",
    component: () => import("../views/reports/AccidentReport.vue"),
  },
  {
    path: "/reports/emergencyReport",
    name: "emergencyReport",
    component: () => import("../views/reports/EmergencyReport.vue"),
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
      import(/* webpackChunkName: "contact" */ "../views/Contact.vue"),
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
        /* webpackChunkName: "FourOFourView" */ "../views/FourOFourView.vue"
      ),
  },
  {
    path: "/unauthorized",
    name: "unauthorized",
    component: () =>
      import(
        /* webpackChunkName: "unauthorized" */ "../views/unauthorized.vue"
      ),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const routeNames = routes.flatMap((route) =>
  route.children
    ? route.children.flatMap((route) => route.name).concat(route.name)
    : route.name
);
router.beforeEach(async (to, from, next) => {
  if (!routeNames.includes(to.name)) {
    next({ name: "404" });
  } else {
    next()
  }
});
export default router;