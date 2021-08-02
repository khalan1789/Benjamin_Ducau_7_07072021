<template>
    <main class="bg-light">
        <div class="profile-card">
              <div class="photo-group border-secondary bg-primary">
                <input type="file" accept=".jpg, .jpeg, .png" />
                <p class=""><img class="bg-info img-profile mt-4" :src="user.profileImageUrl" alt="photo de profil"/></p>
                <button class="btn btn-sm bg-light border-secondary mb-md-4 mb-3">Ajouter ma photo</button>
              </div>
              <div class="info-group bg-primary text-center">
                  <h2 class="text-secondary text-break mt-3 mb-4">{{ user.firstname }} {{user.lastname }}</h2>
                  <h5 class="text-break mt-3 mb-4">{{user.email }}</h5>
                  <button @click="backToMainMenu ()" class="btn w-50 border-primary mt-5 align-self-center bg-light border-secondary">Retour à l'accueil</button>
                  <div class="info-button-group mt-3 d-flex flex-column w-50 align-self-center">
                    <button @click="logout()" class="btn mt-3 mb-4 bg-light border-secondary">Déconnexion</button>
                    <button @click="deleteAccount()" class="btn mt-3 mb-4 btn-sm bg-light border-secondary text-secondary ">Supprimer mon compte</button>
                  </div>
              </div>
        </div>
    </main>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Profile',
  mounted () {
    console.log('state user id : ' + this.$store.state.user.userId)
    if (this.$store.state.user.userId === -1) {
      this.$router.push('login')
      return
    }
    this.$store.dispatch('getUserInfos')
    console.log('voyons le dispatch : ' + this.$store.dispatch('getUserInfos'))
  },
  computed: {
    ...mapState({
      user: 'userInfos'
    })
  },
  methods: {
    logout: function () {
      this.$store.commit('logout')
      this.$router.push('login')
    },
    backToMainMenu: function () {
      this.$router.push('/')
    }
    // deleteAccount: function ()  {
    //   return new Promise((resolve, reject) => {
    //     instance.delete('/auth/profile/' + state.user.userId)
    //       .then((response) => {
    //         commit('setStatus', 'deleted')
    //         this.logout
    //         resolve(response)
    //       })
    //       .catch((error) => {
    //         commit('setStatus', 'error_to_sigin')
    //         reject(error)
    //       })
    //   })
    // }
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
