<template>
    <div class=" overflow-y-hidden ">
        <AdminSideBar />
        <router-view />
    </div>
</template>
<script>
import AdminSideBar from './AdminSideBar.vue';

export default {
    name: 'AdminLayout',
    components: { AdminSideBar }
}
</script>
<style></style>