export default function({ store, redirect }) {
  if (!store.getters.isAuthenticated) {
    store.dispatch('clearCredentials')
    redirect('/login')
  }
}
