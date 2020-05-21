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
	          cols="12"
	          sm="8"
	          md="4">
	          <v-alert
    		    dense
    		    text
    		    dismissible
    		    transition="scale-transition"
    		    type="error"
    		    v-if="error_message">
    		      {{ error_message }}
  	    	  </v-alert>
	          <v-card class="elevation-12">
	            <v-toolbar
	              color="primary"
	              dark
	              flat>
	              <v-toolbar-title>
	                Novo Usuário
	              </v-toolbar-title>
	            </v-toolbar>
	            <v-card-text>
			      <v-form
				    ref="form_register"
				    v-model="valid">
				    <v-text-field
				      v-model="name"
				      :counter="20"
				      label="Nome"
				      :rules="[rules.required]"
				      maxlength="20">
				    </v-text-field>
				    <v-text-field
				      v-model="email"
				      :rules="[rules.required]"
				      :counter="50"
				      label="E-mail"
				      maxlength="50">
				    </v-text-field>
					<v-text-field
				      v-model="password"
				      :rules="[rules.required]"
				      type="password"
				      name="input-10-1"
				      label="Senha"
				      maxlength="20"
				      :counter="20"
				      hint="Mínimo de 8 characteres">
				    </v-text-field>
				    <v-container>	
				      <v-btn
				        color="secondary"
				        class="mr-4"
				        @click="voltar">
				          Voltar
				      </v-btn>
				      <v-btn
				        color="success"
				        class="mr-4"
				        @click="validate"
				        :disabled="!valid">
				          Cadastrar
				      </v-btn>
				    </v-container>
				  </v-form>
			    </v-card-text>
			  </v-card>
			</v-col>
		  </v-row>
      </v-container>
	</v-parallax>
</template>

<script>
export default {
  name: 'Register',
  data: function(){
  	return {
  	  name: '',
  	  email: '',
  	  password: '',
  	  error_message: '',
  	  valid: false,
  	  rules: {
	    required: value => !!value || 'Campo obrigatório'
	  }
  	}
  },
  methods: {
  	validate(){
	  if(this.valid){
	    this.register();
	  }else{
	    this.$refs.form_register.validate();
	  }
	},
  	voltar(){
  	  this.$router.push({ name: 'Login' });
  	},
  	register(){
  	  	this.$http.get('/sanctum/csrf-cookie').then(response => {
  	  	  this.$http.post('/register', {
  	  	  	name: this.name,
  	  	  	email: this.email,
  	  	  	password: this.password,
  	  	  	password_confirmation: this.password
  	  	  }).then(res => {
  	  	  	alert('Cadastrado com Sucesso!');
  	  	  }).catch(error =>{
  	  	  	const key = Object.keys(error.response.data.errors)[0];
  	  	  	this.error_message = error.response.data.errors[key][0];
  	  	  });
  	  	});
  	  },
  }
}
</script>

<style scoped>
  
</style>
