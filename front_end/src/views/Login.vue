<template >
    <header>
        <div class="container d-flex justify-content-md-center">
            <div class="row col col-lg-3 justify-content-md-center text-center  " >
                <p class="text-center"><img src="../logos/icon-above-font.svg" alt="logo de groupomania" class="imglogo ml-5" style="width:300px height:80px"/></p>
            </div>
        </div>
    </header>

    <main class="">
        <div class="container d-flex justify-content-md-center bg-primary col-lg-4 mb-5" >
            <div class="row justify-content-md-center col text-center">
                <h2 class="mt-5 mb-4">Bienvenue sur le forum Groupomania</h2>
                <form class="mt-2">
                    <div class="form-group col ">
                        <label for="email"  class=" mb-2 mt-2 h5">Email</label>
                        <input type="email" id="email" class="form-control mb-2 mt-2" placeholder="Veuillez rentrer votre email ici"/>
                    </div>
                    <div class="form-group col">
                        <label for="password" class=" mb-2 mt-2 h5 ">Mot de passe</label>
                        <input type="password" id="password" class="form-control mb-3 mt-2 " placeholder="Veuillez rentrer votre mot de passe ici"/>
                    </div>
                    <button type="submit" class="btn btn-lg btn-outline-secondary text-secondary bg-light mt-4 mb-3">Se connecter</button>
                </form>
                <div>
                    <h5 class="mt-3 mb-2">Pas encore inscrit ?</h5>
                    <button type="submit" class="btn btn-md btn-outline-secondary text-secondary bg-light mt-1 mb-3" >S'inscrire</button>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
</script>

<style lang="sass" scoped>
</style>
