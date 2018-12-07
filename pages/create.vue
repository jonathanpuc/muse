<template>
  <div>
    <nuxt-link to="/">create wassah</nuxt-link>>
    <ArtistHeader v-if="artist.name" :name="artist.name" :image="artist.image"/>
    <audio controls id="audio-player" :src="tracks.length ? tracks[0].preview_url : ''"/>
    <TrackList :tracks="tracks" @trackPreviewSelection="handleTrackPreviewSelection"/>
    <form @submit.prevent="searchArtist">
      <input type="text" v-model="artistQuery">
      <button type="submit">search</button>
    </form>
  </div>
</template>

<script>
import ArtistHeader from "~/components/ArtistHeader";
import TrackList from "~/components/TrackList";
export default {
  data() {
    return {
      tracks: [],
      previewTrack: "",
      artist: {
        id: "",
        name: "",
        image: ""
      },
      artistQuery: ""
    };
  },
  components: {
    ArtistHeader,
    TrackList
  },
  middleware: ["checkAuth", "auth"],
  methods: {
    async searchArtist() {
      console.log(this);
      try {
        const artistResponse = await this.$axios.get(
          `https://api.spotify.com/v1/search?q=${this.artistQuery}&type=artist`,
          {
            headers: {
              Authorization: "Bearer " + this.$store.getters.isAuthenticated
            }
          }
        );
        const topArtist = artistResponse.data.artists.items[0];

        const artist = {
          id: topArtist.id,
          name: topArtist.name,
          image: topArtist.images[0].url
        };

        this.artist = artist;

        const topTracksResponse = await this.$axios.get(
          `https://api.spotify.com/v1/artists/${
            topArtist.id
          }/top-tracks?market=au`,
          {
            headers: {
              Authorization: "Bearer " + this.$store.getters.isAuthenticated
            }
          }
        );

        const { tracks } = topTracksResponse.data;
        this.tracks = tracks;
      } catch (e) {
        console.log(e.message);
      }
    },
    async handleTrackPreviewSelection(track) {
      this.previewTrack = track;
      const audioPlayer = document.getElementById("audio-player");
      audioPlayer.src = track;
      console.log(audioPlayer);

      try {
        await audioPlayer.play();
        console.log("done");
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>
