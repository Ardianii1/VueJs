import { createStore } from "vuex";
import loginUser from "../firebase/user/loginUser";
import signupUser from "../firebase/user/signupUser";
import apiRequest from "../utility/apiRequest";
import firebase from "../firebase/index";
import "firebase/auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import axios from "axios";

const store = createStore({
  state: {
    user: null,
    posts: [],
    caseees: [],
    evidences: [],
    userRole: null,
    crimes: [],
    accidents: [],
    emergencies: [],
  },
  getters: {
    userRole(state) {
      return state.userRole;
    },
    numberOfPosts(state) {
      return state.posts.length;
    },
    titlesOfPosts(state) {
      return state.posts.map((post) => post.title);
    },
    userEmail(state) {
      if (!state.user) return "";

      return state.user.email;
    },
    currentUserEmail: (state) => {
      const email = state.user.email;
      return email;
    },
  },
  mutations: {
    setPosts(state, newPosts) {
      state.posts = newPosts;
    },
    setUser(state, user) {
      state.user = user;
    },
    setCases(state, caseees) {
      state.caseees = caseees;
    },
    setCrimes(state, crimes) {
      state.crimes = crimes;
    },
    setAccidents(state, accidents) {
      state.accidents = accidents;
    },
    setEmergencies(state, emergencies) {
      state.emergencies = emergencies;
    },
    setEvidences(state, evidences) {
      state.evidences = evidences;
    },
    setUserRole(state, role) {
      state.userRole = role;
      localStorage.setItem("userRole", role);
    },
    REMOVE_USER_ROLE(state) {
      state.userRole = null;
      localStorage.removeItem("userRole");
    },
    setUserEmails(state,emails) {
      state.allUsers = emails;
    },
  },
  actions: {
    async loginUser({ commit }, payload) {
      const user = await loginUser(payload);
      commit("setUser", user);
    },
    async getUserRole({ commit, state }) {
      if (state.user) {
        const auth = getAuth();
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            const idTokenResult = await user.getIdTokenResult();
            const role = idTokenResult.claims.role;
            localStorage.setItem("userRole", role);

            commit("setUserRole", role);
          }
        });
      }
    },
    logout({ commit }) {
      commit("setUser", null);
      commit("REMOVE_USER_ROLE");
    },
    async registerUser({ commit }, payload) {
      await apiRequest.registerUser(payload);
    },
    async fetchCases({ commit }) {
      const res = await fetch("http://localhost:3000/cases");
      const caseees = await res.json();
      commit("setCases", caseees);
    },
    async fetchCrimes({ commit }) {
      const res = await fetch("http://localhost:3000/crimes");
      const crimes = await res.json();
      commit("setCrimes", crimes);
    },
    async fetchAccidents({ commit }) {
      const res = await fetch("http://localhost:3000/accidents");
      const accidents = await res.json();
      commit("setAccidents", accidents);
    },
    async fetchEmergencies({ commit }) {
      const res = await fetch("http://localhost:3000/emergencys");
      const emergencies = await res.json();
      commit("setEmergencies", emergencies);
    },
    async fetchEvidences({ commit }) {
      const res = await fetch("http://localhost:3000/evidences");
      const evidences = await res.json();
      commit("setEvidences", evidences);
    },
  },
  modules: {},
  created() {
    this.dispatch("getUserRole");
  },
});

export default store;
