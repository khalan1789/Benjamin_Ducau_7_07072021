<template>
   <nav class="navbar navbar-expand-lg navbar-dark bg-secondary bg-gradient">
        <div class="container-fluid">
            <span class="navbar-brand" ><img class="logo-img" src="../logos/icon-left-font-monochrome-white.svg" alt="logo groupomania"></span>
            <button class="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-end " id="navbarNav">
                <ul class="navbar-nav">
                    <li v-if="user.isAdmin === true" class="nav-item mr-3">
                        <router-link class="nav-link text-white nav-btn-hover" to="/admin">Gestion administrateur</router-link>
                    </li>
                    <li class="nav-item mr-3 ml-3">
                        <router-link class="nav-link text-white nav-btn-hover" to="/profile">Mon profil</router-link>
                    </li>
                    <li class="nav-item ml-3">
                        <a href="#" @click="logout()" class="nav-link text-white nav-btn-hover ">Se déconnecter</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import { mapState } from 'vuex'
export default ({
  name: 'Navbar',
  methods: {
    logout: function () {
      this.$router.push('login')
      this.$store.commit('logout')
    }
  },
  computed: {
    ...mapState({
      user: 'userInfos'
    })
  }
})
</script>

<style lang="scss" scoped>
.logo-img{
    width: 200px;
    height: 70px;
    @media (min-width: 630px){
        width: 350px;
    };
    @media (min-width: 930px){
        width: auto;
        margin-left: 2rem;
    };
}
#navbarNav{
    @media (min-width: 990px){
        margin-right: 2rem;
    };
}
.nav-item{
     @media (min-width: 990px){
        margin-right: 2rem;
    };
    :hover{
        font-size: 1.2rem;
        color: purple;
    }
}
a{
    :hover{
        cursor: pointer;
    }
}
</style>
