<template>
  <div>dashboard</div>
</template>

<script>
export default {
  middleware: ["checkAuth", "auth"],
  created: async function() {
    try {
      const response = await this.$axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + this.$store.getters.isAuthenticated
        }
      });
      console.log(response);
    } catch (e) {
      console.log(e.message);
    }
  }
};
</script>

