<template>
  <v-app-bar
    app
    color="teal darken-1"
    dense
    dark>
    <v-app-bar-nav-icon>
    	<v-icon>
    	  {{ toolbar_config.logo_icon }}
      </v-icon>
    </v-app-bar-nav-icon>
    <v-toolbar-title>
      {{ toolbar_config.title }}
    </v-toolbar-title>
    <v-spacer></v-spacer>

    <v-btn 
      icon 
      to="Home">
      <v-icon>mdi-home</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>

    <v-menu
      left
      bottom>
      <template v-slot:activator="{ on }">
        <v-avatar 
          icon 
          v-on="on"
          size="40">
          <img
            src="https://cdn.vuetifyjs.com/images/john.jpg"
            alt="Leandro" />
        </v-avatar>
      </template>

      <v-list>
        <v-list-item
          v-for="(n, index) in toolbar_config.btns"
          :key="index"
          @click="() => {}">
          <v-list-item-title @click="logout">{{ toolbar_config.btns[index].title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  name: 'L_toolbar',
  data: function(){
  	return {
  	  toolbar_config: { 
  	  	title: 'Aqquacure - Health Managment System', 
  	  	logo_icon: 'gesture',
  	  	btns: [
  	      { title: 'Perfil', icon: '', url: '' },
  	      { title: 'Logout', icon: '', url: '' }
  	    ] 
  	  }
  	}
  },
  methods: {
    logout(){
      this.$http.get('/sanctum/csrf-cookie').then(repsonse => {
        this.$http.post('/logout').then(response => {
          localStorage.removeItem('isLoggedIn');
          this.$router.push({ name: 'Login' });
        }).catch((error) => {
          //console.log(error.response);;
        });
      });
    }
  }
}
</script>
<style scoped>
</style>
