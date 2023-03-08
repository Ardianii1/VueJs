<script>
import axios from 'axios';
export default {
  data() {
    return {
      newEvidence: {
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
<!-- <div class="flex py-3 justify-center items-center  bg-slate-300">
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
                    </div>
                    <div>
                          <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                          <input v-model="newEvidence.description" type="text" id="datetime"
                              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-300 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="Doe" required>
                      </div>
                      <div>
                          <label for="company" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">CaseNumber</label>
                          <input v-model="newEvidence.caseNumber" type="text" id="location"
                              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-300 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="Location" required>
                      </div>
                      <div>
                          <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Notes</label>
                          <input v-model="newEvidence.notes" type="text" id="phone"
                              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-300 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="Description" required>
                      </div>
                      <div>
                          <label for="website" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">StorageLocation</label>
                          <input v-model="newEvidence.storageLocation" type="text" id="website"
                              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-300 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="Involved parties.com" required>
                      </div>
                      <div>
                          <label for="visitors" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">HandlingInstructions</label>
                          <input v-model="newEvidence.handlingInstructions" name="status" id="status"
                              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-300 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  </div>
              </div>
              <button type="sumbit"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
              <router-link :to="`/admin/evidence`"><button type="reset"
                      class="text-white bg-red-700 hover:bg-red-800 focus:ring-2 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto ml-3 px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 ">Cancel</button></router-link>
          </form>

          </div> -->






  <div class="flex justify-center pt-0 ">
    <form @submit.prevent="handleEditEvidence" enctype="multipart/form-data"
      class="w-5/6 lg:w-4/6 xl:w-3/6 flex border-2 border-gray-600 bg-gray-700 p-6 rounded-xl flex-col justify-center">
      <div class="text-center text-gray-400 text-lg py-3">
        <h2>Edit Evidence</h2>
      </div>
      <div class="relative z-0 w-full mb-6 group">
        <input type="text" v-model="newEvidence.identifier" name="identifier" id="identifier"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" " />
        <label for="identifier"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Identifier</label>
        <div v-if="this.errors.identifier" class="text-red-500">{{ this.errors.identifier }}</div>
      </div>
      <div class="relative z-0 w-full mb-6 group">
        <input type="text" v-model="newEvidence.caseNumber" name="caseNumber" id="caseNumber"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" " />
        <label for="caseNumber"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Case
          Number</label>
        <div v-if="this.errors.caseNumber" class="text-red-500">{{ this.errors.caseNumber }}</div>
      </div>

      <div class="grid md:grid-cols-2 md:gap-6">
        <div class="relative z-0 w-full mb-6 group">
          <input type="text" v-model="newEvidence.description" name="description" id="floating_description"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" " />
          <label for="floating_description"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Description</label>
          <div v-if="this.errors.description" class="text-red-500">{{ this.errors.description }}</div>
        </div>
        <div class="relative z-0 w-full mb-6 group">
          <input type="text" v-model="newEvidence.notes" name="notes" id="notes"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" " />
          <label for="notes"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Notes</label>
          <div v-if="this.errors.notes" class="text-red-500">{{ this.errors.notes }}</div>
        </div>
        <div class="relative z-0 w-full mb-6 group">
          <input type="text" v-model="newEvidence.storageLocation" name="storageLocation" id="storageLocation"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" " />
          <label for="storageLocation"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Storage
            Location</label>
          <div v-if="this.errors.storageLocation" class="text-red-500">{{ this.errors.storageLocation }}</div>
        </div>
        <div class="relative z-0 w-full mb-6 group">
          <input type="text" v-model="newEvidence.handlingInstructions" name="handlingInstructions"
            id="handlingInstructions"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" " />
          <label for="handlingInstructions"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Handling
            Instructions</label>
          <div v-if="this.errors.handlingInstructions" class="text-red-500">{{ this.errors.handlingInstructions }}
          </div>
        </div>
      </div>
      <div class="flex justify-end w-full">
        <router-link :to="`/admin/evidence`"><button type="reset"
            class="text-white mr-3 bg-red-700 hover:bg-red-800 focus:ring-2 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto ml-3 px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 ">Cancel</button></router-link>
        <button type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
      </div>
    </form>
  </div>
</template>

<style ></style>