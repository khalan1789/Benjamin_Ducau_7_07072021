<template >
    <main class="">
            <Header></Header>
        <div class="container d-flex justify-content-md-center bg-primary col-lg-4 mb-5" >
            <div class="row col text-center">
                <h2 class="mt-5 mb-4">Bienvenue chez Groupomania</h2>
                <form class="mt-2">
                    <div class="form-group col ">
                        <label for="email"  class=" mb-2 mt-2 h5">Email</label>
                        <input v-model="email" type="email" id="email" class="form-control mb-2 mt-2" placeholder="Veuillez rentrer votre email ici" pattern="^[a-zA-Z0-9._-]+[@]{1}[a-zA-Z0-9._-]+[.]{1}[a-z]{2,8}$" required/>
                    </div>
                    <div class="form-group col">
                        <label for="password" class=" mb-2 mt-2 h5 ">Mot de passe</label>
                        <input v-model ="password" type="password" id="password" class="form-control mb-3 mt-2 " placeholder="Veuillez rentrer votre mot de passe ici"/>
                    </div>
                    <div class="row " v-if="status == 'error_to_login'">
                        <p class="text-danger h5">Adresse mail et/ou mot de passe invalide !</p>
                    </div>
                    <span v-if="status == 'loading'" class="spinner-border text-secondary"></span>
                    <button v-else type="submit" @click="loginUser" class="btn btn-lg btn-outline-secondary text-secondary bg-light mt-4 mb-3" :class="{'disabled' : !validateFields}">Se connecter</button>
                </form>
                <div>
                    <h3 class=" h5 mt-3 mb-2">Pas encore inscrit ?</h3>
                    <button type="submit" class="btn btn-md btn-outline-secondary text-secondary bg-light mt-1 mb-3" ><router-link class="text-secondary bg-light text-decoration-none" to="/signup">S'inscrire</router-link></button>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import Header from '../components/Header.vue'
import { mapState } from 'vuex'

export default {
  name: 'login',
  data: function () {
    return {
      mode: 'login',
      email: '',
      password: ''
    }
  },
  components: {
    Header
  },
  computed: {
    validateFields: function () {
      if (this.email !== '' && this.password !== '') {
        return true
      } else {
        return false
      }
    },
    ...mapState(['status'])
  },
  methods: {
    loginUser: function () {
      const self = this
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password
      }).then((response) => {
        self.$router.push('/')
        console.log('réponse suite au login : ' + response)
      }, (error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
