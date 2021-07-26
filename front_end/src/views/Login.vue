<template >
    <Header></Header>
    <main class="">
        <div class="container d-flex justify-content-md-center bg-primary col-lg-4 mb-5" >
            <div class="row justify-content-md-center col text-center">
                <h2 class="mt-5 mb-4">Bienvenue chez Groupomania</h2>
                <form class="mt-2">
                    <div class="form-group col ">
                        <label for="email"  class=" mb-2 mt-2 h5">Email</label>
                        <input type="email" id="email" class="form-control mb-2 mt-2" placeholder="Veuillez rentrer votre email ici"/>
                    </div>
                    <div class="form-group col">
                        <label for="password" class=" mb-2 mt-2 h5 ">Mot de passe</label>
                        <input type="password" id="password" class="form-control mb-3 mt-2 " placeholder="Veuillez rentrer votre mot de passe ici"/>
                    </div>
                    <button type="submit" class="btn btn-lg btn-outline-secondary text-secondary bg-light mt-4 mb-3">Se connecter</button>
                </form>
                <div>
                    <h5 class="mt-3 mb-2">Pas encore inscrit ?</h5>
                    <button type="submit" class="btn btn-md btn-outline-secondary text-secondary bg-light mt-1 mb-3" ><router-link class="text-secondary bg-light text-decoration-none" to="/signin">S'inscrire</router-link></button>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import Header from '../components/Header.vue'

export default {
  name: 'login',
  components: {
    Header
  }
}
</script>

<style lang="sass" scoped>
</style>
