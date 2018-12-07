import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      token: ''
    }),
    mutations: {
      setToken(state, { token, tokenExpiry }) {
        state.token = token
        state.tokenExpiry = tokenExpiry
      },
      clearToken(state) {
        state.token = ''
        state.tokenExpiry = ''
      }
    },
    actions: {
      saveToken({ commit }, { token, tokenExpiry }) {
        commit('setToken', { token, tokenExpiry })
        localStorage.setItem('token', token)
        localStorage.setItem('tokenExpiry', tokenExpiry)
      },
      clearCredentials({ commit }) {
        commit('clearToken')
      },
      initAuth({ commit }) {
        const token = localStorage.getItem('token')
        const tokenExpiry = localStorage.getItem('tokenExpiry')

        if (new Date().getTime() > tokenExpiry || !token) {
          return
        }
        commit('setToken', { token, tokenExpiry })
      }
    },
    getters: {
      isAuthenticated(state) {
        return state.token
      }
    }
  })
}

export default createStore
