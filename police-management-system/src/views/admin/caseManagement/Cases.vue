<template>
  <div class="flex justify-center">  
    <div class="relative mt-5 w-[90%]  overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr class="flex justify-between p-3">
                    <th scope="col" class="py-3">
                        <div class="flex items-center">
                            <a href="#" @click="sortByy('casenumber')" class="flex"><svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512"><path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"/></svg>Case Number</a>
                        </div>
                    </th>
                    <th scope="col" class="px-6 py-3">
                        <div class="flex items-center">
                            <a href="#" @click="sortByy('date')" class="flex"><svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512"><path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"/></svg>Date</a>
                        </div>
                    </th>
                    <th scope="col" class="px-6 py-3">
                        <div class="flex items-center">
                            
                            <a href="#" @click="sortByy('description')" class="flex"><svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512"><path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"/></svg>Description</a>
                        </div>
                    </th>
                    <th scope="col" class="px-6 py-3">
                        <div class="flex items-center">
                            <a href="#" @click="sortByy('location')" class="flex"><svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512"><path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"/></svg>Location</a>
                        </div>
                    </th>
                    <th scope="col" class="px-6 py-3">
                        <div class="flex items-center">
                        <router-link to="/admin/case-management/create">
                          <button class="bg-indigo-500 text-white  py-2 px-4 rounded-lg hover:bg-indigo-600">
                            create
                          </button>
                        </router-link>
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="casee in sortedCases" :key="casee.id" class="flex justify-between bg-white border-b dark:bg-gray-800 dark:border-gray-700 ">
                    <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white ">
                        {{ casee.casenumber }}
                    </td>
                    <td class="px-6 py-4 ">
                        {{ casee.date }}
                    </td>
                    <td class="px-6 py-4 ">
                        {{ casee.description }}
                    </td>
                    <td class="px-6 py-4 ">
                        {{ casee.location }}
                    </td>
                    <td class="px-6 py-4 text-right ">
                        <router-link :to="`/admin/case-management/edit/${casee._id}`"  class="inline-flex items-center mr-3 px-3 py-2 text-sm font-medium text-center text-white bg-green-600 rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2828z"></path><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path></svg>Edit</router-link>
                        <button type="button" @click="handleDeleteCase(casee._id)" data-modal-toggle="delete-user-modal" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900">
                          <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
// import store from "../../../store/case";
import axios from "axios"

export default {
  data() {
    return {
      allcases: this.$store.dispatch("fetchCases"),
      sortBy: 'casenumber',
      sortDirection: 1
    };
  },
  methods: {
    handleDeleteCase(id) {
      let apiURL = `http://localhost:3000/cases/${id}`;
      let indexOfArrayItem = this.cases.findIndex((i) => i._id === id);
      if (window.confirm("Do you really want to delete?")) {
        axios
          .delete(apiURL)
          .then(() => {
            this.cases.splice(indexOfArrayItem, 1);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    sortByy(property) {
      if (this.sortBy === property) {
        this.sortDirection *= -1;
      } else {
        this.sortBy = property;
        this.sortDirection = 1;
      }
    }
  },
  computed: {
    ...mapState(["cases"]),
    sortedCases() {
      return this.cases.sort((a, b) => {
        if (a[this.sortBy] > b[this.sortBy]) return 1 * this.sortDirection;
        if (a[this.sortBy] < b[this.sortBy]) return -1 * this.sortDirection;
        return 0;
      });
    }
  },
  created() {
    this.$store.dispatch("fetchCases");
  },
};
</script>


