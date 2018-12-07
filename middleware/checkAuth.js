export default function({ store }) {
  console.log('CHECK_AUTH')
  if (process.client) {
    store.dispatch('initAuth')
  }
}
