<template>
    <section class="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
            <div class="md:ml-64 h-screen pt-0 px-4 lg:px-12">
                <!-- Start coding here -->
                <div class="bg-white dark:bg-gray-800 mb-3 relative shadow-md sm:rounded-lg overflow-hidden">
                    <h3 class="text-white text-center py-3 font-bold tracking-widest">Users</h3>
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
                                        <a href="#" @click="sortByy('email')" class="flex"><svg
                                                xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 ml-1" aria-hidden="true"
                                                fill="currentColor" viewBox="0 0 320 512">
                                                <path
                                                    d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                                            </svg>Email</a>
                                    </th>
                                    <th scope="col" class="px-4 py-3">
                                        <a href="#" @click="sortByy('customClaims.role')" class="flex"><svg
                                                xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 ml-1" aria-hidden="true"
                                                fill="currentColor" viewBox="0 0 320 512">
                                                <path
                                                    d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                                            </svg>Role</a>
                                    </th>
                                    <th scope="col" class="px-4 py-3">
                                        <span class="sr-only">Actions</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="">
                                <tr v-for="user in users" :key="user.uid"
                                    class="border-b dark:border-gray-700 overflow-x-scroll">
                                    <td class="px-4 py-3 dark:text-white truncate">{{ user.email }}</td>
                                     <td class="px-4 py-3 truncate">{{ user.customClaims.role }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <nav class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
                        aria-label="Table navigation">
                        <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
                            Showing
                            <span class="font-semibold text-gray-900 dark:text-white">1-{{ users.length>7? pageSize:users.length }}</span>
                            of
                            <span class="font-semibold text-gray-900 dark:text-white">{{ users.length }}</span>
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
    import axios from "axios";
export default {
    name: "users",
    data() {
        return {
            users: [],
            pageSize: 7,
            currentPage: 1,
            searchKeyword: '',
            sortBy: 'email',
            sortDirection: -1,
        }
    },
    methods: {
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
        filteredUsers() {
            return this.users
                .filter((evidence) => {
                    const fields = ['email', 'customClaims.role'];
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
            return Math.ceil(this.users.length / this.pageSize);
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
            return this.filteredUsers.slice(startIndex, endIndex);
        }
    },
    mounted() {
        axios.get('http://localhost:3000/users/users')
            .then((response) => {
                this.users = response.data;
            })
            .catch((error) => {
                console.error('Error retrieving user list:', error);
            });
    }
}
</script>
<style ></style>