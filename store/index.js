import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      token: '',
      tokenExpiry: null,
      currentStack: {
        tracks: [{ name: 'waddah' }, { name: 'yeah mayne' }]
      },
      editingStack: {
        tracks: [{ name: 'waddah' }, { name: 'yeah mayne' }]
      }
    }),
    mutations: {
      setToken(state, { token, tokenExpiry }) {
        state.token = token
        state.tokenExpiry = tokenExpiry
      },
      clearToken(state) {
        state.token = ''
        state.tokenExpiry = ''
      },
      clearStack(state, type) {
        state[type] = {
          tracks: []
        }
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
      },
      deleteStack({ commit }, { type }) {
        commit('clearStack', type)
      }
    },
    getters: {
      isAuthenticated(state) {
        return state.token
      },
      getStackTracks(state) {
        return type => state[type].tracks
      }
    }
  })
}

export default createStore
