import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";

import './assets/main.css'
import { getAuth, onAuthStateChanged } from "firebase/auth";


// auth.onAuthStateChanged((user) => {
//   if (user) {
//     const userRef = firebase.database().ref(`users/${user.uid}`);
//     userRef.on('value', (snapshot) => {
//       const userData = snapshot.val();
//       localStorage.setItem('userRole', userData.role);
//     });
//   } else {
//     localStorage.removeItem('userRole');
//   }
// });
const auth = getAuth();
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const idTokenResult = await user.getIdTokenResult();
    // console.log(idTokenResult);
    const role = idTokenResult.claims.role;

    localStorage.setItem('userRole', role);

    // console.log(role);
    // commit("setUserRole", role);
  }
});

const app = createApp(App)

app.use(router)
app.use(store);

app.mount('#app')
