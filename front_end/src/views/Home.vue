<template>
  <div class="home">
    <Navbar/>
    <div class="container-fluid">
       <h1 class=" bg-info text-dark">Bienvenue sur le forum</h1>
    </div>
    <main class="container d-flex justify-content-center">
      <div class="card ">
        <img src="../logos/curry.jpg" class="card-img-top" alt="">
        <div class="card-body">
          <h3 class="card-title">Titre de la description ici</h3>
          <p class="h5 card-text">Some quick example text to build on the card title and make up the bulk of the card's content. It's very nice dont you think</p>
        <div>
          <p class="text-md-end">Posté par Fleury Michon</p>
        </div>
        </div>
        <div class="d-flex">
          <button class="w-50"></button>
          <span class="w-50 bg-info"></span>
        </div>
        <div class="d-flex flex-column flex-lg-row justify-content-between">
          <span>Rose Marie de La fuente a dit : </span>
          <p class="h5">Waouh c'est de troip de la balle ce truc de fou!</p>
        </div>
        <p class="h5">1er commentaire ici</p>
        <p>2ème commentaire ici</p>
        <div class="input-group mb-3 p-2">
          <input class="form-control" placeholder="Ajouter un commentaire" aria-label="zone d'ajout de commentaire" aria-describedby="bouton validation commentaire" type="text-area"/>
          <button class="btn btn-outline-secondary comment-btn">Commenter</button>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'Home',
  components: {
    Navbar
  }
}
</script>

<style lang="scss" scoped>
.home{
  height: 100vh;
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
// .comment-btn{
//   min-width: 30px;
// }
</style>
