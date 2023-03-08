<script >
import { RouterLink, RouterView } from 'vue-router'
import { mapGetters, mapState } from 'vuex';
import { getAuth, signOut } from '@firebase/auth';
import { ref } from 'vue';

export default {
  methods: {
    handleLogout() {
      signOut(getAuth());
      this.$router.push('/login');
    }
  },
  computed: {
    ...mapGetters(['numberOfPosts', 'userEmail']),
    ...mapState(['user'])
  },
  setup() {
    let open = ref(true)
    function MenuOpen() {
      open.value = !open.value;
    }
    return { open, MenuOpen }
  }
}
</script>
<template>
  <div class="py-3.5 px-6 shadow md:flex justify-between items-center bg-gray-800">
    <div class="flex items-center cursor-pointer px-3">
      <router-link to="/">
        <h1 class="text-white"><img class="h-11" src="../assets/logo-1.png" alt="Logo "></h1>
      </router-link>
    </div>

    <span class="absolute md:hidden right-6 top-1.5 cursor-pointer text-white" @click="MenuOpen()">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round"
          :d="[open ? 'M6 18L18 6M6 6l12 12' : 'M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5']" />
      </svg>
    </span>

    <ul
      class="md:flex md:items-center md:px-0 px-8 md:pb-0 pb-15 md:static absolute bg-gray-800 md:w-auto w-full top-14 duration-200 ease-in"
      :class="[open ? 'left-0 top-14  pb-5 z-10' : 'top-[-100%] left-0']">
      <li class=" md:my-0 my-6 pl-6">
        <router-link @click="MenuOpen()" to="/" class=" font-medium text-white dark:hover:text-gray-400">Home</router-link>
        </li>
      <li class=" md:my-0 my-6 pl-6">
        <router-link @click="MenuOpen()" to="/admin/dashboard" class=" font-medium text-white dark:hover:text-gray-400">Admin</router-link>
        </li>
      <li class=" md:my-0 my-6 pl-6">
        <router-link @click="MenuOpen()" to="/about" class=" font-medium text-white dark:hover:text-gray-400">About</router-link>
        </li>
      <li class=" md:my-0 my-6 pl-6">
        <router-link @click="MenuOpen()" to="/register" class=" font-medium text-white dark:hover:text-gray-400" v-if="!user">Register</router-link>
        </li>
      <li class=" md:my-0 my-6 pl-6">
        <router-link @click="MenuOpen()" to="/login" class=" font-medium text-white dark:hover:text-gray-400" v-if="!user">Login</router-link>
      </li>
      <li class=" md:my-0">
        <button to="/login" class="text-white font-medium px-4 py-1.5 bg-red-500 hover:bg-red-700 rounded-lg" v-if="user" @click="handleLogout">Logout</button>
      </li>
  </ul>
</div></template>

<style></style>
