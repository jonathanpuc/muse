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
import getParam from "~/helpers/params";
export default {
  data() {
    return {
      spotifyClient,
      spotifyRedirect
    };
  },
  middleware: "checkAuth",
  created: function() {
    if (this.$store.getters.isAuthenticated) {
      this.$router.push("/dashboard");
    } else {
      const token = getParam("access_token", this.$route.hash);
      if (token) {
        const tokenExpiry = getParam("expires_in", this.$route.hash);
        this.$store.dispatch("saveToken", {
          token,
          tokenExpiry: new Date().getTime() + tokenExpiry * 1000
        });
        this.$router.push("/dashboard");
      }
    }
  }
};
</script>

