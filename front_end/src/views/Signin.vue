<template>
    <main >
      <Header></Header>
        <div class="container justify-content-md-center bg-primary col-lg-4 mb-5">
            <div class="row justify-content-md-center col text-center">
                <h2 class="mt-4">Rejoignez-nous !</h2>
                <form class="mt-3 mb-3" >
                    <div class="form-group col mt-3">
                            <label for="firstname"  class=" mb-2 mt-2 h5">Prénom</label>
                            <input v-model="firstname" type="text" id="firstname" class="form-control mb-2 mt-2" placeholder="Veuillez rentrer votre prénom ici"/>
                        </div>
                        <div class="form-group col mt-3">
                            <label for="lastname" class=" mb-2 mt-2 h5 ">Nom</label>
                            <input v-model="lastname" type="text" id="lastname" class="form-control mb-2 mt-2" placeholder="Veuillez rentrer votre nom ici"/>
                        </div>
                    <div class="form-group col mt-3">
                            <label for="email"  class=" mb-2 mt-2 h5">Email</label>
                            <input v-model="email" type="email" id="email" class="form-control mb-2 mt-2" placeholder="Veuillez rentrer votre email ici"/>
                        </div>
                        <div class="form-group col mb-5 mt-3">
                            <label for="password" class=" mb-2 mt-2 h5 ">Mot de passe</label>
                            <input v-model="password" type="password" id="password" class="form-control mb-2 mt-2" placeholder="Veuillez rentrer votre mot de passe ici"/>
                        </div>
                        <div class="row" v-if="status == 'error_to_sigin'">
                          <p class="text-danger h5">Utilisateur déjà existant ! veuillez vous identifier via la page de connexion</p>
                        </div>
                        <span v-if="status == 'creating'" class="spinner-border text-secondary"></span>
                        <button v-else @click="createAccount" class="btn btn-lg btn-outline-secondary text-secondary bg-light mt-3 mb-3" :class="{'disabled' : !validateFields}">Valider l'inscription</button>
                </form>
                <div>
                    <h5 class="mt-3 mb-2">Déjà un compte ?</h5>
                    <button class="btn btn-md btn-outline-secondary text-secondary bg-light mt-1 mb-3" ><router-link class="text-secondary bg-light text-decoration-none" to="/login">Se connecter</router-link></button>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import { mapState } from 'vuex'
import Header from '../components/Header.vue'

export default {
  name: 'login',
  data: function () {
    return {
      lastname: '',
      firstname: '',
      email: '',
      password: ''
    }
  },
  components: {
    Header
  },
  computed: {
    validateFields: function () {
      if (this.email !== '' && this.password !== '' && this.lastname !== '' && this.firstname !== '') {
        return true
      } else {
        return false
      }
    },
    ...mapState(['status'])
  },
  methods: {
    createAccount: function (e) {
      const self = this
      this.$store.dispatch('createAccount', {
        email: this.email,
        firstname: this.firstname,
        lastname: this.lastname,
        password: this.password
      }).then((response) => {
        console.log('Utilisateur créé avec succès !')
        self.$router.push('profile')
      }, (error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
