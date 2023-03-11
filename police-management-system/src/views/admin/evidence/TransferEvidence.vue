<template>
    <div>
        <router-link :to="`/admin/evidence`">
            <button type="button" class="bg-gray-800 text-white py-2 px-4 my-2 mx-2 rounded-lg">
                Back
            </button>
        </router-link>
        <div class="flex justify-center pt-0 ">
                <form @submit.prevent="handleTransferEvidence" enctype="multipart/form-data"
                    class="w-5/6 lg:w-4/6 xl:w-3/6 flex border-2 border-gray-600 bg-gray-700 p-6 rounded-xl flex-col justify-center">
                    <div class="text-center text-gray-400 text-lg py-3">
                        <h2>Transfer Evidence</h2>
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
                    <div class="relative z-0 w-full mb-6 group">
                        <input type="text" v-model="newEvidence.newOfficer" name="newOfficer"
                            id="newOfficer"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" " />
                        <label for="newOfficer"
                            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Assigned Officier</label>
                        <div v-if="this.errors.newOfficer" class="text-red-500">{{ this.errors.newOfficer }}
                        </div>
                    </div>
                </div>
                <div class="flex justify-end w-full">
                    <router-link :to="`/admin/evidence`">
                        <button type="reset"
                            class="text-white mr-3 bg-red-700 hover:bg-red-800 focus:ring-2 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto ml-3 px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 ">
                            Cancel
                        </button>
                    </router-link>
                    <button type="submit"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Submit
                    </button>
                </div>
            </form>
            </div>
    </div>
</template>
<script>
import axios from 'axios';
import 'firebase/auth';
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
                createdBy: '',
                newOfficer: '',
            },
            errors: {},
        }
    },
    methods: {
        async handleTransferEvidence() {
            try {
                const response = await axios.put(`http://localhost:3000/evidences/transfer/${this.$route.params.id}`, this.newEvidence, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                this.$router.push('/admin/evidence');
            } catch (error) {
                console.error(error);
            }
        }
    },
    created() {
        let apiURL = `http://localhost:3000/evidences/${this.$route.params.id}`;

        axios.get(apiURL).then((res) => {
            this.newEvidence = res.data;
            this.newEvidence.newOfficer = this.newEvidence.createdBy
        });
    },
    computed: {
    }
}
</script>
<style></style>