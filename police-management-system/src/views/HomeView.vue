<template>
  <main class="">
    <h1 class="text-center py-3 text-lg">Latest News</h1>
  <div class="flex flex-wrap justify-between px-4 md:px-0 md:w-2/3 lg:w-5/6 mx-auto py-10">
    <div class="max-w-sm  bg-white  border-gray-200 rounded-lg  dark:bg-transparent dark:border-gray-700">
        <a class="flex justify-center">
            <img class="rounded-lg aspect-square max-w-[250px]"   v-bind:src="crimePhotoUrl" alt="" />
        </a>
        <div class="p-5">
            <a href="#">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:gray-900">{{ Crimes.Dateof }}</h5>
            </a>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-800">{{ Crimes.Description }}</p>
            <router-link to="/crimes/details/640f8aafbaeb85e737070b90" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Read more
                <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </router-link>
        </div>
    </div>
    <div class="max-w-sm  bg-white  border-gray-200 rounded-lg  dark:bg-transparent dark:border-gray-700">
        <a class="flex justify-center">
            <img class="rounded-lg aspect-square max-w-[250px]"   v-bind:src="accidentPhotoUrl" alt="" />
        </a>
        <div class="p-5">
            <a href="#">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-900">{{ Accidents.Dateof }}</h5>
            </a>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-800">{{ Accidents.Description }}</p>
            <router-link to="/accidents/details/640f8b67baeb85e737070b98" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Read more
                <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </router-link>
        </div>
    </div>
    <div class="max-w-sm  bg-white  border-gray-200 rounded-lg  dark:bg-transparent dark:border-gray-700">
        <a class="flex justify-center">
            <img class="rounded-lg aspect-square max-w-[250px]"   v-bind:src="emergencyPhotoUrl" alt="" />
        </a>
        <div class="p-5">
            <a href="#">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-900">{{ Emergencies.Dateof }}</h5>
            </a>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-800">{{ Emergencies.Description }}</p>
            <router-link to="/emergencies/details/640f8bbabaeb85e737070b9a" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Read more
                <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </router-link>
        </div>
    </div>
  </div>

  </main>
</template>
<script>
import { mapGetters, mapState, mapActions } from 'vuex';
import { getAuth, signOut } from '@firebase/auth';
import axios from 'axios';
export default {
  data() {
    return {
      role: '',
      Accidents: [],
      Crimes: [],
      Emergencies: [],
    };
  },
  name: "HomeView",
  methods: {
    ...mapActions(['getUserRole'])
  },
  computed: {
    ...mapState(['userRole']),
    // ...mapState(["accidents"]),
    ...mapState(["crimes"]),
    ...mapState(["emergencies"]),
    crimePhotoUrl() {
      return `http://localhost:3000/uploads/reports/Crimes/${this.Crimes.photoName}`;
    },
    accidentPhotoUrl() {
      return `http://localhost:3000/uploads/reports/Accidents/${this.Accidents.photoName}`;
    },
    emergencyPhotoUrl() {
      return `http://localhost:3000/uploads/reports/emergencies/${this.Emergencies.photoName}`;
    },
  },
  created() {
    this.getUserRole().then(() => {
      this.role = this.userRole === 'admin' ? 'admin' : 'user';
    });
    let crimesapiURL = `http://localhost:3000/crimes/640f8aafbaeb85e737070b90`;
    axios.get(crimesapiURL).then((res) => {
      this.Crimes = res.data;
    });
    let accidentsapiURL = `http://localhost:3000/accidents/640f8b67baeb85e737070b98`;
    axios.get(accidentsapiURL).then((res) => {
      this.Accidents = res.data;
    });
    let emergenciesapiURL = `http://localhost:3000/emergencys/640f8bbabaeb85e737070b9a`;
    axios.get(emergenciesapiURL).then((res) => {
      this.Emergencies = res.data;
    });
  }
};
</script>


