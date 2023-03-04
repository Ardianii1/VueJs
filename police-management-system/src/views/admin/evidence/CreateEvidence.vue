<template >
    <router-link :to="`/admin/evidence`">
        <button type="button" class="bg-gray-800 text-white py-2 px-4 my-2 mx-2 rounded-lg">
            Back
        </button>
    </router-link>

    <div class="flex justify-center items-center h-auto ">
        <form @submit.prevent="handleCreateEvidence" enctype="multipart/form-data"
            class="p-4 mb-4 w-1/2 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-800 sm:p-6 dark:bg-gray-700">
            <div class="text-center text-white text-lg py-3">
                <h2>Create an Evidence</h2>
            </div>
            <div class="grid gap-3 mb-6 md:grid-cols-2 mt-3">
                <div>
                    <label for="identifier" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Evidence
                        Identifier</label>
                    <input v-model="evidence.identifier" type="text" id="identifier" ref="identifier"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-300 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="e.g. serial number">
                    <div v-if="this.errors.identifier" class="text-red-500">{{ this.errors.identifier }}</div>
                </div>
                <div>
                    <label for="description"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description
                        of Evidence</label>
                    <input v-model="evidence.description" type="text" id="description" ref="description"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-300 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Description of Evidence">
                    <div v-if="this.errors.description" class="text-red-500">{{ this.errors.description }}</div>

                </div>
                <div>
                    <label for="casenumber" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Case
                        Number/Incident</label>
                    <input v-model="evidence.caseNumber" type="text" id="casenumber" ref="caseNumber"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-300 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Case Number/Incident">
                    <div v-if="this.errors.caseNumber" class="text-red-500">{{ this.errors.caseNumber }}</div>

                </div>
                <div>
                    <label for="notes"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Notes/Observations</label>
                    <textarea v-model="evidence.notes" id="notes" ref="notes"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-300 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Notes/Observations"></textarea>
                    <div v-if="this.errors.notes" class="text-red-500">{{ this.errors.notes }}</div>

                </div>
                <div>
                    <label for="website" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Storage
                        Location</label>
                    <input v-model="evidence.storageLocation" type="text" id="website" ref="storageLocation"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-300 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Storage Location">
                    <div v-if="this.errors.storageLocation" class="text-red-500">{{ this.errors.storageLocation }}</div>

                </div>
                <div>
                    <label for="visitors" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Handling
                        Instructions</label>
                    <input type="text" v-model="evidence.handlingInstructions" name="handlingInstructions"
                        ref="handlingInstructions" id="handlingInstructions"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-300 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Handling Instructions">
                    <div v-if="this.errors.handlingInstructions" class="text-red-500">{{ this.errors.handlingInstructions }}
                    </div>

                </div>
                <div>
                    <label for="visitors" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Photo</label>
                    <input type="file" v-on:change="validateFile" name="photo" ref="fileInput" id="photo"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-300 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Handling Instructions">
                    <div v-if="this.errors.photo" class="text-red-500">{{ this.errors.photo }}
                    </div>

                </div>
            </div>
            <button type="sumbit"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            <button type="reset"
                class="text-white bg-red-700 hover:bg-red-800 focus:ring-2 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto ml-3 px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 ">Cancel</button>
        </form>

    </div>
</template>
<script>
import axios from "axios";
import Joi from "joi";
import { mapGetters, mapState } from 'vuex';
export default {
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
            // formData.append('createdAt', createdAt);
            formData.append('status', this.evidence.status);
            console.log(this.evidence.createdBy)
            const response = await axios.post(apiURL, formData, {})
            // console.log(response)
            console.log(this.currentUserEmail)
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
    },
    computed: {
        ...mapGetters(['username', 'currentUserEmail']),
    },
}
</script>
<style >
    
</style>