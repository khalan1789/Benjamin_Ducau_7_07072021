<template>
  <div class="mt-5 mb-0">
    <div class="container bg-primary vh-100 w-auto d-flex justify-content-center align-items-center">
        <div class="bg-white d-md-flex align-items-center">
            <div class="col d-flex-column">
                <p><img class="bg-info" style="max-width:300px" src="../logos/icon.png" alt="photo de profil"/></p>
                <button class="btn border-primary mb-md-4 mb-3">Ajouter ma photo</button>
            </div>
            <div class="border-secondary px-3 d-flex-column justify-content-between">
              <div class="mb-4">
                <h1 class="mb-3 mt-3 mb-md-5 mr-md-2">{{ firstname }} {{ lastname }}</h1>
                <h3 class="mb-5">{{ email }}</h3>
              </div>
                <button class="btn border-primary mt-5 align-self-end">Supprimer mon compte</button>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  data () {
    return {
      email: 'ironman@jo.tokyo',
      firstname: 'Benjamin',
      lastname: 'Ducau',
      photoProfile: ''
    }
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
.container{

}
</style>
