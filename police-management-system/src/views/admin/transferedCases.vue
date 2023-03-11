<template>
    <section class="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
        <div class="md:ml-64 h-screen pt-0 px-4 lg:px-12">
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
                </div>
                <div class="overflow-x-hidden ">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 overflow-x-hidden">
                        <thead
                            class="w-full text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr class="">
                                <th scope="col" class="px-4 py-3">
                                    <a href="#" @click="sortByy('transferDate')" class="flex"><svg
                                            xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 ml-1" aria-hidden="true"
                                            fill="currentColor" viewBox="0 0 320 512">
                                            <path
                                                d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                                        </svg>Transfer Date</a>
                                </th>
                                <th scope="col" class="px-4 py-3">
                                    <a href="#" @click="sortByy('transferedFrom')" class="flex"><svg
                                            xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 ml-1" aria-hidden="true"
                                            fill="currentColor" viewBox="0 0 320 512">
                                            <path
                                                d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                                        </svg>Transfered From</a>
                                </th>
                                <th scope="col" class="px-4 py-3">
                                    <a href="#" @click="sortByy('transferedTo')" class="flex"><svg
                                            xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 ml-1" aria-hidden="true"
                                            fill="currentColor" viewBox="0 0 320 512">
                                            <path
                                                d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                                        </svg>Transfered To</a>
                                </th>
                                <th scope="col" class="px-4 py-3">
                                    <a href="#" @click="sortByy('caseNumber')" class="flex"><svg
                                            xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 ml-1" aria-hidden="true"
                                            fill="currentColor" viewBox="0 0 320 512">
                                            <path
                                                d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                                        </svg>CaseNumber</a>
                                </th>
                                <th scope="col" class="px-4 py-3">Action</th>
                                <th scope="col" class="px-4 py-3">
                                    <span class="sr-only">Actions</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody class="">
                            <tr v-for="casesss in itemsToDisplay" :key="casesss.id"
                                class="border-b dark:border-gray-700 overflow-x-scroll">
                                <td class="px-4 py-3 dark:text-white truncate">{{ casesss.transferDate }}</td>
                                <td class="px-4 py-3 truncate">{{ casesss.transferedFrom }}</td>
                                <td class="px-4 py-3 truncate">{{ casesss.transferedTo }}</td>
                                <td class="px-4 py-3 truncate">{{ casesss.caseNumber }}</td>
                                <td class="px-4 py-3 truncate text-right ">
                                    <button type="button" @click="handleDeleteCase(casesss._id)"
                                        data-modal-toggle="delete-user-modal"
                                        class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900">
                                        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd"
                                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                clip-rule="evenodd">
                                            </path>
                                        </svg>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <nav class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
                    aria-label="Table navigation">
                    <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
                        Showing
                        <span class="font-semibold text-gray-900 dark:text-white">1-{{ casesss.length < pageSize ?
                            casesss.length : pageSize }}</span>
                                of
                                <span class="font-semibold text-gray-900 dark:text-white">{{ casesss.length }}</span>
                        </span>
                        <ul class="inline-flex items-stretch -space-x-px">
                            <li>
                                <button type="button"
                                    class="cursor-pointer flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                    :disabled="currentPage === 1" @click="prevPage"><span
                                        class="sr-only">Previous</span><svg class="w-5 h-5" aria-hidden="true"
                                        fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
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
                                        class="sr-only">Next</span><svg class="w-5 h-5" aria-hidden="true"
                                        fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
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
    name: "Casesss",
    data() {
        return {
            casesss: {},
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
        async handleDeleteCase(id) {
            console.log(this.casesss.id)
            // console.log(this.fileName)
            let apiURL = `http://localhost:3000/cases/deletetransfered/transfered/${id}`;
            let indexOfArrayItem = this.casesss.findIndex((i) => i._id === id);
            let fileName = this.casesss[indexOfArrayItem].photoName
            if (window.confirm("Do you really want to delete?")) {
                try {
                    await axios.put(apiURL);
                    this.casesss.splice(indexOfArrayItem, 1);
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
        // ...mapState(["transferedCases"]),
        filteredCasesss() {
            console.log(this.casesss)
            return this.casesss
                .filter((casee) => {
                    const fields = ['transferDate', 'transferedFrom', 'transferedTo', 'caseNumber'];
                    for (const field of fields) {
                        if (casee[field].toLowerCase().includes(this.searchKeyword.toLowerCase())) {
                            console.log(casee[field])
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
            return Math.ceil(this.casesss.length / this.pageSize);
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
            return this.filteredCasesss.slice(startIndex, endIndex);
        },

    },
    created() {
        let apiURL = `http://localhost:3000/cases/transfered/`;
        axios.get(apiURL).then((res) => {
            this.casesss = res.data;
        });
    },
};
</script>


