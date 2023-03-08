<template>
    <section class="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
        <div class="md:ml-64 h-screen pt-0 px-4 lg:px-12">
            <!-- Start coding here -->
            <div class="bg-white dark:bg-gray-800 mb-3 relative shadow-md sm:rounded-lg overflow-hidden">
                <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                    <div class="w-full md:w-1/2">
                        <form @submit.prevent="search" class="flex items-center">
                            <label for="simple-search" class="sr-only">Search</label>
                            <div class="relative w-full">
                                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400"
                                        fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd"
                                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </div>
                                <input v-model="searchKeyword" type="text" id="simple-search"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block md:w-full w-1/2 pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Search" required="">
                            </div>
                        </form>
                    </div>
                    <div
                        class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                        <router-link to="/admin/evidence/create">
                            <button type="button"
                                class="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                                    stroke="currentColor" class="w-5 h-5 mr-2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                                Add new
                            </button>
                        </router-link>
                    </div>
                </div>
                <div class="overflow-x-hidden ">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 overflow-x-hidden">
                        <thead
                            class="w-full text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr class="">
                                <th scope="col" class="px-4 py-3">
                                    <a href="#" @click="sortByy('identifier')" class="flex"><svg
                                            xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 ml-1" aria-hidden="true"
                                            fill="currentColor" viewBox="0 0 320 512">
                                            <path
                                                d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                                        </svg>Identifier</a>
                                </th>
                                <th scope="col" class="px-4 py-3">
                                    <a href="#" @click="sortByy('caseNumber')" class="flex"><svg
                                            xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 ml-1" aria-hidden="true"
                                            fill="currentColor" viewBox="0 0 320 512">
                                            <path
                                                d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                                        </svg>CaseNumber</a>
                                </th>
                                <th scope="col" class="px-4 py-3">
                                    <a href="#" @click="sortByy('createdBy')" class="flex"><svg
                                            xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 ml-1" aria-hidden="true"
                                            fill="currentColor" viewBox="0 0 320 512">
                                            <path
                                                d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                                        </svg>CreatedBy</a>
                                </th>
                                <th scope="col" class="px-4 py-3">
                                    <a href="#" @click="sortByy('createdAt')" class="flex"><svg
                                            xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 ml-1" aria-hidden="true"
                                            fill="currentColor" viewBox="0 0 320 512">
                                            <path
                                                d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                                        </svg>CreatedAt</a>
                                </th>
                                <th scope="col" class="px-4 py-3">Action</th>
                                <th scope="col" class="px-4 py-3">
                                    <span class="sr-only">Actions</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody class="">
                            <tr v-for="evidences in itemsToDisplay" :key="evidences.id"
                                class="border-b dark:border-gray-700 overflow-x-scroll">
                                <td class="px-4 py-3 dark:text-white truncate">{{ evidences.identifier }}</td>
                                <td class="px-4 py-3 truncate">{{ evidences.caseNumber }}</td>
                                <td class="px-4 py-3 truncate">{{ evidences.createdBy }}</td>
                                <td class="px-4 py-3 truncate">{{ evidences.createdAt }}</td>
                                <td class="px-4 py-3 truncate text-right ">
                                    <router-link :to="`/admin/evidence/transfer/${evidences._id}`"
                                        class="inline-flex items-center mr-3 px-3 py-2 text-sm font-medium text-center text-white bg-slate-600 hover:bg-slate-700 rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mr-2">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                                        </svg>Transfer</router-link>
                                    <router-link :to="`/admin/evidence/details/${evidences._id}`"
                                        class="inline-flex items-center mr-3 px-3 py-2 text-sm font-medium text-center text-white bg-slate-600 hover:bg-slate-700 rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mr-2">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>Details</router-link>
                                    <router-link :to="`/admin/evidence/edit/${evidences._id}`"
                                        class="inline-flex items-center mr-3 px-3 py-2 text-sm font-medium text-center text-white bg-green-600 hover:bg-green-800 rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000svg">
                                            <path
                                                d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2828z">
                                            </path>
                                            <path fill-rule="evenodd"
                                                d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                                                clip-rule="evenodd"></path>
                                        </svg>Edit</router-link>
                                    <button type="button" @click="handleDeleteEvidence(evidences._id)"
                                        data-modal-toggle="delete-user-modal"
                                        class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900">
                                        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd"
                                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                clip-rule="evenodd"></path>
                                        </svg>Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <nav class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
                    aria-label="Table navigation">
                    <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
                        Showing
                        <span class="font-semibold text-gray-900 dark:text-white">1-{{ pageSize }}</span>
                        of
                        <span class="font-semibold text-gray-900 dark:text-white">{{ evidences.length }}</span>
                    </span>
                    <ul class="inline-flex items-stretch -space-x-px">
                        <li>
                            <button type="button"
                                class="cursor-pointer flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                :disabled="currentPage === 1" @click="prevPage"><span class="sr-only">Previous</span><svg
                                    class="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                        clip-rule="evenodd" />
                                </svg></button>
                        </li>
                        <span v-for="pageNumber in pagesToShow" :key="pageNumber">
                            <button
                                class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                @click="currentPage = pageNumber" :class="{ active: currentPage === pageNumber }">{{
                                    pageNumber }}</button>
                        </span>
                        <li>
                            <button type="button"
                                class="cursor-pointer flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                :disabled="currentPage === totalPages" @click="nextPage"><span
                                    class="sr-only">Next</span><svg class="w-5 h-5" aria-hidden="true" fill="currentColor"
                                    viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                        clip-rule="evenodd" />
                                </svg></button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </section>
</template>
<script>
import { mapState } from "vuex";
import axios from "axios"

export default {
    name: "Evidences",
    data() {
        return {
            allevidences: [this.$store.dispatch("fetchEvidences")],
            sortBy: 'createdAt',
            sortDirection: -1,
            ignoredProperties: ['_id', '__v'],
            searchKeyword: '',
            filterTimeout: null,
            pageSize: 7,
            currentPage: 1,
        };
    },
    methods: {
        async handleDeleteEvidence(id) {
            // console.log(this.fileName)
            let apiURL = `http://localhost:3000/evidences/delete/${id}`;
            let indexOfArrayItem = this.evidences.findIndex((i) => i._id === id);
            let fileName = this.evidences[indexOfArrayItem].photoName
            console.log(fileName)
            if (window.confirm("Do you really want to delete?")) {
                try {
                    await axios.put(apiURL, { data: { fileName } });
                    this.evidences.splice(indexOfArrayItem, 1);
                } catch (error) {
                    console.error(error);
                }
            }
        },
        sortByy(property) {
            if (this.sortBy === property) {
                this.sortDirection *= -1;
            } else {
                this.sortBy = property;
                this.sortDirection = 1;
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        }
    },
    computed: {
        ...mapState(["evidences"]),
        filteredEvidences() {
            return this.evidences
                .filter((evidence) => {
                    const fields = ['identifier', 'createdBy', 'caseNumber',]; // replace with actual fields
                    for (const field of fields) {
                        if (evidence[field].toLowerCase().includes(this.searchKeyword.toLowerCase())) {
                            return true;
                        }
                    }
                    return false;
                })
                .sort((a, b) => {
                    if (a[this.sortBy] > b[this.sortBy]) return 1 * this.sortDirection;
                    if (a[this.sortBy] < b[this.sortBy]) return -1 * this.sortDirection;
                    return 0;
                });
        },
        totalPages() {
            return Math.ceil(this.evidences.length / this.pageSize);
        },
        pagesToShow() {
            const maxPageButtons = 5;
            const middlePage = Math.floor(maxPageButtons / 2) + 1;

            if (this.totalPages <= maxPageButtons) {
                return Array.from({ length: this.totalPages }, (_, i) => i + 1);
            } else if (this.currentPage <= middlePage) {
                return Array.from({ length: maxPageButtons }, (_, i) => i + 1);
            } else if (this.currentPage > this.totalPages - middlePage) {
                return Array.from({ length: maxPageButtons }, (_, i) => this.totalPages - maxPageButtons + i + 1);
            } else {
                const startPage = this.currentPage - middlePage + 2;
                return Array.from({ length: maxPageButtons }, (_, i) => startPage + i);
            }
        },
        itemsToDisplay() {
            const startIndex = (this.currentPage - 1) * this.pageSize;
            const endIndex = startIndex + this.pageSize;
            return this.filteredEvidences.slice(startIndex, endIndex);
        }
    },
    created() {
        this.$store.dispatch("fetchEvidences");
    },
};
</script>


