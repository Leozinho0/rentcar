<template>
  <div>
    <v-container>
      <v-alert
        dense
        text
        dismissible
        transition="scale-transition"
        type="success"
        v-show="form_success">
        {{ form_success }}
      </v-alert>
      
    	<v-card>
    	  <v-card-title>
  	      Carros
  	      <v-spacer></v-spacer>
  	      <v-text-field
  	        v-model="search"
  	        append-icon="search"
  	        label="Search"
  	        single-line
  	        hide-details> 
          </v-text-field>
        </v-card-title>
        <v-divider></v-divider>
        <v-data-table
          :headers="headers"
          :items="items"
          item-key="name"
          show-select
          class="elevation-1"
          :search="search">
          <template v-slot:top>
            <v-dialog 
              v-model="dialog" 
              max-width="900px">
              <template v-slot:activator="{ on }">
                <v-btn color="teal accent-4" dark class="mb-2" v-on="on">
                  Adicionar
                  <v-icon right>
                    add_circle
                  </v-icon>
                </v-btn>
              </template>
              <v-form
                ref="form"
                v-model="valid"
                :lazy-validation="lazy">
                <v-card>
                  <v-card-title>
                    <span class="headline">
                      {{ formTitle }}
                    </span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-alert
                        dense
                        text
                        dismissible
                        transition="scale-transition"
                        type="error"
                        v-show="form_error"
                        v-for="(error, index) in form_error">
                        {{ error[0] }}
                      </v-alert>
                      <v-row>
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field 
                            v-model="editedItem.nome"
                            label="Nome"
                            :rules="[rules.required, rules.counter]"
                            maxlength="20"
                            counter
                            prepend-icon="edit"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field 
                            v-model="editedItem.modelo"
                            label="Modelo"
                            :rules="[rules.required, rules.counter]"
                            maxlength="20"
                            counter
                            prepend-icon="directions_car"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <v-select 
                            v-model="editedItem.marca"
                            label="Marca"
                            :items="marca"
                            :rules="[rules.required]"
                            maxlength="20"
                            prepend-icon="category"></v-select>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <v-select 
                            v-model="editedItem.tipo"
                            label="Tipo"
                            :items="tipo"
                            :rules="[rules.required]"
                            maxlength="20"
                            prepend-icon="layers"></v-select>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field 
                            v-model="editedItem.ano"
                            label="Ano"
                            type="date"
                            :rules="[rules.required]"
                            maxlength="20"
                            prepend-icon="calendar_today"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field 
                            v-model="editedItem.placa"
                            label="Placa"
                            :rules="[rules.required, rules.counter]"
                            maxlength="20"
                            counter
                            prepend-icon="credit_card"></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue-grey lighten-2" dark @click="close">Cancelar</v-btn>
                    <v-btn color="green darken-2" dark @click="validate">Salvar</v-btn>
                  </v-card-actions>
                </v-card>
              </v-form>
            </v-dialog>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon
              small
              class="mr-2"
              @click="editItem(item)">
              edit
            </v-icon>
            <v-icon
              small
              @click="deleteItem(item)">
              delete
            </v-icon>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">
              Reset
            </v-btn>
          </template>
        </v-data-table>
    	</v-card>
    </v-container>
  </div>
</template>
<script>

import axios from 'axios'
import BASE_API from '../endpoints.js'

export default {
  name: 'Cars',
  data: function(){
  	return {
      valid: true,
      form_error: false,
      form_success: false,
  		dialog: false,
      lazy: false,
  		headers: [
  		  { text: 'ID', value: 'id', align: 'start', sortable: true },
  		  { text: 'Nome', value: 'nome', align: 'start', sortable: true },
  		  { text: 'Modelo', value: 'modelo', align: 'start', sortable: true },
  		  { text: 'Marca', value: 'marca', align: 'start', sortable: true },
  		  { text: 'Tipo', value: 'tipo', align: 'start', sortable: true },
        { text: 'Ano', value: 'ano', align: 'start', sortable: true },
        { text: 'Placa', value: 'placa', align: 'start', sortable: true },
  		  { text: 'Ações', value: 'actions', sortable: false },
  		],
  		items:  [],
      marca: [
        { text: "Fiat", value: "Fiat" },
        { text: "GM", value: "GM" },
        { text: "Volkswagen", value: "Volkswagen" },
      ],
      tipo: [
        { text: "Passeio", value: "Passeio" },
        { text: "SUV", value: "SUV" },
        { text: "Caminhonete", value: "Caminhonete" },
      ],
  		search: '',
  		editedItem: {
        nome: '',
        modelo: '',
        marca: '',
        tipo: '',
        ano: '',
        placa: ''
      },
      defaultItem: {
        nome: '',
        modelo: '',
        marca: '',
        tipo: '',
        ano: '',
        placa: ''
      },
      editedIndex: -1,
      rules: {
        required: value => !!value || 'Required.',
        counter: value => value.length <= 20 || 'Max 20 characters'
      }
  	}
  },
  created () {
    this.initialize()
  },
  methods: {
    validate () {
      if(this.valid){
        this.save();
      }else{
        this.$refs.form.validate();
      }
    },
    resetValidation () {
      return this.$refs.form.resetValidation();
    },
    hidealerts(){
      this.form_error   = false;
      this.form_success = false;
    },
  	initialize () {
      axios
        .get(BASE_API + '/api/car')
        .then(response => {
          this.items = response.data
        });
    },
  	editItem (item) {
      //Hide alerts
      this.hidealerts();

  	  this.editedIndex = this.items.indexOf(item)
  	  this.editedItem = Object.assign({}, item)
  	  this.dialog = true
  	},
  	deleteItem (item) {
      const index = this.items.indexOf(item)
      if(confirm('Gostaria de deletar o registro?')){
        this.items.splice(index, 1);
        //Axios DELETE
        axios({
          method: 'delete',
          url: BASE_API + '/api/car/' + item.id
        }).then(response => {
          console.log('Deletado com Sucesso!');
        });
      }
    },
  	close () {
      this.resetValidation();

      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    save () {
      //Hide alerts
      this.hidealerts();

      if (this.editedIndex > -1) {
        Object.assign(this.items[this.editedIndex], this.editedItem)

        //Axios UPDATE
        var params = this.editedItem;

        axios({
          method: 'put',
          url: BASE_API + '/api/car/' + this.editedItem.id,
          data: params
        }).then(response => {
          this.form_success = "Atualizado com sucesso!";
          this.close();
        }).catch((error) => {
          this.form_error = error.response.data.errors;
        });
      } else {
        //Axios ADD
        var params = this.editedItem;

        axios({
          method: 'post',
          url: BASE_API + '/api/car',
          data: params
        }).then(response => {
          this.items.push(response.data);

          this.form_success = "Adicionado com sucesso!";
          this.close();
        }).catch((error) => {
          this.form_error = error.response.data.errors;
        });
      }
    },
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Novo Item' : 'Editar Item'
    },
  },
  watch: {
    dialog (val) {
      val || this.close()
    },
  },
  components: {
  }
}
</script>
<style scoped>
  
</style>