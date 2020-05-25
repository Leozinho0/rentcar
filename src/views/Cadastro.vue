<template>
  <v-container
    class="fill-height"
    fluid>
    <v-row
      align="center"
      justify="center">
      <v-col
        md="12">
  	    <v-card class="elevation-12">
          <v-toolbar
            color="primary"
            dark
            flat>
            <v-toolbar-title>
              Cadastro de Profissionais
            </v-toolbar-title>
          </v-toolbar>
          <v-card-text>
		    <v-form
		      ref="form_cadastroprofissional"
		      v-model="valid">
		        <v-text-field
		          label="Nome"
		          name="nome"
		          prepend-icon="person"
		          v-model="form_data.nome"
		          type="text"
		          :rules="[rules.required]"
		          counter
		          maxlength="20">
		        </v-text-field>
		        <v-text-field
		          label="Data de Nascimento"
		          name="nascimento"
		          prepend-icon="lock"
		          v-model="form_data.nascimento"
		          type="date"
		          :rules="[rules.required]"
		          maxlength="20">
		        </v-text-field>

		        <v-text-field
		          label="Telefone"
		          name="fone"
		          prepend-icon="phone"
		          v-model="form_data.fone"
		          type="text"
		          :rules="[rules.required]"
		          counter
		          maxlength="20">
		        </v-text-field>

		        <v-text-field
		          label="E-mail"
		          name="email"
		          prepend-icon="lock"
		          v-model="form_data.email"
		          type="text"
		          :rules="[rules.required]"
		          counter
		          maxlength="50">
		        </v-text-field>

		        <v-select 
                  v-model="form_data.estado"
                  label="Estado"
                  :items="estados"
                  :rules="[rules.required]"
                  maxlength="50"
                  prepend-icon="category"
                  @change="load_cidades">
                </v-select>

		        <v-select 
                  v-model="form_data.cidade"
                  label="Cidade"
                  :items="cidades"
                  :rules="[rules.required]"
                  maxlength="50"
                  prepend-icon="category">
                </v-select>

		        <!-- Dados profissionais -->
		        <v-select 
                  v-model="form_data.profissao"
                  label="Profissão"
                  :items="profissoes"
                  :rules="[rules.required]"
                  maxlength="50"
                  prepend-icon="category">
                </v-select>
		    </v-form>
        <v-alert
          dense
          text
          dismissible
          transition="scale-transition"
          :type="form_alert.type"
          v-show="form_alert">
          {{ form_alert.data }}
        </v-alert>
		  </v-card-text>
		  <v-card-actions>
            <v-container>
              <v-btn 
                color="primary"
                @click="validate"
                :disabled="!valid">
                  Enviar
              </v-btn>
            </v-container>
          </v-card-actions>
		</v-card>
  	  </v-col>
  	</v-row>
  </v-container>
</template>

<script>
export default {
  name: "Cadastro",
  data: function(){
  	return {
      form_data: {
        nome: '',
        nascimento: '',
        fone: '',
        email: '',
        estado: '',
        cidade: '',
        profissao: ''
      },

  	  form_alert: false,
  	  valid: false,
  	  rules: {
        required: value => !!value || 'Campo obrigatório'
      },

      estados: [],
      cidades: [],
      profissoes: []
  	}
  },
  methods: {
    validate () {
      if(this.valid){
        this.submit();
      }else{
        this.$refs.form_cadastroprofissional.validate();
      }
    },
    submit(){
      this.$http({
          method: 'post',
          url: '/api/profissional',
          data: this.form_data
        }).then(response => {
          this.form_alert = {
            type: 'success',
            data: 'Cadastro realizado com sucesso!'
          }
          this.close();
        }).catch((error) => {
          this.form_alert = {
            type: 'error',
            data: error.response.data.errors
          }
        });
    },
    initialize(){
      this.$http
        .get('/api/profissional/create')
        .then(response => {
          this.load_estados(response.data.estados);
          this.load_profissoes(response.data.profissoes);
        }).catch((error) => {
          alert('error ao conectar com api');
        });
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
      this.form_data.cidade  = '';

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
  mounted(){
    this.initialize();
  }
}
</script>

<style scoped>
  
</style>