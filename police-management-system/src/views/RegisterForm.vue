<template>
  <form
    @submit.prevent="handleRegisterUser"
    class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
  >
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
        Name
      </label>
      <input
        v-model="name"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="name"
        type="text"
        placeholder="Name"
        
      />
      <p class="text-red-500 text-xs italic" v-if="nameError">
        Please enter a name
      </p>
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
        Email
      </label>
      <input
        v-model="email"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="email"
        type="email"
        placeholder="Email"
        
      />
      <p class="text-red-500 text-xs italic" v-if="emailError">
        Please enter a valid email
      </p>
    </div>
    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
        Password
      </label>
      <input
        v-model="password"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline focus:shadow-outline"
        id="password"
        type="password"
        placeholder="******************"
        
      />
      <p class="text-red-500 text-xs italic" v-if="passwordError">
        Please enter a password
      </p>
    </div>
    <div class="mb-6">
      <label
        class="block text-gray-700 text-sm font-bold mb-2"
        for="confirmPassword"
      >
        Confirm Password
      </label>
      <input
        v-model="confirmPassword"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline focus:shadow-outline"
        id="confirmPassword"
        type="password"
        placeholder="******************"
      />
      <p class="text-red-500 text-xs italic" v-if="confirmPasswordError">
        Please confirm your password
      </p>
      <p class="text-red-500 text-xs italic" v-if="passwordMismatchError">
        Passwords do not match
      </p>
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
      confirmPasswordError: false,
      passwordMismatchError: false,
      loading: false,
    };
  },
  methods:{
    async handleRegisterUser() {
      const confirmPasswordValidation = this.confirmPasswordd();
      this.nameError = !this.name
      this.emailError = !this.email || !this.validateEmail(this.email)
      this.passwordError = !this.password
      this.confirmPasswordError = !this.confirmPassword
      this.passwordMismatchError = this.password !== this.confirmPassword
      if (confirmPasswordValidation !== true) {
        this.confirmPasswordError = confirmPasswordValidation;
        return;
      }
      if (this.name !== "" || this.email !== "" || this.password !== "" || this.confirmPassword !== "" || !this.emailError || !this.passwordMismatchError) {
          this.loading = true;
          await this.$store.dispatch('registerUser', {
              name: this.name,
              email: this.email,
              password: this.password,
          });
        this.loading = true;
      }
      this.loading = false;
      this.$router.push('/login');
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
