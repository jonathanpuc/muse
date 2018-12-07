<template>
  <div>
    <button>
      <a
        :href="`https://accounts.spotify.com/authorize?client_id=${spotifyClient}&redirect_uri=${spotifyRedirect}&callback&scope=user-read-private%20user-read-email&response_type=token`"
      >Login</a>
    </button>
  </div>
</template>

<script>
import { spotifyClient, spotifyRedirect } from "~/helpers/config";
export default {
  data() {
    return {
      spotifyClient,
      spotifyRedirect
    };
  }
};
</script>

