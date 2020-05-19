<template>
  <div>
  	<a v-bind:href="url">{{title}}</a>
  </div>
</template>

<script>
export default {
  name: "Test",
  props: ['title', 'url']
}
</script>
<style scoped>
  
</style>