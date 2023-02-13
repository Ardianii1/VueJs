<script>
// import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
// import ContactViewVue from './views/ContactView.vue';
import NavBar from './components/NavBar.vue';
import HomeView from './views/HomeView.vue'
import { getAuth, onAuthStateChanged } from '@firebase/auth';
  export default{
  components:{
    NavBar,
    HomeView,
  },
  mounted() {
    // this.$store.dispatch('fetchPosts');
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      this.$store.commit('setUser', user);
    })
  }
}
</script>

<template>
  <NavBar/>
  <!-- <HomeView/> -->
  <!-- <header > -->

    <RouterView />  
    <!-- <div class="wrapper"> -->
      <!-- <nav class="nav">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/contact">Contact</RouterLink>
      </nav> -->
    <!-- </div> -->
  <!-- </header> -->

</template>

<!-- <style scoped>
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  display: flex;
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

 @media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
} 
</style> -->
