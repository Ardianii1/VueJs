<template>
  <div class="flex justify-center py-44 bg-slate-200 ">
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-2/6 " @submit.prevent="login" >
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="email"
        >
          Email
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
          </div>
          <input
          v-model="email"
          class="bg-gray-50  border-gray-300  text-sm  focus:ring-blue-500 focus:border-blue-500 block pl-10 p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          placeholder="test@example.com"
        />
        </div>
        
        <p class="mt-2 text-sm text-red-600 dark:text-red-500" v-if="emailError">
          <!-- {{ emailError }} -->
          Please Enter Email
        </p>
      </div>
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password" >
          Password
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 458 570"><!-- Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z"/></svg>
          </div>
          
          <input
          v-model="password"
          class="bg-gray-50  border-gray-300  text-sm  focus:ring-blue-500 focus:border-blue-500 block pl-10 p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="Enter Your Password"
        />
        </div>
        
        <p class="mt-2 text-sm text-red-600 dark:text-red-500" v-if="passwordError">
          Please Enter Password
        </p>
        <!-- <p class="text-red-500 text-xs italic" v-if="passwordError">{{ wrongPasswordError }}</p> -->
        <p class="text-red-500 text-xs italic" v-if="errorMessage">
          {{ errorMessage }}
        </p>
      </div>
      <div class="flex items-center justify-between">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          value="Login"
        >
          Sign In
        </button>
        <a
          class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          href="#"
        >
          Forgot Password?
        </a>
      </div>
    </form>
  </div>
</template>

<script>
// import { ref } from "vue";
// import { useStore } from "vuex";
// import firebase from 'firebase/app';
// import 'firebase/auth';
// import { auth } from '../firebase/index';
export default {
  data() {
    return {
      email: '',
      password: '',
      emailError: false,
      passwordError: false,
      errorMessage: ""
    };
  },
  // methods: {
  //   async login() {
  //     try {
  //       const { user } = await auth.signInWithEmailAndPassword(this.email, this.password);
  //       console.log('Successfully signed in user:', user);
  //       router.push("/");
  //     } catch (error) {
  //       console.error('Error signing in user:', error);
  //     }
  //   },
  // },
  // setup() {
  //   const login_form = ref({});
  //   const store = useStore();
  //   const login = () => {
  //     store.dispatch("login", login_form.value);
  //   };
  //   return {
  //     login_form,
  //     login,
  //   };
  // },
  // data() {
    //   return {
    //     username: '',
    //     password: '',
    //     errorMessage: '',
    //     emailError: false,
    //     passwordError: false,
    //   }
  // },
  methods: {
    async login() {
      this.emailError = !this.email
      this.passwordError = !this.password

      if (!this.emailError && !this.passwordError) {
        try {
          await this.$store.dispatch('loginUser', {
            email: this.email,
            password: this.password
          });
          this.$router.push('/');
        } catch (error) {
          if (error.code === 'auth/wrong-password') {
        this.errorMessage = "Password is incorrect";
      } else {
        this.errorMessage = error.message;
      }
        }
      }
    }

    //   this.emailError = !this.email || !this.validateEmail(this.email)
    //   this.passwordError = !this.password
    //   // Reset errors
    //   this.errorMessage = ''
    //   this.usernameError = ''
    //   this.passwordError = ''

    //   // Validate inputs
    //   if (!this.username) {
    //     this.usernameError = 'Email is required'
    //   }
    //   if (!this.password) {
    //     this.passwordError = 'Password is required'
    //   }

    //   // Check if there are any errors
    //   if (this.usernameError || this.passwordError) {
    //     return
    //   }

    //   // Check if the username and password are correct
    //   if (this.username === 'user' && this.password === 'password') {
    //     this.$router.push('/')
    //   } else {
    //     this.errorMessage = 'Incorrect username or password'
    //   }
    // }
    // }
  }
};
</script>

<style></style>
