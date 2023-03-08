<script>
import axios from 'axios';
import Flatpickr from 'flatpickr';
import "flatpickr/dist/flatpickr.css";
export default {
    data() {
        return {
            newCase: {
                casenumber: '',
                dateof: '',
                location: '',
                description: '',
                parties: '',
                status: '',
                notes: '',
            },
            errors: {},
        }
    },
    methods: {
        async handleEditCase() {
            const response = await axios.put(`http://localhost:3000/cases/${this.$route.params.id}`, this.newCase, {
                headers: {
                    "Content-Type": "application/json",
                }
            });
            this.$router.push("/admin/case-management");
        }
    },
    created() {
        let apiURL = `http://localhost:3000/cases/${this.$route.params.id}`;

        axios.get(apiURL).then((res) => {
            this.newCase = res.data;
        });
    },
    mounted() {
        const options = {
            dateFormat: "d-m-Y H:i",
            maxDate: "today",
            enableTime: true,

            // add additional options here
        };
        const dateInput = this.$refs.dateInput;
        this.datePicker = new Flatpickr(dateInput, options);
    },
}
</script>
<template >
    <router-link :to="`/admin/case-management`">
        <button type="button" class="bg-gray-800 text-white py-2 px-4 my-2 mx-2 rounded-lg">
            Back
        </button>
    </router-link>
    <div class="flex justify-center pt-0 ">
        <form @submit.prevent="handleEditCase" enctype="multipart/form-data"
            class="w-5/6 lg:w-4/6 xl:w-3/6 flex border-2 border-gray-600 bg-gray-700 p-6 rounded-xl flex-col justify-center">
            <div class="text-center text-gray-400 text-lg py-3">
                <h2>Edit Case</h2>
            </div>
            <div class="grid md:grid-cols-2 md:gap-6">
                <div class="relative z-0 w-full mb-6 group">
                    <input type="text" v-model="newCase.casenumber" name="caseNumber" id="caseNumber"
                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" " />
                    <label for="caseNumber"
                        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Case
                        Number</label>
                    <div v-if="this.errors.casenumber" class="text-red-500">{{ this.errors.casenumber }}</div>
                </div>
                <div class="relative z-0 w-full mb-6 group">
                    <input type="text" v-model="newCase.dateof" name="date" id="date" ref="dateInput"
                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" " />
                    <label for="dateof"
                        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Date
                        and time of the incident</label>
                    <div v-if="this.errors.dateof" class="text-red-500">{{ this.errors.dateof }}</div>
                </div>
            </div>
            <div class="relative z-0 w-full mb-6 group">
                <input type="text" v-model="newCase.location" name="location" id="floating_location"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" " />
            <label for="floating_location"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Location
                    of the incident</label>
                <div v-if="this.errors.location" class="text-red-500">{{ this.errors.location }}</div>
            </div>
            <div class="relative z-0 w-full mb-6 group">
                <input type="text" v-model="newCase.description" name="description" id="floating_description"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" " />
                <label for="floating_description"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Description
                    of the incident</label>
                <div v-if="this.errors.description" class="text-red-500">{{ this.errors.description }}</div>
            </div>
            <div class="grid md:grid-cols-2 md:gap-6">
                <div class="relative z-0 w-full mb-6 group">
                    <input type="text" v-model="newCase.parties" name="parties" id="parties"
                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" " />
                    <label for="parties"
                        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Involved
                        parties</label>
                    <div v-if="this.errors.parties" class="text-red-500">{{ this.errors.parties }}</div>
                </div>
                <div class="relative z-0 w-full mb-6 group">
                    <select v-model="newCase.status" name="status" id="status"
                        class="bg-gray-50 border-0 border-b-2 border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-300 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="">Select the status of the case</option>
                        <option value="open">Open</option>
                        <option value="closed">Closed</option>
                        <option value="pending">Pending</option>
                    </select>
                    <div v-if="this.errors.status" class="text-red-500">{{ this.errors.status }}</div>
                </div>

            </div>
            <div class="grid md:grid-cols-2 md:gap-6">
                <div class="relative z-0 w-full mb-6 group">
                    <input type="text" v-model="newCase.notes" name="notes" id="notes"
                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" " />
                    <label for="notes"
                        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Any
                    relevant notes or observations</label>
                <div v-if="this.errors.notes" class="text-red-500">{{ this.errors.notes }}</div>
            </div>
            <!-- <div class="relative z-0 w-full mb-6 group">
                        <input type="file" v-on:change="validateFile" name="photo" ref="fileInput" id="photo" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
                        <label for="photo" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Photo/Video</label>
                        <div v-if="this.errors.photo" class="text-red-500">{{ this.errors.photo }}</div>
                    </div> -->
        </div>
        <div class="flex justify-end w-full">
            <router-link :to="`/admin/case-management`">
                <button type="button" class="bg-gray-800 hover:bg-gray-900 text-white py-2 px-4 mx-2 rounded-lg">
                    Back
                </button>
            </router-link>
            <button type="reset" @click="clearErrors"
                class="text-white mr-3 bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-blue-800">Cancel</button>
            <button type="submit"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </div>
    </form>
</div></template>

<style ></style>