<template>
    <div>
        <router-link :to="`/admin/case-management`">
            <button type="button" class="bg-gray-800 text-white py-2 px-4 my-2 mx-2 rounded-lg">
                Back
            </button>
        </router-link>
        <div class="max-w-3xl mx-auto py-8">
            <div class="flex flex-col sm:flex-row justify-center mb-8 bg-slate-200 p-3 rounded-lg">
                <div class="w-full sm:w-1/2 ">
                    <img v-bind:src="photoUrl" width="372px" height="372px" alt="Photo"
                        class="w-full h-[372px] object-fill  rounded-lg shadow-md">
                </div>
                <div class="w-full sm:w-1/2 pl-8 ">
                    <h2 class="text-3xl font-bold mb-2">CaseNumber: <span>{{ Case.casenumber }}</span></h2>
                    <div class="flex flex-col">
                        <div class="flex items-center mb-2">
                            <span class="font-bold mr-2">Location:</span> {{ Case.location }}
                        </div>
                        <div class="flex items-center mb-2">
                            <span class="font-bold mr-2">Description:</span> {{ Case.description }}
                        </div>
                        <div class="flex items-center mb-2">
                            <span class="font-bold mr-2">Parties:</span> {{ Case.parties }}
                        </div>
                        <div class="flex items-center mb-2">
                            <span class="font-bold mr-2">Notes:</span> {{ Case.notes }}
                        </div>
                        <!-- <div class="flex items-center mb-2">
                            <span class="font-bold mr-2">HandlingInstructions:</span> {{ Case.handlingInstructions }}
                        </div>
                        <div class="flex items-center mb-2">
                            <span class="font-bold mr-2">Created By:</span> {{ Case.createdBy }}
                        </div> -->
                        <div class="flex items-center">
                            <span class="font-bold mr-2">Date:</span> {{ formattedDate() }}
                        </div>
                        <!-- <div class="flex items-center mb-2">
                  <span class="font-bold mr-2">Status:</span> {{ Case.status }}
                </div> -->
                        <div class="flex justify-end mt-12">
                            <router-link :to="`/admin/case-management`">
                                <button type="button" class="bg-gray-800 text-white py-2 px-4 my-2 mx-2 rounded-lg">
                                    Back
                                </button>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
export default {
    data() {
        return {
            Case: {},
            // photoName:Case.photoName,
        }
    },
    methods: {
        formattedDate() {
            const date = this.Case.createdAt
            const options = {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            };
            return date.toLocaleString('en-US', options);
        },
    },
    created() {
        let apiURL = `http://localhost:3000/cases/${this.$route.params.id}`;

        axios.get(apiURL).then((res) => {
            this.Case = res.data;
            // console.log(res.data)
        });
    },
    computed: {

        photoUrl() {
            return `http://localhost:3000/uploads/cases/${this.Case.photoName}`; // Construct the photo URL
        }
    }
}
</script>
<style></style>