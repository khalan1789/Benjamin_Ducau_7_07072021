<template >
<div class="page">
    <NavbarArticle />
    <div class="container bg-light border border-secondary border-4 mb-5 mt-3">
        <h1 class=" text-center text-secondary">Bienvenue sur la partie administrateur de Groupomania</h1>
    </div>
    <main class="col-10 col-md-12 d-flex justify-content-center justify-content-xxl-start align-content-center  mt-4 flex-wrap">
        <div v-for="user of users" :key="user.id" class="card col-5 col-sm-7 col-md-3 col-lg-2 col-xl-1 border border-secondary">
            <div class="card-body d-flex flex-column justify-content-between" :id="user.id">
                <h5 class="card-title"> {{ user.firstname }} {{ user.lastname }} </h5>
                <h6 class="card-subtitle mb-2 text-muted"> {{ user.email }} </h6>
                <p> Est admin : {{ user.isAdmin }}</p>
                <div class="d-flex justify-content-between flex-column contain-btns">
                <button @click="onDeleteUser (user.id)" class="btn btn-sm bg-info text-dark mr-3 border border-secondary">Supprimer l'utilisateur</button>
                <button @click="giveAdminGrant (user.id)" class="btn btn-sm ml-1 bg-warning border border-secondary ">Donner les droits ADMIN</button>
                </div>
            </div>
        </div>
    </main>
</div>
</template>

<script>
import NavbarArticle from '@/components/NavbarArticle.vue'
import { mapState } from 'vuex'
export default {
  name: 'Admin',
  components: {
    NavbarArticle
  },
  //   data () {
  //       return {}
  //   },
  created () {
    this.$store.dispatch('getAllUsers')
    console.log('1 created : store state userInfos')
    console.log(this.$store.state.userInfos)
    console.log('2 created : store state article')
    console.log(this.$store.state.article)
    console.log('3 created : store state articleInfos')
    console.log(this.$store.state.articleInfos)
    console.log('4 created : store state likes')
    console.log(this.$store.state.likes)
    console.log('5 created : store state comments')
    console.log(this.$store.state.usersInfos)
  },
  computed: {
    ...mapState({
      users: 'usersInfos'
    })
  },
  methods: {
    async onDeleteUser (id) {
      console.log('lid est : ' + id)
      await this.$store.dispatch('adminDeleteUser', {
        userToDelete: id
      })
      await this.$store.dispatch('getAllUsers')
      alert('Utilisateur supprimé !')
    },
    giveAdminGrant (id) {
      console.log('grant id est : ' + id)
      this.$store.dispatch('adminGiveGrantAdmin', {
        userToDelete: id
      })
        .then(() => { this.$store.dispatch('getAllUsers') })
    }
  },
  mounted () {
    console.log('1 mounted : store state userInfos')
    console.log(this.$store.state.userInfos)
    console.log('2 mounted : store state article')
    console.log(this.$store.state.article)
    console.log('3 mounted : store state articleInfos')
    console.log(this.$store.state.articleInfos)
    console.log('4 mounted : store state likes')
    console.log(this.$store.state.likes)
    console.log('5 mounted : store state comments')
    console.log(this.$store.state.usersInfos)
  }
}
</script>

<style lang="scss" scoped>
.page{
  height: 100%;
  min-height: 100vh ;
  width: 100vw;
  background-image: linear-gradient(to bottom right,#ffd7d7,rgb(224, 155, 215));
}
.card{
    min-width: 270px;
    max-width: 450px;
    min-height: 250px;
    margin-left: 60px;
    margin-top: 30px;
}
.contain-btns{
    height:80px;
}
</style>
