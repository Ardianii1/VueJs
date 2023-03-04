<template>
    <div>
        <router-link :to="`/admin/evidence`">
            <button type="button" class="bg-gray-800 text-white py-2 px-4 my-2 mx-2 rounded-lg">
                Back
            </button>
        </router-link>
        <div class="max-w-3xl mx-auto py-8">
            <div class="flex flex-col sm:flex-row justify-center mb-8 bg-slate-200 p-3 rounded-lg">
                <div class="w-full sm:w-1/2 ">
                    <img v-bind:src="photoUrl" alt="Photo" class="w-full h-auto object-cover rounded-lg shadow-md">
                </div>
                <div class="w-full sm:w-1/2 pl-8 ">
                    <h2 class="text-3xl font-bold mb-2">{{ Evidence.identifier }}</h2>
                    <div class="flex flex-col">
                        <div class="flex items-center mb-2">
                            <span class="font-bold mr-2">CaseNumber:</span> {{ Evidence.caseNumber }}
                        </div>
                        <div class="flex items-center mb-2">
                            <span class="font-bold mr-2">Description:</span> {{ Evidence.description }}
                        </div>
                        <div class="flex items-center mb-2">
                            <span class="font-bold mr-2">Notes:</span> {{ Evidence.notes }}
                        </div>
                        <div class="flex items-center mb-2">
                            <span class="font-bold mr-2">StorageLocation:</span> {{ Evidence.storageLocation }}
                        </div>
                        <div class="flex items-center mb-2">
                            <span class="font-bold mr-2">HandlingInstructions:</span> {{ Evidence.handlingInstructions }}
                        </div>
                        <div class="flex items-center mb-2">
                            <span class="font-bold mr-2">Created By:</span> {{ Evidence.createdBy }}
                        </div>
                        <div class="flex items-center">
                            <span class="font-bold mr-2">Date:</span> {{ formattedDate() }}
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
            Evidence: {},
        }
    },
    methods: {
        formattedDate() {
            const date = this.Evidence.createdAt
            const options = {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            };
            return date;
        },
    },
    created() {
        let apiURL = `http://localhost:3000/evidences/${this.$route.params.id}`;

        axios.get(apiURL).then((res) => {
            this.Evidence = res.data;
            // console.log(res.data)
        });
    },
    computed: {

        photoUrl() {
            return `http://localhost:3000/uploads/evidences/${this.Evidence.photoName}`; 
        }
    }
}
</script>
<style></style>