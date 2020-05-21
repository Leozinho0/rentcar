<template>
  <div>
    <v-alert
      dense
      text
      dismissible
      transition="scale-transition"
      :type="table_alert.type"
      v-show="table_alert">
      {{ table_alert.data }}
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
                      :type="form_alert.type"
                      v-show="form_alert"
                      v-for="(error, index) in form_alert.data">
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
          Nenhum Registro
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="initialize">
            Refresh
          </v-btn>
        </template>
      </v-data-table>
  	</v-card>
  </div>
</template>
<script>

export default {
  name: 'Tablelist',
  props: ['headers'],
  data: function(){
  	return {
      valid: true,
      form_alert: false,
      table_alert: false,
  		dialog: false,
      lazy: false,
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
    console.log(this.$http);
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
      this.form_alert   = false;
      this.table_alert  = false;
    },
  	initialize () {
      this.$http
        .get('/car')
        .then(response => {
          this.items = response.data
        }).catch((error) => {
          alert('error ao conectar com api');
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
        
        this.$http({
          method: 'delete',
          url: '/car/' + item.id
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

        //UPDATE
        var params = this.editedItem;

        this.$http({
          method: 'put',
          url: '/car/' + this.editedItem.id,
          data: params
        }).then(response => {
          this.table_alert = {
            type: 'success',
            data: 'Atualizado com sucesso!'
          }
          this.close();
        }).catch((error) => {
          this.form_alert = {
            type: 'error',
            data: error.response.data.errors
          }
        });
      } else {
        //ADD
        var params = this.editedItem;

        this.$http({
          method: 'post',
          url: '/car',
          data: params
        }).then(response => {
          this.items.push(response.data);

          this.table_alert = {
            type: 'success',
            data: 'Adicionado com sucesso!'
          }
          this.close();
        }).catch((error) => {
          this.form_alert = {
            type: 'error',
            data: error.response.data.errors
          }
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