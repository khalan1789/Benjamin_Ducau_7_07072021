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
              <!-- <h2 class="accordion header text-light text-center fs-3 fst-italic bg-secondary">Votre nouvel article</h2> -->
              <h2 class="accordion-header" id="headingOne">
                  <button class="btn btn-lg bg-secondary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  </button>
              </h2>
              <div class="accordion-collapse collapse" id="collapseOne">
                <div class="accordion-body">
                  <form action="" class="p-1 form-group col bg-transparent mt-4">
                  <div class="form-group mt-3">
                      <label for="messageTitle" class="form-label text-secondary fs-4 fst-italic fw-bolder" required>Titre</label>
                      <input class="form-control fs-4 " id="messageTitle" type="text text-wrap" placeholder="Votre titre ici ...">
                  </div>
                  <div class="form-group mt-3 text-start">
                      <label for="messageTextContain" class="form-label fs-5 text-secondary fw-bolder fst-italic">Pour renseigner l'artcile</label>
                      <textarea class="form-control fs-4 " id="messageTextContain" type="text" placeholder="Votre texte ici ..."></textarea>
                  </div>
                  <div class="form-group mt-3 mb-3 text-start">
                      <label for="newPostImage" class=" form-label text-end text-secondary fs-5 fw-bolder fst-italic ml-2">Ajouter une photo</label>
                      <input class="form-control " type="file" id="newPostImage" accept=".jpg, .jpeg, .png">
                  </div>
                  <button class="btn btn-lg bg-secondary bg-gradient text-light mt-1 mb-2" type="submit">Poster cet article</button>
                  </form>
                </div>
              </div>
          </div>
        </div>
                  <!-- Zone articles  -->
        <div class="card mt-2 mb-3 shadow-lg border-secondary">
            <h5 class="bg-secondary p-1 bg-gradient text-start text-white fst-italic" >Posté par Fleury michon</h5>
            <img src="../logos/curry.jpg" class="card-img-top"  alt="">
            <div class="card-body">
                <h3 class="card-title border-bottom-primary">Titre de la description ici</h3>
                <p class="h5 card-text">Some quick example text to build on the card title and make up the bulk of the card's content. It's very nice dont you think</p>
            </div>
            <div class="d-flex p-1 mb-3 mt-2">
                <button class="btn btn-outline-secondary w-50 " aria-label="add a like button" style="height:30px"><fa class="align-top" icon="thumbs-up"/></button>
                <span class="w-50 bg-secondary"><fa class="align-middle text-white" style="width:30px" icon="heart"/><span class="align-text-top text-white">12</span></span>
            </div>
        <!-- Zonne commentaires -->
          <div class="w-30 p-1 m-2 d-flex flex-column border border-secondary bg-primary bg-radient rounded">
            <div class="d-flex justify-content-between">
                <span class="fs-6 text-start fst-italic fw-bolder"> Marie de La fuente <fa class="mr-2" icon="comment-dots"/> : </span> <button class="invisible" role="delete for admin" aria-label="delete for admin"><fa icon="trash-alt"/></button>
            </div>
                <p class="text-start">Waouh c'est de troip de la balle ce truc de fou! oh pinaise que jak ckjkjke edkjdeknd kjdkjdekj jljlkj</p>
          </div>
          <div class="input-group mb-3 p-2">
              <input class="form-control" placeholder="Ajouter un commentaire" aria-label="zone d'ajout de commentaire"  type="text-area"/>
              <button class="btn btn-outline-secondary comment-btn">Commenter</button>
          </div>
      </div>
      <!-- séparation des cards -->
       <!-- <div class="card mt-2 mb-3 shadow-lg border-secondary">
         <h5 class="bg-secondary p-1 bg-gradient text-start text-white" ><i>Posté par Fleury michon</i></h5>
        <img src="../logos/arrabiata.jpg" class="card-img-top" alt="">
        <div class="card-body">
          <h3 class="card-title border-bottom-primary">Titre de la description ici</h3>
          <p class="h5 card-text">Some quick example text to build on the card title and make up the bulk of the card's content. It's very nice dont you think</p>
        <div>
          <p class="text-md-end">Posté par Fleury Michon</p>
        </div>
        </div>
        <div class="d-flex p-1">
          <button class="btn btn-outline-secondary w-50 " style="height:30px"><fa class="align-top" icon="thumbs-up"/></button>
          <span class="w-50 bg-secondary"><fa class="align-middle text-white" style="width:30px" icon="heart"/><span class="align-text-top text-white">12</span></span>
        </div>
        <div class="d-flex flex-column flex-lg-row justify-content-between">
          <span>Rose Marie de La fuente a dit : </span>
          <p class="h5 ">Waouh c'est de troip de la balle ce truc de fou!</p>
        </div>
        <p class="h5">1er commentaire ici</p>
        <p>2ème commentaire ici</p>
        <div class="input-group mb-3 p-2">
          <input class="form-control" placeholder="Ajouter un commentaire" aria-label="zone d'ajout de commentaire" aria-describedby="bouton validation commentaire" type="text-area"/>
          <button class="btn btn-outline-secondary comment-btn">Commenter</button>
        </div>
      </div> -->
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
.bloc-article{
  // min-height: 50vh;
}

</style>
