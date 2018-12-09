<template>
  <div>
    <h2>Hello {{ name }}</h2>

    <nuxt-link to="create">Create</nuxt-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: ""
    };
  },
  middleware: ["checkAuth", "auth"],
  created: async function() {
    try {
      const response = await this.$axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + this.$store.getters.isAuthenticated
        }
      });

      this.name = response.data.display_name;
    } catch (e) {
      console.log(e.message);
    }
  }
};
</script>

