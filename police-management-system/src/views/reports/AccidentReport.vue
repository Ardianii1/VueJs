<script>
import axios from "axios";
import Joi from "joi";
import { mapGetters, mapState } from 'vuex';
import Flatpickr from 'flatpickr';
import "flatpickr/dist/flatpickr.css";

export default {
    data() {
        return {
            accident: {
                Dateof: '',
                Locationn: '',
                Description: '',
                Injuries: '',
                ContactOfperson: '',
                photo: '',
                photoName: '',
                CreatedAt: '',
                Status: 'visible',
            },
            photoUploadError: '',
            accidentSchema: Joi.object({
                Dateof: Joi.string().min(10).max(100).required(),
                Locationn: Joi.string().min(3).max(30).required(),
                Description: Joi.string().max(100),
                Injuries: Joi.string().max(100),
                ContactOfperson: Joi.string().max(100),
                photo: Joi.any(),
                photoName: Joi.string().regex(/^(\d{2})(\d{2})(\d{4}):(\d{2})(\d{2})\.(jpeg|png)$/).required(),
                CreatedAt: Joi.any(),
                Status: Joi.string().max(30),
            }),
            errors: {},
        }
    },
    methods: {
        async handleCreateAccident() {
            console.log(this.accident)
            this.errors = {};
            console.log(this.accident.CreatedAt)
            let apiURL = "http://localhost:3000/accidents/create";
            const { error, value } = this.accidentSchema.validate(this.accident, { abortEarly: false });
            if (error) {
                error.details.forEach((detail) => {
                    console.log(this.errors)
                    this.errors[detail.path[0]] = detail.message;
                });
                return;
            }
            const formData = new FormData();
            formData.append('Dateof', this.accident.Dateof);
            formData.append('Locationn', this.accident.Locationn);
            formData.append('Description', this.accident.Description);
            formData.append('Injuries', this.accident.Injuries);
            formData.append('ContactOfperson', this.accident.ContactOfperson);
            formData.append('photo', this.$refs.fileInput.files[0]);
            formData.append('photoName', this.accident.photoName);
            formData.append('Status', this.accident.Status);

            const response = await axios.post(apiURL, formData, {})
            console.log(this.currentUserEmail)
            // this.$router.push("/admin/accident");
        },
        validateFile(event) {
            const file = event.target.files[0];
            if (!file.type.includes('image/')) {
                alert('Invalid file type. Please upload a JPEG or PNG file.');
                this.$refs.fileInput.value = '';
                return;
            }
            this.accident.photo = file;
            function generateFileName() {
                const date = new Date();
                const day = date.getDate().toString().padStart(2, '0');
                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                const year = date.getFullYear().toString();
                const hours = date.getHours().toString().padStart(2, '0');
                const minutes = date.getMinutes().toString().padStart(2, '0');
                return `${day}${month}${year}:${hours}${minutes}`;
            }
            this.accident.photoName = `${generateFileName()}.${file.type.split('/')[1]}`;
        },
        clearErrors() {
            this.errors = {};
        },
    },
    computed: {
        ...mapGetters(['username', 'currentUserEmail']),
    },
    mounted() {
        const options = {
            dateFormat: "d-m-Y H:i",
            maxDate: "today",
            enableTime: true,
        };
        const dateInput = this.$refs.dateInput;
        this.datePicker = new Flatpickr(dateInput, options);
    }
}

</script>
<template >
    <div>
        <div class="flex justify-center pt-10 ">
            <form @submit.prevent="handleCreateAccident" enctype="multipart/form-data"
                class="w-5/6 lg:w-4/6 xl:w-3/6 flex border-2 border-gray-600 bg-gray-700 p-6 rounded-xl flex-col justify-center">
                <div class="text-center text-gray-400 text-lg py-3">
                    <h2>Report an Accident</h2>
                </div>
                <!-- <div class="relative z-0 w-full mb-6 group">
                    <select v-model="accident.Type" name="type" id="type"
                        class="bg-gray-50 border-0 border-b-2 border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-300 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="">Select the type of the accident</option>
                        <option value="theft">Theft</option>
                        <option value="assault">Assault</option>
                        <option value="vandalism">Vandalism</option>
                    </select>
                    <div v-if="this.errors.Type" class="text-red-500">{{ this.errors.Type }}</div>
                </div> -->
                <div class="relative z-0 w-full mb-6 group">
                    <input type="text" v-model="accident.Dateof" name="dateof" id="dateof" ref="dateInput"
                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" " />
                    <label for="Dateof"
                        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Date
                        of the accident</label>
                    <div v-if="this.errors.Dateof" class="text-red-500">{{ this.errors.Dateof }}</div>
                </div>
                <div class="relative z-0 w-full mb-6 group">
                    <input type="text" v-model="accident.Locationn" name="Locationn" id="Locationn"
                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" " />
                    <label for="floating_Locationn"
                        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Location</label>
                    <div v-if="this.errors.Locationn" class="text-red-500">{{ this.errors.Locationn }}</div>
                </div>
                <div class="grid md:grid-cols-2 md:gap-6">
                    <div class="relative z-0 w-full mb-6 group">
                        <input type="text" v-model="accident.Description" name="Description" id="Description"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" " />
                        <label for="Description"
                            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Description</label>
                        <div v-if="this.errors.Description" class="text-red-500">{{ this.errors.Description }}</div>
                    </div>
                    <div class="relative z-0 w-full mb-6 group">
                        <input type="text" v-model="accident.Injuries" name="Injuries" id="Injuries"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" " />
                        <label for="Injuries"
                            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Injuries</label>
                        <div v-if="this.errors.Injuries" class="text-red-500">{{ this.errors.Injuries }}</div>
                    </div>
                </div>
                <div class="grid md:grid-cols-2 md:gap-6">
                    <div class="relative z-0 w-full mb-6 group">
                        <input type="text" v-model="accident.ContactOfperson" name="ContactOfperson" id="ContactOfperson"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" " />
                        <label for="ContactOfperson"
                            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Your
                            contact info(optional)</label>
                        <div v-if="this.errors.ContactOfperson" class="text-red-500">{{
                            this.errors.ContactOfperson }}</div>
                    </div>
                    <div class="relative z-0 w-full mb-6 group">
                        <input type="file" v-on:change="validateFile" name="photo" ref="fileInput" id="photo"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" " />
                        <label for="photo"
                            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Photo/Video</label>
                        <div v-if="this.errors.photo" class="text-red-500">{{ this.errors.photo }}</div>
                    </div>
                </div>
                <div class="flex justify-end w-full">
                    <router-link :to="`/`">
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
        </div>
    </div>
</template>
<style ></style>