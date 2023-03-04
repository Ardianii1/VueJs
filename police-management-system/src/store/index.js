// import { createStore } from "vuex";
// import router from "../router";
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
// } from "firebase/auth";
// import firebase from "../firebase/index";
// import { getDocs, collection } from "firebase/firestore";
// import db from "../firebase/db";
// import { createStore } from "vuex";
// import signupUser from "@/firebase/user/signupUser";
// import loginUser from "../firebase/user/loginUser";

// const store =  createStore({
//   state: {
//     user: null,
//   },
//   mutations: {
//     setPosts(state, newPosts) {
//       state.posts = newPosts;
//     },
//     setUser(state, user) {
//       state.user = user;
//     },
//   },
//   actions: {
//     actions: {
//       async loginUser({ commit }, payload) {
//         const { user } = await loginUser(payload);
//         commit("setUser", user);
//       },
//       async registerUser(_, payload) {
//         await signupUser(payload);
//       },
//     },
// async register({ commit }, { email, password }) {
//   try {
//     const result = await firebase.auth.createUserWithEmailAndPassword(
//       email,
//       password
//     );
//     commit("setCurrentUser", result.user);
//   } catch (error) {
//     console.error(error);
//   }
// },
// async login({ commit }, { email, password }) {
//   try {
//     const { user } = await firebase.auth.signInWithEmailAndPassword(
//       email,
//       password
//     );
//     commit("setCurrentUser", user);
//   } catch (error) {
//     console.error(error);
//   }
// },
// async logout({ commit }) {
//   try {
//     await firebase.auth.signOut();
//     commit("setCurrentUser", null);
//   } catch (error) {
//     console.error(error);
//   }
// },
// },
// });
// export default store;
import { getDocs, collection } from "firebase/firestore";
import db from "../firebase/db";
import { createStore } from "vuex";
import signupUser from "@/firebase/user/signupUser";
import loginUser from "../firebase/user/loginUser";

const store = createStore({
  state: {
    user: null,
    posts: [],
    cases: [],
    evidences: [],
  },
  getters: {
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
    setCases(state, cases) {
      state.cases = cases;
    },
    setEvidences(state, evidences) {
      state.evidences = evidences;
    },
  },
  actions: {
    // async fetchPosts({ commit }) {
    //   const snapshots = await getDocs(collection(db, "posts"));
    //   const newPosts = [];
    //   snapshots.forEach((snapshot) => {
    //     newPosts.push(snapshot.data());
    //   });
    //   commit("setPosts", newPosts);
    // },
    async loginUser({ commit }, payload) {
      const user = await loginUser(payload);
      commit("setUser", user);
    },
    async registerUser(_, payload) {
      await signupUser(payload);
    },
    async fetchCases({ commit }) {
      const res = await fetch("http://localhost:3000/cases");
      const cases = await res.json();
      commit("setCases", cases);
    },
    async fetchEvidences({ commit }) {
      const res = await fetch("http://localhost:3000/evidences");
      const evidences = await res.json();
      commit("setEvidences", evidences);
    },
  },
  modules: {},
});

export default store;
