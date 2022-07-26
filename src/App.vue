<template>
  <nav>
    <AppHeader />
  </nav>
  <router-view/>
</template>


<script>
// @ is an alias to /src
import AppHeader from '@/components/AppHeader.vue'

export default {
  name: 'HomeView',
  components: {
    AppHeader,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  margin: 0;
}
</style>
