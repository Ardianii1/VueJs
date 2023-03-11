<template>
  <main class="">
  <!-- <TheWelcome /> -->
  <h1>Home Page </h1>
  <!-- <p>{{ userRole }}</p> -->

  </main>
</template>
<script>
import { mapGetters, mapState, mapActions } from 'vuex';
import { getAuth, signOut } from '@firebase/auth';

export default {
  data() {
    return {
      role: '',
    };
  },
  name: "HomeView",
  methods: {
    ...mapActions(['getUserRole'])
  },
  computed: {
    ...mapState(['userRole']),
  },
  created() {
    this.getUserRole().then(() => {
      this.role = this.userRole === 'admin' ? 'admin' : 'user';
      // console.log(userRole)
    });
  }
};
</script>


