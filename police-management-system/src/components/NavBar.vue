<script >

import { RouterLink, RouterView } from 'vue-router'
import { mapGetters, mapState } from 'vuex';
import { getAuth, signOut } from '@firebase/auth';
export default {
  methods: {
            handleLogout() {
                signOut(getAuth());
                this.$router.push('/login');
            }
        },
        computed: {
            ...mapGetters(['numberOfPosts', 'userEmail']),
            // user: this.$store.state.user,
            ...mapState(['user'])
        }
}
</script>
<template>
  <!-- <nav class="bg-gray-800 p-4 flex items-center justify-between">
    <div class="flex items-center">
      <img src="src/assets/logo.svg" alt="Logo" class="h-8 w-8 rounded-full" />
      <RouterLink to="/" class="ml-4 font-bold text-xl text-white">My App</RouterLink>
        <p v-if="user" class="text-white">Nice to have you back {{ userEmail }}!</p>
    </div>
    <div class="flex items-center space-x-4">
        <RouterLink to="/" class="text-gray-400 hover:text-white">Home</RouterLink>
        <RouterLink to="/about" class="text-gray-400 hover:text-white">About</RouterLink>
        <RouterLink to="/contact" class="text-gray-400 hover:text-white">Contact</RouterLink>
        <RouterLink v-if="!user" to="/register" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Register</RouterLink>
        <RouterLink v-if="!user" to="/login" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Login</RouterLink>
        <button v-if="user" @click="handleLogout" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Logout </button>
    </div>
  </nav> -->
  <nav class="bg-gray-800">
    <div class="container mx-auto px-6 py-4 flex items-center justify-between">
      <div class="w-1/5">
        <router-link to="/" class="text-white font-medium text-2xl flex items-center">
          <!-- <img src="src/assets/logo.svg" alt="Logo" class="h-8 w-8 rounded-full" /> -->
          My App</router-link>
      </div>
      <div class="w-4/5 flex justify-end">
        <router-link to="/" class="text-white font-medium px-4 py-2 hover:bg-gray-700 rounded-lg">Home</router-link>
        <router-link to="/admin" class="text-white font-medium px-4 py-2 hover:bg-gray-700 rounded-lg">Admin</router-link>
        <router-link to="/about" class="text-white font-medium px-4 py-2 hover:bg-gray-700 rounded-lg">About</router-link>
        <router-link to="/register" class="text-white font-medium px-4 py-2 hover:bg-gray-700 rounded-lg" v-if="!user">Register</router-link>
        <router-link to="/login" class="text-white font-medium px-4 py-2 hover:bg-gray-700 rounded-lg" v-if="!user">Login</router-link>
        <button class="text-white font-medium px-4 py-2 hover:bg-red-500 rounded-lg" v-if="user" @click="handleLogout">Logout</button>
      </div>
    </div>
  </nav>
</template>

<style>
</style>
