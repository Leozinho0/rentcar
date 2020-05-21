<template>
  <v-app id="app">
    <router-view/>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: function(){
    return {
    }
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
