<template>
  <router-view />
    <div class="p-4 sm:ml-64">
       <div class="p-4 border-2 border-gray-200  rounded-lg dark:border-gray-700">
          <div class="grid lg:grid-cols-3 md:grid-cols-2 lg:gap-5 md:gap-4 gap-y-4 mb-4">
             <div class="flex text-center pt-3 justify-center h-48 rounded-lg bg-gray-50 dark:bg-gray-800">
                <router-link :to="`/admin/case-management`" class="px-3">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Cases</h5>
                    <p class="font-normal  text-center text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                </router-link>
             </div>
             <div class="flex text-center pt-3 justify-center h-48 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <router-link :to="`/admin/evidence`" class="px-3">
                      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Evidences</h5>
                      <p class="font-normal  text-center text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                  </router-link>
               </div>
               <div class="flex text-center pt-3 justify-center h-48 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <router-link :to="`/admin/evidence`" class="px-3">
                      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Transfered Evidences</h5>
                      <p class="font-normal  text-center text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                  </router-link>
               </div>
               <div class="flex text-center pt-3 justify-center h-48 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <router-link :to="`/admin/evidence`" class="px-3">
                      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Users</h5>
                      <p class="font-normal  text-center text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                  </router-link>
               </div>
          </div>
       </div>
    </div>
</template>
<script>
import Cases from "./caseManagement/Cases.vue"
import AdminSideBar from "../../components/AdminSideBar.vue"
export default {
  name: 'Admin',
  components: {
    AdminSideBar,
    Cases,
  },
  data() {
    return {
      // title: 'Admin',
      isSidebarOpen: false,
    }
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
  },
};
</script>
<style></style>
