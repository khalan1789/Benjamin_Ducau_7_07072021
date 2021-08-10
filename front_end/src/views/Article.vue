<template>
    <div class="page-vue">
        <NavbarMessage/>
        <main class="container d-flex flex-column justify-content-center col-lg-7 ">
            <div class="card mt-3 mb-3 shadow-lg border-secondary">
                <div class="d-flex justify-content-between bg-secondary bg-gradient">
                    <div v-if="article.User" class="profile-avatar col-2 col-lg-2 d-flex justify-content-center align-items-center ">
                       <img :src="article.User.profileImageUrl" alt="photo profil de l'éditeur du message" class="avatar" />
                    </div>
                    <h3 v-if="article.User" class="mt-2 text-start fw-bolder p-1 text-white fst-italic col-7 col-lg-8" > {{ article.User.firstname}} {{ article.User.lastname}}</h3>
                    <button class="btn bg-light col-3 col-lg-2" aria-label="logo de suppression pour l'admin ou l'éditeur de l'article"><fa icon="trash-alt"></fa></button>
                </div>
                <img :src="article.imageUrl" class="card-img-top article-img"  alt="image de l'article" v-if="article.imageUrl">
                <div class="card-body">
                    <h3 class="card-title border-bottom-primary mt-2 mb-1"> {{ article.title }} </h3>
                    <p class="fs-4  mt-3 card-text">{{ article.contain }}</p>
                </div>
                <div class="d-flex p-1 mb-3 mt-2">
                    <button @click="likeArticle" class="btn btn-outline-secondary w-50 " aria-label="add a like button" style="height:30px"><fa class="align-top" icon="thumbs-up"/></button>
                    <span class="w-50 bg-secondary"><fa class="align-middle text-white" style="width:30px" icon="heart"/><span v-if="article.Likes" class="align-text-top text-white">{{ article.Likes.length }}</span></span>
                </div>
                <!-- Zonne commentaires -->
                <div >
                    <div v-for="comment of article.Comments" :key="comment.id" class="w-30 p-1 m-2 d-flex flex-column border border-secondary bg-primary bg-radient rounded" :data-id="article.Comments.id">
                        <div class="d-flex justify-content-between">
                            <span v-if="comment.User" class="fs-6 text-start fst-italic fw-bolder"> {{ comment.User.firstname }} {{ comment.User.lastname }} <fa class="mr-2" icon="comment-dots"/> : </span>
                            <button class="bg-light " role="delete" aria-label="bouton de suppression du commentaire pour l'admin ou l'autheur du commentaire" @click="deleteComment( comment.id )" ><fa icon="trash-alt"/></button>
                        </div>
                            <p class="text-start">{{ comment.contain }}</p>
                    </div>
                </div>
                <div class="input-group mb-3 p-2">
                    <input v-model="commentContain" class="form-control" placeholder="Ajouter un commentaire" aria-label="zone d'ajout de commentaire"  type="text-area"/>
                    <button @click="submitComment" class="btn btn-outline-secondary comment-btn">Commenter</button>
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
  data () {
    return {
      commentContain: ''
    }
  },
  computed: {
    ...mapState({
      user: 'userInfos',
      article: 'articleInfos',
      comment: 'commentInfosStatus',
      like: 'likes'
    })
  },
  created () {
    const urlId = this.$route.params.id
    console.log('id de url : ' + urlId)
    this.$store.dispatch('getSelectedArticle', urlId)
  },
  mounted () {
    if (this.$store.state.user.userId === -1) {
      this.$router.push('login')
      return
    }
    this.$store.dispatch('getUserInfos')
    console.log(this.$store.state.userInfos)
    console.log(this.$store.state.article)
    console.log(this.$store.state.articleInfos)
    console.log(this.$store.state.comments)
  },
  methods: {
    async submitComment () {
      const contain = this.commentContain
      const articleId = this.article.id
      const userId = this.$store.state.user.userId
      const commentInfos = { contain, articleId, userId }
      await this.$store.dispatch('submitComment', commentInfos)
      const urlId = articleId
      console.log('urlId : ' + urlId)
      await this.$store.dispatch('getSelectedArticle', urlId)
      this.commentContain = ''
      window.alert('Commentaire envoyé!')
    },
    deleteComment (commentId) {
      // console.log('id com : ' + commentId)
      this.$store.dispatch('deleteComment', commentId)
      const urlId = this.article.id
      this.$store.dispatch('getSelectedArticle', urlId)
      window.alert('Commentaire supprimé!')
    },
    async likeArticle () {
      console.log('user id : ' + this.user.id)
      console.log('article id : ' + this.article.id)
      console.log(this.like)
      console.log('likes : ')
      console.log(this.article.Likes)
      let rate
      let likeId
      if (this.article.Likes.length === 0) {
        console.log('voyons le user id')
        console.log(this.user.id)
        rate = 1
        console.log('rate : ' + rate)
        // return rate
      } else {
        this.article.Likes.forEach(like => {
          if (like.UserId === this.user.id) {
            console.log('voyons le user id')
            console.log(this.user.id)
            console.log(like.UserId)
            console.log('a priori il le trouvate')
            rate = 0
            likeId = like.id
            console.log('rate : ' + rate)
            // return rate
          } else {
            console.log('voyons le user id')
            console.log(this.user.id)
            console.log(like.UserId)
            console.log('non trouvé')
            rate = 1
            likeId = like.id
            console.log('rate : ' + rate)
            // return rate
          }
        })
      }
      console.log('rate après vérif : ' + rate)
      await this.$store.dispatch('onLikeArticle', {
        userId: this.user.id,
        articleId: this.article.id,
        rate: rate,
        likeId
      })
      const urlId = this.article.id
      this.$store.dispatch('getSelectedArticle', urlId)
    }
  }
}
</script>

<style lang="scss" scoped>
.page-vue{
  height: 100%;
  min-height: 100vh;
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
  object-fit: contain;
  max-height: 690px;
}
</style>
