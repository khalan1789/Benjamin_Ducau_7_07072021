<template>
    <div class="page-vue">
        <NavbarMessage/>
        <main class="container d-flex flex-column justify-content-center col-lg-7 ">
            <div class="card mt-3 mb-3 shadow-lg border-secondary">
                <div class="d-flex justify-content-between bg-secondary bg-gradient">
                    <div class="profile-avatar col-2 col-lg-2 d-flex justify-content-center align-items-center ">
                       <img :src="user.profileImageUrl" alt="photo profil de l'éditeur du message" class="avatar" />
                    </div>
                    <h3 class="mt-2 text-start fw-bolder p-1 text-white fst-italic col-7 col-lg-8" > {{ user.firstname}} {{ user.lastname}}</h3>
                    <button class="btn bg-light col-3 col-lg-2"><fa icon="trash-alt"></fa></button>
                </div>
                <img src="../logos/arrabiata.jpg" class="card-img-top article-img"  alt="image de l'article" >
                <div class="card-body">
                    <h3 class="card-title border-bottom-primary">Titre de la description ici</h3>
                    <p class="h5 card-text">Some quick example text to build on the card title and make up the bulk of the card's content. It's very nice dont you think</p>
                </div>
                <div class="d-flex p-1 mb-3 mt-2">
                    <button class="btn btn-outline-secondary w-50 " aria-label="add a like button" style="height:30px"><fa class="align-top" icon="thumbs-up"/></button>
                    <span class="w-50 bg-secondary"><fa class="align-middle text-white" style="width:30px" icon="heart"/><span class="align-text-top text-white">12</span></span>
                </div>
                <!-- Zonne commentaires -->
                <div>
                    <div class="w-30 p-1 m-2 d-flex flex-column border border-secondary bg-primary bg-radient rounded">
                        <div class="d-flex justify-content-between">
                            <span class="fs-6 text-start fst-italic fw-bolder"> Marie de La fuente <fa class="mr-2" icon="comment-dots"/> : </span> <button class="bg-light " role="delete for admin" aria-label="delete for admin"><fa icon="trash-alt"/></button>
                        </div>
                            <p class="text-start">Waouh c'est de troip de la balle ce truc de fou! oh pinaise que jak ckjkjke edkjdeknd kjdkjdekj jljlkj</p>
                    </div>
                    <div class="w-30 p-1 m-2 d-flex flex-column border border-secondary bg-primary bg-radient rounded">
                        <div class="d-flex justify-content-between">
                            <span class="fs-6 text-start fst-italic fw-bolder"> Marie de La fuente <fa class="mr-2" icon="comment-dots"/> : </span> <button class="bg-light " role="delete for admin" aria-label="delete for admin"><fa icon="trash-alt"/></button>
                        </div>
                            <p class="text-start">Waouh c'est de troip de la balle ce truc de fou! oh pinaise que jak ckjkjke edkjdeknd kjdkjdekj jljlkj</p>
                    </div>
                    <div class="w-30 p-1 m-2 d-flex flex-column border border-secondary bg-primary bg-radient rounded">
                        <div class="d-flex justify-content-between">
                            <span class="fs-6 text-start fst-italic fw-bolder"> Marie de La fuente <fa class="mr-2" icon="comment-dots"/> : </span> <button class="bg-light " role="delete for admin" aria-label="delete for admin"><fa icon="trash-alt"/></button>
                        </div>
                            <p class="text-start">Waouh c'est de troip de la balle ce truc de fou! oh pinaise que jak ckjkjke edkjdeknd kjdkjdekj jljlkj</p>
                    </div>
                    <div class="w-30 p-1 m-2 d-flex flex-column border border-secondary bg-primary bg-radient rounded">
                        <div class="d-flex justify-content-between">
                            <span class="fs-6 text-start fst-italic fw-bolder"> Marie de La fuente <fa class="mr-2" icon="comment-dots"/> : </span> <button class="bg-light " role="delete for admin" aria-label="delete for admin"><fa icon="trash-alt"/></button>
                        </div>
                            <p class="text-start">Waouh c'est de troip de la balle ce truc de fou! oh pinaise que jak ckjkjke edkjdeknd kjdkjdekj jljlkj</p>
                    </div>
                </div>
                <div class="input-group mb-3 p-2">
                    <input class="form-control" placeholder="Ajouter un commentaire" aria-label="zone d'ajout de commentaire"  type="text-area"/>
                    <button class="btn btn-outline-secondary comment-btn">Commenter</button>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
// @ is an alias to /src
import NavbarMessage from '@/components/NavbarMessage.vue'
import { mapState } from 'vuex'

export default {
  name: 'Message',
  components: {
    NavbarMessage
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
.page-vue{
  height: 100%;
  width: 100vw;
  background-image: linear-gradient(to bottom right,#ffd7d7,rgb(224, 155, 215));
}
.side-section {
  min-height: 30vh;
  max-height: 90vh;
}
.post-section{
  min-height: 30vh;
  max-height: 90vh;
}
.profile-avatar{
    max-height: 60px;
    max-width: 60px;
    @media (min-width: 650px){
      height: 80px;
      max-width: 80px;
    }
}
.avatar{
    width: 100%;
    height: 100%;
}
.article-img{
  object-fit: fill;
  max-height: 690px;
}
</style>
