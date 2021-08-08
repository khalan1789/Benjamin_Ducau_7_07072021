<template>
  <div class="home">
    <Navbar/>
    <div class="container nav-bar bg-light border border-secondary border-4 mb-5 mt-3">
        <h1 class="  text-secondary">Bienvenue sur le forum de Groupomania</h1>
    </div>
    <main class="container d-flex flex-column justify-content-center col-lg-6">
        <!-- Nouvel article -->
        <div class="accordion" id="accordionContainer">
            <div class="accordion-item bg-light bg-gradient border border-secondary bloc-article mb-3">
                <h2 class="accordion-header " id="headingOne">
                <button class="accordion-button border border-secondary text-secondary bg-light bg-gradient fw-bolder" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                Poster un nouvel article
                </button>
                </h2>
                <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionContainer">
                    <div class="accordion-body border border-secondary">
                        <form action="" class="p-1 form-group col bg-transparent mt-4">
                            <div class="form-group mt-3">
                                <label for="messageTitle" class="form-label text-secondary fs-4 fst-italic fw-bolder" required >Titre</label>
                                <input v-model="articleTitle" class="form-control fs-4 " id="messageTitle" type="text text-wrap" placeholder="Votre titre ici ..." >
                            </div>
                            <div class="form-group mt-3 text-start">
                                <label for="messageTextContain" class="form-label fs-5 text-secondary fw-bolder fst-italic">Pour renseigner l'article</label>
                                <textarea v-model="articleContain" class="form-control fs-4 " id="messageTextContain" type="text" placeholder="Votre texte ici ..."></textarea>
                            </div>
                            <div class="form-group mt-3 mb-3 text-start">
                                <label for="newArticleImage" class=" form-label text-end text-secondary fs-5 fw-bolder fst-italic ml-2">Ajouter une photo</label>
                                <input  @change="onFileSelected" class="form-control" type="file" id="newArticleImage" accept=".jpg, .jpeg, .png">
                            </div>
                            <div class="d-flex flex-column-reverse flex-md-row justify-content-md-between">
                                <button @click="cancelFields" class="btn btn-rounded mt-3 mt-md-2 mb-3 pl-3">Annuler</button>
                                <button @click="publishArticle" class="btn btn-lg bg-secondary bg-gradient text-light mt-3 mt-md-2 mb-2 mr-3" type="submit" :class="{'disabled' : !validateFields}" >Poster cet article</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    <!-- Zone articles  -->
        <div v-if="articles.length === 0" class="card" >
            <div class="card-body">
                <h1 class="card-title">Aucun article à afficher pour le moment !!</h1>
                <p class="card-text fs-2">Franchissez le cap de votre timidité et soyez le premier à poster un article !</p>
        </div>
        </div>
        <div v-else v-for="article in articles" :key="article.id" class="card mt-2 mb-3 shadow-lg border-secondary messagePosted" :id="article.id">
            <div class="d-flex justify-content-between bg-secondary bg-gradient p-1">
            <h5 class="  text-start text-white fst-italic" v-if="article.User">Posté par {{ article.User.firstname }} {{ article.User.lastname }} </h5>
            <span class="text-end"><fa class="align-middle text-white" style="width:30px" icon="heart"/><span v-if="article.Likes" class="align-text-top text-white">{{ article.Likes.length }}</span></span>
            </div>
            <img :src="article.imageUrl" class="card-img-top article-img"  alt="photo de l'article posté" v-if="article.imageUrl">
            <div class="card-body overflow-auto" style="max-height:100px">
                <h3 class="card-title border-bottom-primary"> {{ article.title }}</h3>
                <p class="text-break text-start fs-4">{{ article.contain }} </p>
            </div>
        <!-- Zonne commentaires -->
          <div class=" mb-1 mt-2 border-top border-light" >
              <button @click="showThisArticle (article.id)" class="w-50 text-center btn btn-lg btn-outline-secondary bg-primary comment-btn ">Voir l'article en détail / commenter</button>
          </div>
      </div>
    </main>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'
import { mapState } from 'vuex'

export default {
  name: 'Home',
  components: {
    Navbar
  },
  data () {
    return {
      articleTitle: '',
      articleContain: '',
      selectedFile: ''
    }
  },
  mounted () {
    if (this.$store.state.user.userId === -1) {
      this.$router.push('login')
      return
    }
    this.$store.dispatch('getUserInfos')
    this.$store.dispatch('getAllArticles')
  },
  methods: {
    onFileSelected (event) {
      this.selectedFile = event.target.files[0]
    },
    async publishArticle (e) {
      e.preventDefault()
      if (this.articleContain === '' && !this.selectedFile) {
        return console.log('erreur au moins un des champs est requis : contenu ou image')
      }
      const formData = new FormData()
      if (this.selectedFile) {
        formData.append('image', this.selectedFile)
        formData.append('name', this.selectedFile.name)
      }
      formData.append('title', this.articleTitle)
      formData.append('contain', this.articleContain)
      formData.append('userId', this.$store.state.user.userId)
      confirm('Vous êtes sur le point de publier un article, êtes-vous sûr(e) ?')
      e.preventDefault()
      await this.$store.dispatch('publishArticle', formData)
        .then(() => {
          this.$store.dispatch('getAllArticles')
        })
        .catch(error => {
          console.log(error)
        })
    },
    cancelFields () {
      this.articleTitle = ''
      this.articleContain = ''
      this.selectedFile = ''
    },
    showThisArticle (articleId) {
      this.$router.push(`/article/${articleId}`)
    },
    nameAuthor () {
      const firstname = this.article.User.firstname
      const lastname = this.article.User.lastname
      return firstname + ' ' + lastname
    },
    async downloadArticles () {
      await this.$store.dispatch('getAllArticles')
    }
  },
  computed: {
    validateFields: function () {
      if (this.articleTitle === '') {
        return false
      } else if (this.articleContain === '' && !this.selectedFile) {
        return false
      } else {
        return true
      }
    },
    ...mapState({
      articles: 'article'
    })
  }
}
</script>

<style lang="scss" scoped>
.home{
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
.messagePosted{
  max-height: 650px;
  overflow: hidden;
}
.article-img{
  object-fit: contain;
  max-height: 400px;
}
.ellipseText{
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
