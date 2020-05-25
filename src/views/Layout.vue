<template>
  <v-content>
    <L_toolbar />
    <router-view></router-view>
  </v-content>
</template>

<script>
// @ is an alias to /src
import L_toolbar from '@/components/Toolbar.vue'

export default {
  name: 'Layout',
  data: function(){
    return {}
  },
  components: {
    L_toolbar
  },
  mounted(){}
}
</script>
<style scoped>
  a{
    text-decoration: none !important;
  }
</style>