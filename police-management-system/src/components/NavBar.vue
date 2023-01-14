<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>
<template>
  <nav class="bg-gray-800 p-4 flex items-center justify-between">
    <div class="flex items-center">
      <img src="src/assets/logo.svg" alt="Logo" class="h-8 w-8 rounded-full" />
      <RouterLink to="/" class="ml-4 font-bold text-xl text-white">My App</RouterLink>
    </div>
    <div class="flex items-center space-x-4">
        <RouterLink to="/" class="text-gray-400 hover:text-white">Home</RouterLink>
        <RouterLink to="/about" class="text-gray-400 hover:text-white">About</RouterLink>
        <RouterLink to="/contact" class="text-gray-400 hover:text-white">Contact</RouterLink>
        <RouterLink to="/register" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Register</RouterLink>
      <!-- <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
        Register
      </button> -->
    </div>
  </nav>
</template>

<style>
/* Add any additional styling for your navbar here */
</style>
