import { createStore } from 'vuex'

const axios = require('axios').default

// crétaion d'une instance axios pour mettre l'url de base de l'api
const instanceUser = axios.create({
  baseURL: 'http://localhost:3000/api/users'
})

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
    loginUser: ({ commit }, userInfos) => {
      return new Promise((resolve, reject) => {
        instanceUser.get('/login')
          .then(function (response) {
            resolve(response)
          })
          .catch(function (error) {
            reject(error)
          })
      })
    //   instanceUser.get('/login', (userInfos))
    //     .then((response) => {
    //       console.log(response)
    //     })
    //     .catch((error) => { console.log(error) })
    },
    createAccount: ({ commit }, userInfos) => {
      return new Promise((resolve, reject) => {
        instanceUser.post('/signup', (userInfos))
          .then(function (response) {
            resolve(response)
          })
          .catch(function (error) {
            reject(error)
          })
      })
    }
  },
  modules: {
  }
})
