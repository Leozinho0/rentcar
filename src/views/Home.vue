<template>
  <div>
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
  </div>
</template>

<script>

export default {
  name: 'Home',
  data: function(){
    return {
      links: [
        { title: 'Profissionais', subtitle: 'Acessar', icon: 'assignment_ind', color: 'light-blue lighten-1', url: '/profissionais' },
        { title: 'Dashboard', subtitle: 'Acessar', icon: 'insert_chart', color: 'green lighten-2', url: '/dashboard' },
        { title: 'Usuários', subtitle: 'Acessar', icon: 'person', color: 'pink lighten-3', url: '/profissionais' },
        { title: 'Configurações', subtitle: 'Acessar', icon: 'settings', color: 'purple lighten-2', url: '/home' },
      ]
    }
  },
  components: {
  },
  mounted(){
  }
}
</script>
<style scoped>
  a{
    text-decoration: none !important;
  }
</style>