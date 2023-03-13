<script >
import { RouterLink, RouterView } from 'vue-router'
import { mapGetters, mapState, mapActions } from 'vuex';
import { getAuth, signOut } from '@firebase/auth';
import { ref } from 'vue';


export default {
  data() {
    return {
      isadmin: false,
      user: null,
    }
  },
  methods: {
    ...mapActions(['logout', '']),
    handleLogout() {
      localStorage.removeItem('userRole')
      signOut(getAuth());
      this.$router.push('/login');
    }
  },
  computed: {
    ...mapGetters(['numberOfPosts', 'userEmail', 'userRole']),
    ...mapState(['user']),
    ...mapState(['userRole']),
    isAdmin() {
      return localStorage.getItem('userRole') === 'admin';
    },
  },
  setup() {
    const userRole = ref(localStorage.getItem('userRole') || '');
    const loggedIn = ref(false);
    const auth = getAuth();

    auth.onAuthStateChanged(user => {
      if (user) {
        loggedIn.value = true;
        user.getIdTokenResult().then(token => {
          userRole.value = token.claims.role;
          localStorage.setItem('userRole', token.claims.role);
        });
      } else {
        loggedIn.value = false;
        userRole.value = '';
        localStorage.removeItem('userRole');
      }
    });
    // const handleLogout = () => {
    //   signOut(auth).then(() => {
    //     console.log("Successfully logged out");
    //   }).catch(error => {
    //     console.log("Error logging out", error);
    //   });
    // };
    let open = ref(true)
    let dropdown=ref(false)
    function MenuOpen() {
      open.value = !open.value;
    }
    function DropdownOpen() {
      dropdown.value = !dropdown.value;
    }
    return { open, MenuOpen,dropdown, DropdownOpen }
  },
  created() {
    const auth =getAuth()
    auth.onAuthStateChanged((user) => {
      this.user = user;
    });
  }
}
</script>
<template>
  <div class="py-3.5 px-6 shadow md:flex justify-between items-center bg-[#0d2034]">
    <div class="flex items-center cursor-pointer px-3">
      <router-link to="/" class="body-font">
        <h1 class="text-white"><img class="h-11" src="../assets/logo-1.png" alt="Logo "></h1>
      </router-link>
      <span class="ml-3 text-xl text-white">Kosovo Police</span>
    </div>

    <span class="absolute md:hidden right-6 top-1.5 cursor-pointer text-white" @click="MenuOpen()">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round"
          :d="[open ? 'M6 18L18 6M6 6l12 12' : 'M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5']" />
      </svg>
    </span>

    <ul
      class="md:flex md:items-center md:px-0 px-8 md:pb-0 pb-15 md:static absolute bg-[#0d2034] md:w-auto w-full top-14 duration-200 ease-in"
      :class="[open ? 'left-0 top-14  pb-5 z-10' : 'top-[-100%] left-0']">
      <li class=" md:my-0 my-6 pl-6">
        <router-link @click="MenuOpen()" to="/" class=" font-medium text-white dark:hover:text-gray-400">Home</router-link>
        </li>
      <li class=" md:my-0 my-6 pl-6">
        <button @click="DropdownOpen()" id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" :class="[dropdown ? '' : ' ']" class="flex items-center justify-between w-full py-2 pl-3 pr-4 font-medium text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-gray-400 md:p-0 md:w-auto dark:text-white dark:hover:text-white dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">Report <svg class="w-5 h-5 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></button>
              <div id="dropdownNavbar" :class="[dropdown ? ' absolute z-50  top-0 left-49  md:mt-14 sm:mt-28  ' : 'hidden']" class=" font-normal bg-white divide-y divide-gray-100 rounded-lg shadow  w-44 dark:bg-gray-700 dark:divide-gray-600">
                  <ul class="py-2 text-sm text-white dark:text-white" aria-labelledby="dropdownLargeButton">
                    <li>
                      <router-link @click="DropdownOpen()" to="/reports/crimeReport" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Crime Report</router-link>
                    </li>
                    <li>
                      <router-link @click="DropdownOpen()" to="/reports/accidentReport" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Accident Report</router-link>
                    </li>
                    <li>
                      <router-link @click="DropdownOpen()" to="/reports/emergencyReport" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Emergency Report</router-link>
                    </li>
                  </ul>
              </div>
        </li>
      <li v-if="user && userRole === 'admin'" class=" md:my-0 my-6 pl-6">
        <router-link @click="MenuOpen()" to="/admin/dashboard" class=" font-medium text-white dark:hover:text-gray-400">Admin</router-link>
        </li>
      <li class=" md:my-0 my-6 pl-6">
        <router-link @click="MenuOpen()" to="/about" class=" font-medium text-white dark:hover:text-gray-400">About</router-link>
        </li>
      <li class=" md:my-0 my-6 pl-6">
        <router-link @click="MenuOpen()" to="/contact" class=" font-medium text-white dark:hover:text-gray-400">Contact</router-link>
        </li>
      <li class=" md:my-0 my-6 pl-6">
        <router-link @click="MenuOpen()" to="/register" class=" font-medium text-white dark:hover:text-gray-400" v-if="!user">Register</router-link>
        </li>
      <li class=" md:my-0 my-6 pl-6">
        <router-link @click="MenuOpen()" to="/login" class=" font-medium text-white dark:hover:text-gray-400" v-if="!user">Login</router-link>
      </li>
      <li class=" md:my-0">
        <button to="/login" class="text-white font-medium px-4 py-1.5 bg-red-500 hover:bg-red-700 rounded-lg" v-if="user" @click.prevent="handleLogout">Logout</button>
      </li>
  </ul>
</div></template>

<style></style>
