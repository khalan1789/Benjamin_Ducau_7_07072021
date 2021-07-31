<template>
    <main class="bg-light">
        <div class="profile-card">
              <div class="photo-group border-secondary bg-primary">
                <p class=""><img class="bg-info img-profile mt-4" src="../logos/icon.png" alt="photo de profil"/></p>
                <button class="btn btn-sm bg-light border-secondary mb-md-4 mb-3">Ajouter ma photo</button>
              </div>
              <div class="info-group bg-primary text-center">
                  <h2 class="text-secondary text-break mt-3 mb-4">{{ firstname }} {{ lastname }}</h2>
                  <h5 class="text-break mt-3 mb-4">{{email }}</h5>
                  <button class="btn w-50 border-primary mt-5 align-self-center bg-light border-secondary">Retour à l'accueil</button>
                  <div class="info-button-group mt-3 d-flex flex-column w-50 align-self-center">
                    <button class="btn mt-3 mb-4 bg-light border-secondary">Déconnexion</button>
                    <button class="btn mt-3 mb-4 btn-sm bg-light border-secondary text-secondary ">Supprimer mon compte</button>
                  </div>
              </div>
        </div>
    </main>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Profile',
  data () {
    return {
      email: 'jeanmicheldelafontaine@email.com',
      firstname: 'jean michel',
      lastname: 'de la fontaine',
      photoProfile: ''
    }
  },
  computed: {
    ...mapState({
      user: 'userInfos'
    })
  },
  mounted () {
    if (this.$store.state.user.userId === -1) {
      this.$router.push('login')
      return
    }
    this.$store.dispatch('getUserInfos')
  }
}
</script>

<style lang="scss" scoped>
.img-profile{
  max-width: 350px;
  max-height: 300px;
  @media (max-width: 500px) {
    width: 200px
  }
}

main {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  // align-items: center;
}
.profile-card{
  width: 90vw;
   @media (min-width: 930px){
    display: flex;
    flex-direction: row;
  };
  @media (min-width: 1200px){
    width: 65vw;
  }
}

.photo-group{
  width: 100%;
  min-height: 300px;
}

.info-group{
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  min-height: 200px;
}

.info-button-group{
  display: flex;
  flex-direction: column;
   @media (min-width: 930px){
    flex-direction: row;
  }

}
</style>
