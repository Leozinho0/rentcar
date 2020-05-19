<template>
  <v-app id="app">
    <L_toolbar />
    <router-view/>
  </v-app>
</template>

<script>
// @ is an alias to /src
import L_toolbar from '@/components/Toolbar.vue'

export default {
  name: 'Home',
  data: function(){
    return {
    }
  },
  components: {
    L_toolbar
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
.router-link-active{
  color: red;
}
</style>
