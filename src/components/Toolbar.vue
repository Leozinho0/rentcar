<template>
  <div>
    <v-app-bar
      color="light-blue darken-3"
      dense
      dark
      flat>
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
        to="/">
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
              alt="John">
          </v-avatar>
        </template>

        <v-list>
          <v-list-item
            v-for="(n, index) in toolbar_config.btns"
            :key="index"
            @click="() => {}">
            <v-list-item-title>{{ toolbar_config.btns[index].title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: 'L_toolbar',
  data: function(){
  	return {
  	  toolbar_config: { 
  	  	title: 'Rentcar - Locadora de Veículos', 
  	  	logo_icon: 'directions_car',
  	  	btns: [
  	      { title: 'Perfil', icon: '', url: '' },
  	      { title: 'Sair', icon: '', url: '' }
  	    ] 
  	  }
  	}
  },
  methods: {
  }
}
</script>
<style scoped>
  
</style>