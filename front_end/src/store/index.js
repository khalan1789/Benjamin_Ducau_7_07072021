import { createStore } from 'vuex'

const axios = require('axios').default

// crétaion d'une instance axios pour mettre l'url de base de l'api
const instance = axios.create({
  baseURL: 'http://localhost:3000/api'
})

let user = localStorage.getItem('user')
if (!user) {
  user = {
    userId: -1,
    token: '',
    isAdmin: 0
  }
} else {
  try {
    user = JSON.parse(user)
    instance.defaults.headers.common['Authorization'] = 'Bearer' + user.token
  } catch {
    user = {
      userId: -1,
      token: '',
      isAdmin: 0
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
    }
  },
  mutations: {
    setStatus: function (state, status) {
      state.status = status
    },
    logUser: function (state, user) {
      instance.defaults.headers.common['Authorization'] = user.token
      state.user = user
      console.log(user.token)
    },
    userInfos: function (state, userInfos) {
      state.userInfos = userInfos
    }
  },
  actions: {
    loginUser: ({ commit }, userInfos) => {
      commit('setStatus', 'loading')
      return new Promise((resolve, reject) => {
        instance.post('/users/login', (userInfos))
          .then((response) => {
            commit('setStatus')
            commit('logUser', 'response.data')
            resolve(response)
            localStorage.setItem('user', JSON.stringify(response.data))
          })
          .catch((error) => {
            commit('setStatus', 'error_to_login')
            reject(error)
          })
      })
    },
    createAccount: ({ commit }, userInfos) => {
      commit('setStatus', 'creating')
      return new Promise((resolve, reject) => {
        instance.post('/users/signup', (userInfos))
          .then((response) => {
            commit('setStatus')
            resolve(response)
          })
          .catch((error) => {
            commit('setStatus', 'error_to_sigin')
            reject(error)
          })
      })
    },
    getUserInfos: ({ commit }) => {
      instance.post('/users/infos')
        .then((response) => {
          commit('userInfos', response.data)
          console.log('getUser then' + response.data)
        })
        // .catch(error => console.log('error'))
    }
  },
  modules: {
  }
})
