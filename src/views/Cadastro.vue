<template>
  <v-parallax
    dark
    height="650"
    src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg">
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
              color="teal darken-1"
              dense
              dark
              flat>
              <v-toolbar-title>
                Cadastro de Profissionais
              </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-alert
                dense
                dismissible
                transition="scale-transition"
                :type="form_alert.type"
                v-show="form_alert">
                {{ form_alert.data }}
              </v-alert>
      		    <v-form
      		      ref="form_cadastroprofissional"
      		      v-model="valid">
                <v-row>
                  <v-col>
                    <span class="headline">Dados Pessoais</span>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field
                      label="Nome"
                      name="nome"
                      prepend-icon="person"
                      v-model="form_data.nome"
                      type="text"
                      :rules="[rules.required]"
                      counter
                      maxlength="100">
                    </v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      label="Data de Nascimento"
                      name="nascimento"
                      prepend-icon="date_range"
                      v-model="form_data.nascimento"
                      type="date"
                      :rules="[rules.required]">
                    </v-text-field>
                  </v-col>
                  <v-col>
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
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field
                      label="E-mail"
                      name="email"
                      prepend-icon="email"
                      v-model="form_data.email"
                      type="text"
                      :rules="[rules.required]"
                      counter
                      maxlength="50">
                    </v-text-field>
                  </v-col>
                  <v-col>
                    <v-select 
                      v-model="form_data.estado"
                      label="Estado"
                      :items="estados"
                      :rules="[rules.required]"
                      maxlength="50"
                      prepend-icon="place"
                      @change="cidades = []">
                    </v-select>
                  </v-col>
                  <v-col>
                    <v-select 
                      v-model="form_data.cidade"
                      label="Cidade"
                      :items="cidades"
                      :rules="[rules.required]"
                      maxlength="50"
                      prepend-icon="streetview"
                      @click="load_cidades">
                    </v-select>
                  </v-col>
                </v-row>
                <v-divider></v-divider>
                <v-row>
                  <v-col>
                    <span class="headline">Dados Profissionais</span>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-select 
                      v-model="form_data.profissao"
                      label="Profissão"
                      :items="profissoes"
                      :rules="[rules.required]"
                      maxlength="50"
                      prepend-icon="category">
                    </v-select>
                  </v-col>
                  <v-col>
                    <v-file-input multiple small-chips show-size label="Upload de Arquivo" enctype="multipart/form-data" @change="selectFile"></v-file-input>
                  </v-col>
                </v-row>
      		    </v-form>
  		      </v-card-text>
      		  <v-card-actions>
              <v-container>
                <v-btn 
                  color="success"
                  @click="validate"
                  :disabled="!valid"
                  :loading="btn_loading">
                    Enviar
                </v-btn>
              </v-container>
            </v-card-actions>
  		    </v-card>
    	  </v-col>
    	</v-row>
    </v-container>
  </v-parallax>
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
        profissao: '',
        upload: null
      },

  	  form_alert: false,
  	  valid: false,
      btn_loading: false,
  	  rules: {
        required: value => !!value || 'Campo obrigatório'
      },

      estados: [],
      cidades: [],
      profissoes: []
  	}
  },
  methods: {
    selectFile(e) {
        this.form_data.upload = e[0];
    },
    validate(){
      this.form_alert = false;
      if(this.valid){
        this.submit();
      }else{
        this.$refs.form_cadastroprofissional.validate();
      }
    },
    submit(){
      this.btn_loading = true;
      const data = new FormData();

      if(this.form_data.upload){
        data.append('upload', this.form_data.upload);
      }
      data.append('nome', this.form_data.nome);
      data.append('nascimento', this.form_data.nascimento);
      data.append('fone', this.form_data.fone);
      data.append('email', this.form_data.email);
      data.append('estado_id', this.form_data.estado);
      data.append('cidade_id', this.form_data.cidade);
      data.append('profissao_id', this.form_data.profissao);

      this.$http({
          method: 'post',
          url: '/api/profissional',
          data: data
        }).then(response => {
          this.btn_loading = false;

          this.form_alert = {
            type: 'success',
            data: 'Cadastro realizado com sucesso!'
          }
          this.close();
        }).catch((error) => {
          this.btn_loading = false;
          
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
    load_cidades(){
      let estado_id = this.form_data.estado;
      if(estado_id){
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
    }
  },
  mounted(){
    this.initialize();
  }
}
</script>

<style scoped>
  
</style>