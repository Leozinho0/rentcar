<template>
  <v-container>
    <tablelist
      :headers="tablelist_headers"
      :items_edit="edited_item" />
  </v-container>
</template>
<script>

import Tablelist from '@/components/Tablelist.vue'

export default {
  name: 'Cars',
  data: function(){
  	return {
      tablelist_headers:  [
        { text: 'ID', value: 'id', align: 'start', sortable: true },
        { text: 'Nome', value: 'nome', align: 'start', sortable: true },
        { text: 'Modelo', value: 'modelo', align: 'start', sortable: true },
        { text: 'Marca', value: 'marca', align: 'start', sortable: true },
        { text: 'Tipo', value: 'tipo', align: 'start', sortable: true },
        { text: 'Ano', value: 'ano', align: 'start', sortable: true },
        { text: 'Placa', value: 'placa', align: 'start', sortable: true },
        { text: 'Ações', value: 'actions', sortable: false },
      ],
      edited_item: {
        nome: '',
        modelo: '',
        marca: '',
        tipo: '',
        ano: '',
        placa: ''
      }
    }
  },
  methods: {},
  computed: {},
  created () {},
  watch: {},
  components: {
    Tablelist
  }
}
</script>
<style scoped>
  
</style>