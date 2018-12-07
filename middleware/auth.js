export default function({ store, redirect, route }) {
  console.log('JUST AUTH')
  if (!store.getters.isAuthenticated) {
    redirect('/login')
  }
}
