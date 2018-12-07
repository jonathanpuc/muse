import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      token: ''
    }),
    mutations: {
      setToken(state, { token, tokenExpiry }) {
        state.token = token
        state.tokenExpiry = new Date().getTime() + tokenExpiry
      },
      clearToken(state) {
        state.token = ''
        state.tokenExpiry = ''
      }
    },
    actions: {
      saveToken({ commit }, { token, tokenExpiry }) {
        commit('setToken', { token, tokenExpiry })
      },
      clearCredentials({ commit }) {
        commit('clearToken')
      }
    },
    getters: {
      isAuthenticated(state) {
        return new Date().getTime() < state.tokenExpiry && state.token
      }
    }
  })
}

export default createStore
