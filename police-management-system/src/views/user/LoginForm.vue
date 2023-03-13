<template>
  <div class="flex items-center justify-center py-40 sm:py-28 md:py-32 lg:py-32 bg-slate-300">
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md" @submit.prevent="login">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <span class="text-gray-500 dark:text-gray-400">@</span>
          </div>
          <input v-model="email" class="bg-gray-50 border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500 block pl-10 p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="email" placeholder="test@example.com" />
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
        <p class="text-red-500 text-xs italic" v-if="passwordErr">{{ passwordErr }}</p>
      </div>
      <div class="flex flex-col items-center">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-2 w-full" type="submit" value="Login">Sign In</button>
        <a class="text-blue-500 hover:text-blue-800 mb-4" href="#">Forgot Password?</a>
      </div>
    </form>
  </div>

</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      emailError: false,
      passwordError: false,
      errorMessage: "",
      emailErr:'',
      passwordErr:'',
    };
  },
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
            this.passwordErr = "Password is incorrect";
          } else if (error.code === "auth/user-not-found") {
            this.emailErr = "Invalid Email"
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
