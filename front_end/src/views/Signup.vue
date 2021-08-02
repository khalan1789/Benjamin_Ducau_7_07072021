<template>
    <main >
      <Header></Header>
        <div class="container justify-content-md-center bg-primary col-lg-4 mb-5">
            <div class="row justify-content-md-center col text-center">
                <h2 class="mt-4">Rejoignez-nous !</h2>
                <form class="mt-3 mb-3" >
                    <div class="form-group col mt-3">
                        <label for="firstname"  class=" mb-2 mt-2 h5">Prénom</label>
                        <input v-model="firstname" type="text" id="firstname" class="form-control mb-2 mt-2" placeholder="Veuillez rentrer votre prénom ici" pattern="^[A-Za-z- éè^ïö]+$" required/>
                    </div>
                    <div class="form-group col mt-3">
                        <label for="lastname" class=" mb-2 mt-2 h5 ">Nom</label>
                        <input v-model="lastname" type="text" id="lastname" class="form-control mb-2 mt-2" placeholder="Veuillez rentrer votre nom ici" pattern="^[A-Za-z- éè^ïö]+$" required/>
                    </div>
                    <div class="form-group col mt-3">
                        <label for="email"  class=" mb-2 mt-2 h5">Email</label>
                        <input v-model="email" type="email" id="email" class="form-control mb-2 mt-2" placeholder="Veuillez rentrer votre email ici" pattern="^[a-zA-Z0-9._-]+[@]{1}[a-zA-Z0-9._-]+[.]{1}[a-z]{2,8}$" required/>
                    </div>
                    <div class="form-group col mb-5 mt-3">
                        <label for="password" class=" mb-2 mt-2 h5 ">Mot de passe</label>
                        <input v-model="password" type="password" id="password" class="form-control mb-2 mt-2" placeholder="Veuillez rentrer votre mot de passe ici"/>
                    </div>
                    <div class="row" v-if="status == 'error_to_sigin'">
                      <p class="text-danger h5">Utilisateur déjà existant ou bien les champs ne sont pas corretement renseignés! Le mot de passe doit avoir au moins 8 caractères, une minuscule et une majuscule.</p>
                    </div>
                    <span v-if="status == 'creating'" class="spinner-border text-secondary"></span>
                    <button type="submit" v-else @click="createAccount" class="btn btn-lg btn-outline-secondary text-secondary bg-light mt-3 mb-3" :class="{'disabled' : !validateFields}">Valider l'inscription</button>
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
  name: 'signup',
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
      const regexpEmail = /^[a-zA-Z0-9._-]+[@]{1}[a-zA-Z0-9._-]+[.]{1}[a-z]{2,8}$/
      const regexpFields = /^[A-Za-z- éè^ïö]+$/
      if (regexpEmail.test(this.email) !== true || regexpFields.test(this.firstname) !== true || regexpFields.test(this.lastname) !== true || (this.email === '' && this.password === '' && this.lastname === '' && this.firstname === '')) {
        return false
      } else {
        return true
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
        this.$store.dispatch('login', {
          email: this.email,
          password: this.password
        }).then((response) => {
          self.$router.push('/')
          console.log(response)
        }, (error) => {
          console.log(error)
        })
      }, (error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
