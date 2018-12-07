export default function getHashValue(key, hash) {
  var matches = hash.match(new RegExp(key + '=([^&]*)'))
  return matches ? matches[1] : null
}
