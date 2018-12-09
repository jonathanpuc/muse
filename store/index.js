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
        tracks: []
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
      },
      updateStackTrack(state, { type, stack }) {
        state[type] = stack
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
      },
      removeTrack({ commit, state }, { type, trackId }) {
        if (state[type].tracks.length > 0) {
          const newStack = {
            ...state[type],
            tracks: state[type].tracks.filter(track => track.id !== trackId)
          }
          console.log('removing')
          commit('updateStackTrack', { type, stack: newStack })
        }
      },
      addTrack({ commit, state }, { type, track }) {
        if (state[type].tracks.length < 6) {
          const newStack = {
            ...state[type],
            tracks: [...state[type].tracks, track]
          }
          console.log('Commiting, New stack', newStack)
          commit('updateStackTrack', { type, stack: newStack })
        }
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
