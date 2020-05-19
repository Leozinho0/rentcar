<template>
  <v-container>
    <v-row>
      <v-col v-for="(link, index) in links">
        <v-card
          :color="link.color"
          :to="link.url"
          outlined
          hover
          shaped
          dark>
            <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-title class="headline mb-1">
                  {{ link.title }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ link.subtitle }}
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-icon
                size="70">
                {{ link.icon }}
              </v-icon>
            </v-list-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  data: function(){
    return {
      links: [
        { title: 'Veículos', subtitle: 'Acessar', icon: 'directions_car', color: 'light-blue lighten-1', url: '/cars' },
        { title: 'Produtos', subtitle: 'Acessar', icon: 'assignment', color: 'green lighten-2', url: '/cars' },
        { title: 'Clientes', subtitle: 'Acessar', icon: 'business', color: 'pink lighten-3', url: '/cars' },
        { title: 'Configurações', subtitle: 'Acessar', icon: 'settings', color: 'purple lighten-2', url: '/cars' },
      ]
    }
  },
  components: {
  }
}
</script>
<style scoped>
  a{
    text-decoration: none !important;
  }
</style>