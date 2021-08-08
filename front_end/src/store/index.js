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
    article: {
      articleId: '',
      contain: '',
      title: '',
      imageUrl: ''
    },
    articleInfos: {
      articleId: '',
      contain: '',
      title: '',
      imageUrl: '',
      articleUserId: ''
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
    articleInfos: function (state, articleInfos) {
      state.articleInfos = articleInfos
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
    getUserInfos: ({ commit, state }) => {
      instance.get('/auth/profile/' + state.user.userId)
        .then((response) => {
          commit('userInfos', response.data.user)
        })
        .catch((error) => {
          console.log(error)
        })
    },
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
    getAllArticles: ({ commit }) => {
      instance.get('/article')
        .then(response => {
          commit('articleStatus', response.data.articles)
          console.log(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    publishArticle: ({ commit, state }, formData) => {
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
    getSelectedArticle: ({ commit }, urlId) => {
      instance.get('/article/' + urlId)
        .then(response => {
          commit('articleInfos', response.data.article)
          console.log(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  modules: {
  }
})
