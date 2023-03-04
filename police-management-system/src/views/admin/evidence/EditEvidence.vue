<script>
import axios from 'axios';
import Joi from "joi";
export default {
  data() {
    return {
      newEvidence: {
        // _id:'',
        identifier: '',
        description: '',
        caseNumber: '',
        notes: '',
        storageLocation: '',
        handlingInstructions: '',
      },
      errors: {},
    }
  },
  methods: {
    async handleEditEvidence() {
      console.log(this.newEvidence)
      const response = await axios.put(`http://localhost:3000/evidences/${this.$route.params.id}`, this.newEvidence, {
        headers: {
          "Content-Type": "application/json",
        }
      });
      this.$router.push("/admin/evidence");
    }
  },
  created() {
    let apiURL = `http://localhost:3000/evidences/${this.$route.params.id}`;

    axios.get(apiURL).then((res) => {
      this.newEvidence = res.data;
    });
  },
}
</script>
<template >
  <router-link :to="`/admin/evidence`">
    <button type="button" class="bg-gray-800 text-white py-2 px-4 my-2 mx-2 rounded-lg">
      Back
    </button>
  </router-link>
  <div class="flex py-3 justify-center items-center  ">
    <form @submit.prevent="handleEditEvidence"
      class="p-4 mb-4 w-1/2 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-800 sm:p-6 dark:bg-gray-700">
      <div class="text-center text-white text-lg py-3">
        <h2>Edit an Evidence</h2>
      </div>
      <div class="grid gap-3 mb-6 md:grid-cols-2">
        <div>
          <label for="identifier" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Identifier</label>
          <input v-model="newEvidence.identifier" type="text" id="identifier"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-300 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Case Number" required>
          <div v-if="this.errors.identifier" class="text-red-500">{{ this.errors.identifier }}</div>

        </div>
        <div>
          <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
          <input v-model="newEvidence.description" type="text" id="datetime"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-300 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Doe" required>
          <div v-if="this.errors.description" class="text-red-500">{{ this.errors.description }}</div>

        </div>
        <div>
          <label for="company" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">CaseNumber</label>
          <input v-model="newEvidence.caseNumber" type="text" id="location"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-300 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Location" required>
          <div v-if="this.errors.caseNumber" class="text-red-500">{{ this.errors.caseNumber }}</div>

        </div>
        <div>
          <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Notes</label>
          <input v-model="newEvidence.notes" type="text" id="phone"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-300 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Description" required>
          <div v-if="this.errors.notes" class="text-red-500">{{ this.errors.notes }}</div>

        </div>
        <div>
          <label for="website"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">StorageLocation</label>
          <input v-model="newEvidence.storageLocation" type="text" id="website"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-300 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Involved parties.com" required>
          <div v-if="this.errors.storageLocation" class="text-red-500">{{ this.errors.storageLocation }}</div>

        </div>
        <div>
          <label for="visitors"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">HandlingInstructions</label>
          <input v-model="newEvidence.handlingInstructions" name="status" id="status"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-300 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <div v-if="this.errors.handlingInstructions" class="text-red-500">{{ this.errors.handlingInstructions }}</div>

        </div>
      </div>
      <button type="sumbit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
      <router-link :to="`/admin/evidence`"><button type="reset"
          class="text-white bg-red-700 hover:bg-red-800 focus:ring-2 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto ml-3 px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 ">Cancel</button></router-link>
    </form>

  </div>
</template>

<style ></style>