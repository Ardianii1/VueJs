<template>
  <!-- <div class="flex justify-center py-24 bg-slate-300">
    <form @submit.prevent="handleRegisterUser" class="bg-slate-50 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-2/5 " >
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
        Name
      </label>
      <div class="relative">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400 " fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"> Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>
        </div>
        <input
        v-model="name"
        class="bg-gray-50  border-gray-300  text-sm  focus:ring-blue-500 focus:border-blue-500 block pl-10 p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="name"
        type="text"
        placeholder="Your name"
        
      />
      </div>
      
      <p class="text-red-500 text-xs italic" v-if="nameError">
        Please enter a name
      </p>
    </div>
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
          Please Enter Email
        </p>
      </div>
    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
        Password
      </label>
      <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 458 570"> Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. <path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z"/></svg>
          </div>
          
          <input
          v-model="password"
          class="bg-gray-50  border-gray-300  text-sm  focus:ring-blue-500 focus:border-blue-500 block pl-10 p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="Enter Your Password"
        />
        </div>
      <p class="text-red-500 text-xs italic" v-if="passwordError">
        Please enter a password
      </p>
    </div>
    <div class="mb-6">
      <div class="relative">
      </div>
    </div>
    <div class="flex items-center justify-between">
      <button
        :class="{ 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline': !loading, 'bg-gray-500 cursor-not-allowed text-white font-bold py-2 px-4 rounded': loading }"
        type="submit"
        value="Register"
        :disabled="loading"
      >
        Register
      </button>
      <RouterLink
        class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
        to="/login"
      >
        Already have an account?
      </RouterLink>
    </div>
  </form>
  </div> -->
 <div class="flex items-center justify-center py-40 sm:py-28 md:py-32 lg:py-32 bg-slate-300">
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md" @submit.prevent="handleRegisterUser">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Name</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <span class="text-gray-500 dark:text-gray-400"><svg aria-hidden="true" class="w-4 h-4 text-gray-500 dark:text-gray-400 " fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"> Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg></span>
            </div>
            <input v-model="name" class="bg-gray-50 border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500 block pl-10 p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="John Doe" />
          </div>
          <p class="mt-2 text-sm text-red-600 dark:text-red-500" v-if="nameError">Please Enter Email</p>
          <p class="text-red-500 text-xs italic" v-if="nameError">{{ nameError }}</p>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <span class="text-gray-500 dark:text-gray-400">@</span>
            </div>
            <input v-model="email" class="bg-gray-50 border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500 block pl-10 p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="test@example.com" />
          </div>
          <p class="mt-2 text-sm text-red-600 dark:text-red-500" v-if="emailError">Please Enter Email</p>
          <p class="text-red-500 text-xs italic" v-if="emailErr">{{ emailErr }}</p>
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <span class="text-gray-500 dark:text-gray-400">&#x1F512;</span>
            </div>
            <input v-model="password" class="bg-gray-50 border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500 block pl-10 p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Enter Your Password" />
          </div>
          <p class="mt-2 text-sm text-red-600 dark:text-red-500" v-if="passwordError">Please Enter Password</p>
          <!-- <p class="text-red-500 text-xs italic" v-if="passwordErr">{{ passwordErr }}</p> -->
        </div>
        <div class="flex flex-col items-center">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-2 w-full" type="submit" value="Register">Sign In</button>
          <a class="text-blue-500 hover:text-blue-800 mb-4" href="#">Forgot Password?</a>
        </div>
      </form>
    </div>

</template>
<script>
  // import LoadingIndicator from '@/components/LoadingIndicator.vue';

export default {
  data() {
    return {
      name:"",
      email: '',
      password: '',
      confirmPassword: '',
      nameError: false,
      emailError: false,
      passwordError: false,
      emailErr:'',
      confirmPasswordError: false,
      passwordMismatchError: false,
      loading: false,
    };
  },
  methods:{
    async handleRegisterUser() {
      // this.$router.push('/login');
      // await this.$store.dispatch('registerUser', {
      //   name: this.name,
      //   email: this.email,
      //   password: this.password,
      // });
      if (!this.emailError && !this.passwordError) {
        try {
          await this.$store.dispatch('registerUser', {
            name: this.name,
            email: this.email,
            password: this.password
          });
          this.$router.push('/login');
        } catch (error) {
          console.log(error)
          if (error.response.status === 400) {
            this.emailErr = "Email is taken";
          } else {
            this.errorMessage = error.message;
          }
        }
      }






      
      // const confirmPasswordValidation = this.confirmPasswordd();
      this.nameError = !this.name
      this.emailError = !this.email || !this.validateEmail(this.email)
      this.passwordError = !this.password
      this.confirmPasswordError = !this.confirmPassword
      this.passwordMismatchError = this.password !== this.confirmPassword
      // if (confirmPasswordValidation !== true) {
        // this.confirmPasswordError = confirmPasswordValidation;
        // return;
      // }
      // // if (this.name !== "" || this.email !== "" || this.password !== "" || this.confirmPassword !== "" || !this.emailError || !this.passwordMismatchError) {
          // this.loading = true;
          // await this.$store.dispatch('registerUser', {
          //     name: this.name,
          //     email: this.email,
          //     password: this.password,
          // });
        // this.loading = true;
      // }
      // this.loading = false;
    },
    validateEmail(email) {
     const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ 
      return re.test(String(email).toLowerCase())
    },
    confirmPasswordd() {
      if (this.confirmPassword =="") {
        return 'Passwords do not match'
      }
      if (this.password !== this.confirmPassword) {
        return 'Passwords do not match'
      }
      return true
    }
    
  },
  // components: {
  //     LoadingIndicator
  // }
  // setup() {
    // get the store object
    // const store = useStore();

    // use the mapActions helper to map the actions from the store to the component's methods
    // return {
      // ...mapActions(['register']),
    // }
  // },
};
</script>
<!-- <script> -->
// import app from './firebase'
// import db from "../firebase/db";
// import {doc , setDoc } from "firebase/firestore"
// import { ref } from "vue";
// import { useStore } from "vuex";
// export default {
//   setup() {
//     const register_form = ref({});
//     const store = useStore();
//     const register = () => {
//       store.dispatch("register", register_form.value);
//     };
//     return {
//       register_form,
//       register,
//     };
//   },

  // data() {
  //   return {
  //     name: '',
  //     email: '',
  //     password: '',
  //     confirmPassword: '',
  //     nameError: false,
  //     emailError: false,
  //     passwordError: false,
  //     confirmPasswordError: false,
  //     passwordMismatchError: false,
  //     user:{
  //       name: this.name,
  //       email: this.email,
  //       password: this.password
  //     }
  //   }
  // },
  // methods: {
  //   async handleSubmit() {
  //     this.nameError = !this.name
  //     this.emailError = !this.email || !this.validateEmail(this.email)
  //     this.passwordError = !this.password
  //     this.confirmPasswordError = !this.confirmPassword
  //     this.passwordMismatchError = this.password !== this.confirmPassword

  //     if (!this.nameError && !this.emailError && !this.passwordError && !this.confirmPasswordError && !this.passwordMismatchError) {
  //       // Register the user and redirect to the dashboard
  //       try {
  //       //   await firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
  //       await setDoc(doc(db, "users" , "1"), { ...this.user })
  //       //   this.$router.push('/dashboard')
  //       } catch (error) {
  //           console.error(error)
  //       }
  //     }
  //   },
  //   validateEmail(email) {
  <!--      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ -->
  //     return re.test(String(email).toLowerCase())
  //   }
  // }
// };
<!-- </script> -->

<style></style>
