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
            dismissible
            transition="scale-transition"
            type="error"
            v-show="error_message">
            {{ error_message }}
          </v-alert>
          <v-card class="elevation-12">
            <v-toolbar
              color="teal darken-1"
              dense
              dark
              flat>
              <v-toolbar-title>
                Aqquacure - Login
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
                  counter
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
                  counter
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
                  Registrar
                </v-btn>
                <v-btn 
                  color="success"
                  dense
                  :loading="btn_loading"
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
  	data: function(){
  	  return {
  	  	username: '',
  	  	password: '',
  	  	error_message: '',
        valid: false,
        btn_loading: false,
        rules: {
          required: value => !!value || 'Campo obrigatório'
        }
  	  }
  	},
  	methods: {
      validate(){
        this.error_message = null;
        if(this.valid){
          this.login();
        }else{
          this.$refs.form_login.validate();
        }
      },
  	  login(){
        this.btn_loading = true;

  	  	this.$http.get('/sanctum/csrf-cookie').then(response => {
  	  	  this.$http.post('/login', {
  	  	  	email: this.username,
  	  	  	password: this.password
  	  	  }).then(res => {
            this.btn_loading = false;

  	  	  	localStorage.setItem('isLoggedIn', 'true');
  	  	  	this.$router.push({ name: '/' });
  	  	  }).catch(error =>{
            this.btn_loading = false;

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
