import { createStore } from 'vuex'

const axios = require('axios').default

// création d'une instance axios pour mettre l'url de base de l'api
const instance = axios.create({
  baseURL: 'http://localhost:3000/api'
})

let user = localStorage.getItem('user')
if (!user) {
  user = {
    userId: -1,
    token: '',
    isAdmin: false
  }
} else {
  try {
    user = JSON.parse(user)
    instance.defaults.headers.common.Authorization = 'Bearer ' + user.token
  } catch (ex) {
    user = {
      userId: -1,
      token: '',
      isAdmin: false
    }
  }
}

// creation d'une nouvelle instance de store
export default createStore({
  state: {
    status: '',
    user: user,
    userInfos: {
      firstname: '',
      lastname: '',
      email: '',
      profileImageUrl: '',
      isAdmin: ''
    },
    usersInfos: {
      id: '',
      firstname: '',
      lastname: '',
      email: '',
      isAdmin: ''
    },
    article: {
      id: '',
      contain: '',
      title: '',
      imageUrl: ''
    },
    articleInfos: {
      id: '',
      contain: '',
      title: '',
      imageUrl: '',
      UserId: '',
      firstname: '',
      lastname: ''
    },
    comments: {
      id: '',
      articleId: '',
      contain: '',
      userId: ''
    },
    likes: {
      id: '',
      ArticleId: '',
      UserId: ''
    }
  },
  mutations: {
    setStatus: function (state, status) {
      state.status = status
    },
    logUser: function (state, user) {
      instance.defaults.headers.common.Authorization = 'Bearer ' + user.token
      localStorage.setItem('user', JSON.stringify(user))
      state.user = user
    },
    userInfos: function (state, userInfos) {
      state.userInfos = userInfos
    },
    logout: function (state) {
      state.user = {
        userId: -1,
        token: '',
        isAdmin: false
      }
      localStorage.removeItem('user')
    },
    articleStatus: function (state, article) {
      state.article = article
    },
    articleInfosStatus: function (state, articleInfos) {
      state.articleInfos = articleInfos
    },
    commentsInfos: function (state, comments) {
      state.comments = comments
    },
    likesInfos: function (state, likes) {
      state.likes = likes
    },
    usersInfosStatus: function (state, usersInfos) {
      state.usersInfos = usersInfos
    }
  },
  actions: {
    login: ({ commit }, userInfos) => {
      commit('setStatus', 'loading')
      return new Promise((resolve, reject) => {
        instance.post('/auth/login', (userInfos))
          .then((response) => {
            commit('setStatus', '')
            commit('logUser', response.data)
            resolve(response)
          })
          .catch((error) => {
            commit('setStatus', 'error_to_login')
            console.log(error)
            reject(error)
          })
      })
    },
    createAccount: ({ commit }, userInfos) => {
      commit('setStatus', 'creating')
      return new Promise((resolve, reject) => {
        instance.post('/auth/signup', (userInfos))
          .then((response) => {
            commit('setStatus', 'created')
            resolve(response)
          })
          .catch((error) => {
            commit('setStatus', 'error_to_sigin')
            reject(error)
          })
      })
    },
    // Récupération des infos de l'utilisateur connecté
    getUserInfos: ({ commit, state }) => {
      instance.get('/auth/profile/' + state.user.userId)
        .then((response) => {
          commit('userInfos', response.data.user)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    // Suppression du compte de l'utilisateur connecté
    deleteAccount: ({ commit, state }) => {
      return new Promise((resolve, reject) => {
        instance.delete('/auth/profile/' + state.user.userId)
          .then((response) => {
            commit('setStatus', 'deleted')
            resolve(response)
          })
          .catch((error) => {
            commit('setStatus', 'error_to_sigin')
            reject(error)
          })
      })
    },
    // Changement de l'image de profil de l'utilisateur connecté
    uploadProfileImage: ({ commit, state }, formData) => {
      console.log(formData)
      return new Promise((resolve, reject) => {
        instance.put('http://localhost:3000/api/auth/profile/' + state.user.userId, formData)
          .then((response) => {
            // commit('userInfos')
            commit('setStatus', 'uploaded')
            console.log('resp du serv' + response)
            resolve(response)
          })
          .catch((error) => {
            console.log(error)
            commit('setStatus', 'error_upload')
            reject(error)
          })
      })
    },
    // Récupération de tous les articles
    getAllArticles: ({ commit }) => {
      instance.get('/article')
        .then(response => {
          commit('articleStatus', response.data.articles)
          console.log('res status')
          console.log(response.status)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    // Publication d'un article
    publishArticle: ({ commit }, formData) => {
      return new Promise((resolve, reject) => {
        instance.post('/article', formData)
          .then((response) => {
            commit('setStatus', 'published')
            resolve(response)
          })
          .catch((error) => {
            commit('setStatus', 'error_publishing')
            reject(error)
          })
      })
    },
    // Accès à l'article sélectionné
    getSelectedArticle: ({ commit }, urlId) => {
      return new Promise((resolve, reject) => {
        instance.get('/article/' + urlId)
          .then(response => {
            console.log('index data reponse')
            console.log(response.data)
            console.log('index response data article')
            console.log(response.data.article)
            console.log('index response les likes')
            console.log(response.data.article.Likes)
            console.log('index response les comment')
            console.log(response.data.article.Comments)
            // commit('articleInfos', response.data.article)
            commit('commentsInfos', response.data.article.Comments)
            commit('likesInfos', response.data.article.Likes)
            console.log('likesInfos', response.data.article.Likes)
            commit('articleInfosStatus', response.data.article)
            resolve(response)
            // console.log('articleInfos', this.articleInfos)
          })
          .catch((error) => {
            console.log(error)
            reject(error)
          })
      })
    },
    // Suppression de l'article
    onDeleteArticle: ({ commit }, articleId) => {
      return new Promise((resolve, reject) => {
        instance.delete('/article/' + articleId)
          .then((response) => {
            // commit('setStatus', 'published')
            resolve(response)
            console.log(response.data)
            console.log('article supprimé')
          })
          .catch((error) => {
            // commit('setStatus', 'error_publishing')
            reject(error)
          })
      })
    },
    // Envoi d'un commentaire
    submitComment: ({ commit }, commentInfos) => {
      return new Promise((resolve, reject) => {
        instance.post('/comment', commentInfos)
          .then((response) => {
            // commit('setStatus', 'published')
            resolve(response)
            console.log(response.data)
          })
          .catch((error) => {
            // commit('setStatus', 'error_publishing')
            reject(error)
          })
      })
    },
    // Suppression d'un commentaire
    deleteComment: ({ commit }, commentId) => {
      return new Promise((resolve, reject) => {
        instance.delete('/comment/' + commentId)
          .then((response) => {
            resolve(response)
            console.log(response.data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    // Clic au like
    onLikeArticle: ({ commit }, likeInfos) => {
      return new Promise((resolve, reject) => {
        instance.post('/like/', likeInfos)
          .then((response) => {
            resolve(response)
            console.log(response.data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    // Récupération des utilisateurs pour l'admin
    getAllUsers: ({ commit }) => {
      instance.get('auth/admin/users')
        .then((response) => {
          commit('usersInfosStatus', response.data.users)
          console.log(response.data.users)
        })
        .catch((error) => {
          console.log(error)
        })
    }
    // controlIfLiked: ({ commit }, infos) => {
    //     instance.get('/like', infos)
    //       .then((response) => {
    //         console.log(response.data)
    //       })
    //       .catch((error) => {
    //         console.log(error)
    //       })
    // }
  },
  modules: {
  }
})
