<template>
    <main class="">
        <div class="profile-card">
            <div class="photo-group border-secondary bg-primary">
                <p class=""><img class="bg-info img-profile mt-4" :src="user.profileImageUrl" alt="photo de profil"/></p>
                <div class="d-flex flex-column align-items-center">
                    <input type="file" @change="onFileSelected" ref="changeImageInput" class="invisible" id="profileImage" name="image" accept=".jpg, .jpeg, .png" />
                    <label class="invisible" aria-label="zone de chargement photo" for="profileImage">Changer ma photo</label>
                    <button @click="$refs.changeImageInput.click()" class="btn btn-sm bg-light border-secondary mb-md-4 mb-3 col-6 col-md-5">Changer ma photo</button>
                    <button @click="uploadImg" class="btn btn-sm bg-light border-secondary mb-md-4 mb-3 col-6 col-md-5">Valider</button>
                </div>
            </div>
            <div class="info-group bg-primary text-center">
                <h2 class="text-secondary text-break mt-3 mb-4">{{ user.firstname }} {{user.lastname }}</h2>
                <h3 class="h4 text-break mt-3 mb-4">{{user.email }}</h3>
                <span v-if="user.isAdmin === true"><fa icon="user-shield"/> Vous êtes admin</span>
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
  data () {
    return {
      selectedFile: ''
    }
  },
  mounted () {
    console.log('state user id : ' + this.$store.state.user.userId)
    if (this.$store.state.user.userId === -1) {
      this.$router.push('login')
      return
    }
    this.$store.dispatch('getUserInfos')
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
    },
    onFileSelected (event) {
      this.selectedFile = event.target.files[0]
    },
    async uploadImg () {
      const formData = new FormData()
      formData.append('image', this.selectedFile)
      formData.append('name', this.selectedFile.name)
      await this.$store.dispatch('uploadProfileImage', formData)
        .then(() => {
          this.$store.dispatch('getUserInfos')
        })
        .catch(error =>
          console.log(error))
    },
    deleteAccount: function () {
      this.logout()
      this.$store.dispatch('deleteAccount')
    }
  }
}
</script>

<style lang="scss" scoped>
.img-profile{
  max-width: 350px;
  max-height: 300px;
  object-fit: contain;
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
  position: absolute;
  top: 0; bottom: 0; left: 0; right: 0;
  height: 100%;
  margin:0;
  padding:0;
  background-size: 100% ;
   &:before{
     content: "";
        position: fixed;
        height: 100%; width: 100%;
        background: url("../logos/icon-left-font-monochrome-white.png") ;
        background-size: contain;
        z-index: -1;
        filter: blur(5px);
        -webkit-background-size: contain; /* pour Chrome et Safari */
        -moz-background-size: contain; /* pour Firefox */
        -o-background-size: contain; /* pour Opera */
        background-color: #2c3e50;
   }
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
  margin-top: 150px;
  width: 100%;
  min-height: 300px;
  @media (min-width: 930px){
    margin-top: 0px;
  }
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
