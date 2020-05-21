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
                Login
              </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form
                ref="form_login"
                v-model="valid">
                <v-text-field
                  label="Usuário"
                  name="login"
                  prepend-icon="person"
                  v-model="username"
                  type="text"
                  :rules="[rules.required]"
                  maxlength="20">
                </v-text-field>
                <v-text-field
                  id="password"
                  label="Senha"
                  name="password"
                  prepend-icon="lock"
                  v-model="password"
                  type="password"
                  :rules="[rules.required]"
                  maxlength="20">
                </v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-container>
                <v-btn 
                  color="primary"
                  text 
                  @click="register">
                  Cadastrar
                </v-btn>
                <v-btn 
                  color="primary"
                  @click="validate"
                  :disabled="!valid">
                  Login
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
  	name: "Login",
  	props: ['source'],
  	data: function(){
  	  return {
  	  	username: '',
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
          this.login();
        }else{
          this.$refs.form_login.validate();
        }
      },
  	  login(){
  	  	this.$http.get('/sanctum/csrf-cookie').then(response => {
  	  	  this.$http.post('/login', {
  	  	  	email: this.username,
  	  	  	password: this.password
  	  	  }).then(res => {
  	  	  	localStorage.setItem('isLoggedIn', 'true');
  	  	  	this.$router.push({ name: '/' });
  	  	  }).catch(error =>{
  	  	  	const key = Object.keys(error.response.data.errors)[0];
  	  	  	this.error_message = error.response.data.errors[key][0];
  	  	  });
  	  	});
  	  },
      register(){
        this.$router.push({ name: 'Register'});
      }
  	}
  }
</script>

<style scoped>
	
</style>
