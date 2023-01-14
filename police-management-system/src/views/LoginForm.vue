<template>
  <div>
    <form
      class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      @submit.prevent="login"
    >
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="email"
        >
          Email
        </label>
        <input
          v-model="email"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          placeholder="Email"
        />
        <p class="text-red-500 text-xs italic" v-if="emailError">
          <!-- {{ emailError }} -->
          Please Enter Email
        </p>
      </div>
      <div class="mb-6">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="password"
        >
          Password
        </label>
        <input
          v-model="password"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="******************"
        />
        <p class="text-red-500 text-xs italic" v-if="passwordError">
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
