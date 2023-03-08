<script>
import axios from "axios";
import Joi from "joi";
import { mapGetters, mapState } from 'vuex';
import AdminSideBar from "../../../components/AdminSideBar.vue";

export default {
    components: {
        AdminSideBar
    },
    data() {
        return {
            evidence: {
                identifier: '',
                description: '',
                caseNumber: '',
                notes: '',
                storageLocation: '',
                handlingInstructions: '',
                photo: '',
                photoName: '',
                createdBy: this.currentUserEmail,
                createdAt: '',
                status: 'visible',
            },
            photoUploadError: '',
            evidenceSchema: Joi.object({
                identifier: Joi.string().min(3).max(30).required(),
                description: Joi.string().min(10).max(100).required(),
                caseNumber: Joi.string().min(3).max(30).required(),
                notes: Joi.string().max(100),
                storageLocation: Joi.string().max(100),
                handlingInstructions: Joi.string().max(100),
                photo: Joi.any().required(),
                photoName: Joi.string().regex(/^(\d{2})(\d{2})(\d{4}):(\d{2})(\d{2})\.(jpeg|png)$/).required(),
                createdBy: Joi.string().max(100),
                createdAt: Joi.any(),
                status: Joi.string().max(30),
            }),
            errors: {},
        }
    },
    methods: {
        async handleCreateEvidence() {
            console.log(this.evidence)
            this.errors = {};
            console.log(this.evidence.createdAt)
            let apiURL = "http://localhost:3000/evidences/create";
            const { error, value } = this.evidenceSchema.validate(this.evidence, { abortEarly: false });
            if (error) {
                error.details.forEach((detail) => {
                    console.log(this.errors)
                    this.errors[detail.path[0]] = detail.message;
                });
                return;
            }
            const formData = new FormData();
            formData.append('identifier', this.evidence.identifier);
            formData.append('description', this.evidence.description);
            formData.append('caseNumber', this.evidence.caseNumber);
            formData.append('notes', this.evidence.notes);
            formData.append('storageLocation', this.evidence.storageLocation);
            formData.append('handlingInstructions', this.evidence.handlingInstructions);
            formData.append('photo', this.$refs.fileInput.files[0]);
            formData.append('photoName', this.evidence.photoName);
            formData.append('createdBy', this.currentUserEmail);
            formData.append('status', this.evidence.status);

            console.log(this.evidence.createdBy)
            const response = await axios.post(apiURL, formData, {})
            console.log(this.currentUserEmail)
            // this.$router.push("/admin/evidence");
        },
        validateFile(event) {
            const file = event.target.files[0];
            if (!file.type.includes('image/')) {
                alert('Invalid file type. Please upload a JPEG or PNG file.');
                this.$refs.fileInput.value = '';
                return;
            }
            this.evidence.photo = file;
            function generateFileName() {
                const date = new Date();
                const day = date.getDate().toString().padStart(2, '0');
                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                const year = date.getFullYear().toString();
                const hours = date.getHours().toString().padStart(2, '0');
                const minutes = date.getMinutes().toString().padStart(2, '0');
                return `${day}${month}${year}:${hours}${minutes}`;
            }
            this.evidence.photoName = `${generateFileName()}.${file.type.split('/')[1]}`;
        },
        clearErrors() {
            this.errors = {};
        },
    },
    computed: {
        ...mapGetters(['username', 'currentUserEmail']),
    },
}

</script>
<template >
    <div>
        <router-link :to="`/admin/evidence`">
            <button type="button" class="bg-gray-800 text-white py-2 px-4 my-2 mx-2 rounded-lg">
                Back
            </button>
        </router-link>
        <div class="flex justify-center pt-0 ">
            <form @submit.prevent="handleCreateEvidence" enctype="multipart/form-data"
                class="w-5/6 lg:w-4/6 xl:w-3/6 flex border-2 border-gray-600 bg-gray-700 p-6 rounded-xl flex-col justify-center">
                <div class="text-center text-gray-400 text-lg py-3">
                    <h2>Create an Evidence</h2>
                </div>
                <div class="relative z-0 w-full mb-6 group">
                    <input type="text" v-model="evidence.identifier" name="identifier" id="identifier"
                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" " />
                    <label for="identifier"
                        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Identifier</label>
                    <div v-if="this.errors.identifier" class="text-red-500">{{ this.errors.identifier }}</div>
                </div>
                <div class="relative z-0 w-full mb-6 group">
                    <input type="text" v-model="evidence.caseNumber" name="caseNumber" id="caseNumber"
                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" " />
                    <label for="caseNumber"
                        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Case
                        Number</label>
                    <div v-if="this.errors.caseNumber" class="text-red-500">{{ this.errors.caseNumber }}</div>
                </div>
                <div class="relative z-0 w-full mb-6 group">
                    <input type="text" v-model="evidence.description" name="description" id="floating_description"
                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" " />
                    <label for="floating_description"
                        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Description</label>
                    <div v-if="this.errors.description" class="text-red-500">{{ this.errors.description }}</div>
                </div>
                <div class="grid md:grid-cols-2 md:gap-6">
                    <div class="relative z-0 w-full mb-6 group">
                        <input type="text" v-model="evidence.notes" name="notes" id="notes"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" " />
                        <label for="notes"
                            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Notes</label>
                        <div v-if="this.errors.notes" class="text-red-500">{{ this.errors.notes }}</div>
                    </div>
                    <div class="relative z-0 w-full mb-6 group">
                        <input type="text" v-model="evidence.storageLocation" name="storageLocation" id="storageLocation"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" " />
                        <label for="storageLocation"
                            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Storage
                            Location</label>
                        <div v-if="this.errors.storageLocation" class="text-red-500">{{ this.errors.storageLocation }}</div>
                    </div>
                </div>
                <div class="grid md:grid-cols-2 md:gap-6">
                    <div class="relative z-0 w-full mb-6 group">
                        <input type="text" v-model="evidence.handlingInstructions" name="handlingInstructions"
                            id="handlingInstructions"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" " />
                        <label for="handlingInstructions"
                            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Handling
                            Instructions</label>
                    <div v-if="this.errors.handlingInstructions" class="text-red-500">{{
                        this.errors.handlingInstructions }}</div>
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
                <router-link :to="`/admin/evidence`">
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
</div></template>
<style ></style>