<template>
  <v-container>
    <v-card>
      <v-card-title>
        Profissionais
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Busca Rápida"
          single-line
          hide-details> 
        </v-text-field>
      </v-card-title>
      <v-divider></v-divider>
      <v-data-table
        :headers="headers"
        :items="items"
        item-key="name"
        class="elevation-1"
        :search="search">
        <template v-slot:top>
          <v-dialog 
            v-model="dialog" 
            max-width="900px">
            <template v-slot:activator="{ on }">
              <v-btn color="teal accent-4" dark class="m-2" v-on="on">
                Incluir
                <v-icon right>
                  add_circle
                </v-icon>
              </v-btn>
            </template>
            <v-form
              ref="form_profissionais"
              v-model="valid">
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
                          maxlength="50"
                          counter
                          prepend-icon="edit">    
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field 
                          v-model="editedItem.nascimento"
                          label="Nascimento"
                          :rules="[rules.required]"
                          type="date"
                          prepend-icon="directions_car">
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field 
                          v-model="editedItem.fone"
                          label="Fone"
                          :rules="[rules.required, rules.counter]"
                          maxlength="50"
                          counter
                          prepend-icon="directions_car">
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field 
                          v-model="editedItem.email"
                          label="Email"
                          :rules="[rules.required, rules.counter]"
                          maxlength="50"
                          counter
                          prepend-icon="directions_car">
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-select 
                          v-model="editedItem.estado_id"
                          label="Estado"
                          :items="estados"
                          :rules="[rules.required]"
                          prepend-icon="category"
                          @change="load_cidades">
                        </v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-select 
                          v-model="editedItem.cidade_id"
                          label="Cidade"
                          :items="cidades"
                          :rules="[rules.required]"
                          prepend-icon="layers">
                        </v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-select 
                          v-model="editedItem.profissao_id"
                          label="Profissão"
                          :items="profissoes"
                          :rules="[rules.required]"
                          prepend-icon="layers">
                        </v-select>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue-grey lighten-2" dark @click="close">Cancelar</v-btn>
                  <v-btn color="primary" @click="validate" :disabled="!valid">Salvar</v-btn>
                </v-card-actions>
              </v-card>
            </v-form>
          </v-dialog>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon
            small
            class="mr-2"
            color="blue lighten-2"
            @click="editItem(item)">
            edit
          </v-icon>
          <v-icon
            small
            color="red lighten-2"
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
  </v-container>
</template>
<script>

import Tablelist from '@/components/Tablelist.vue'

export default {
  name: 'Profissionais',
  data: function(){
  	return {
      headers:  [
        { text: 'Id', value: 'id', align: 'start', sortable: true },
        { text: 'Nome', value: 'nome', align: 'start', sortable: true },
        { text: 'Nascimento', value: 'nascimento', align: 'start', sortable: true },
        { text: 'Fone', value: 'fone', align: 'start', sortable: true },
        { text: 'Email', value: 'email', align: 'start', sortable: true },
        { text: 'Estado', value: 'estado.nome', align: 'start', sortable: true },
        { text: 'Cidade', value: 'cidade.nome', align: 'start', sortable: true },
        { text: 'Profissão', value: 'profissao.nome', align: 'start', sortable: true },
        { text: 'Ações', value: 'actions', sortable: false },
      ],
      items: [],
      search: '',
      dialog: false,
      valid: false,
      form_alert: false,
      rules: {
        required: value => !!value || 'Required.',
        counter: value => value.length <= 50 || 'Max 20 characters'
      },
      editedItem: {
        nome: '',
        nascimento: '',
        fone: '',
        email: '',
        estado_id: '',
        cidade_id: '',
        profissao_id: ''
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
      estados: [],
      profissoes: [],
      cidades: []
    }
  },
  methods: {
    initialize(){
      this.$http
        .get('/api/profissional')
        .then(response => {
          this.load_estados(response.data.estados);
          this.load_profissoes(response.data.profissoes);

          this.items = response.data.profissionais;
          //console.log(response.data);
        }).catch((error) => {
          alert('error ao conectar com api');
        });
    },
    validate () {
      if(this.valid){
        this.submit();
      }else{
        this.$refs.form_profissionais.validate();
      }
    },
    editItem (item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.load_cidades(this.editedItem.estado_id);
      
      this.dialog = true
    },
    deleteItem (item) {
      const index = this.items.indexOf(item)
      if(confirm('Gostaria de deletar o registro?')){
        this.items.splice(index, 1);
        
        this.$http({
          method: 'delete',
          url: '/api/profissional/' + item.id
        }).then(response => {
          console.log('Deletado com Sucesso!');
        });
      }
    },
    close () {
      this.$refs.form_profissionais.resetValidation();

      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    submit(){
      if (this.editedIndex > -1) {
        Object.assign(this.items[this.editedIndex], this.editedItem)

        //UPDATE
        var params = this.editedItem;

        this.$http({
          method: 'put',
          url: '/api/profissional/' + this.editedItem.id,
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
          url: '/api/profissional',
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
    load_estados(data){
      data.forEach((item, index) => {
        let obj = { text: item.nome, value: item.id }
        this.estados.push(obj);
      });
    },
    load_profissoes(data){
      data.forEach((item, index) => {
        let obj = { text: item.nome, value: item.id }
        this.profissoes.push(obj);
      });
    },
    load_cidades(estado_id){
      this.cidades = [];

      this.$http
        .get('/api/get_cidades/' + estado_id)
        .then(response => {
          response.data.forEach((item, index) => {
            let obj = { text: item.nome, value: item.id }
            this.cidades.push(obj);
          });
        }).catch((error) => {
          alert('error ao conectar com api');
        });
    }
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Novo Item' : 'Editar Item'
    },
  },
  mounted(){
    this.initialize();
  },
  watch: {
    dialog (val) {
      val || this.close()
    }
  },
  components: {
    Tablelist
  }
}
</script>
<style scoped>
  
</style>