<template>
  <div>
    <L_toolbar />
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
import L_toolbar from '@/components/Toolbar.vue'

export default {
  name: 'Home',
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