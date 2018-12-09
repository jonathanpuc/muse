<template>
  <div class="container">
    <div class="header">
      <PageHeader title="Create"/>
      <button @click="cancelCreation">Cancel</button>
    </div>
    <SearchBar @submit="searchArtist"/>
    <div v-if="loading" class="loading-container">
      <img src="~/assets/img/loader.gif" alt="loading">
    </div>
    <div v-else>
      <ArtistHeader v-if="artist.name" :name="artist.name" :image="artist.image"/>
      <audio
        v-if="artist.name"
        controls
        id="audio-player"
        :src="tracks.length ? tracks[0].preview_url : ''"
      />
      <TrackList
        :tracks="tracks"
        :stackTracks="stackTracks"
        @trackPreviewSelection="handleTrackPreviewSelection"
        @trackSelectionToggle="handleTrackToggle"
      />
    </div>
    <StackSongCount :count="stackTracks.length" @click="showModal = true"/>
    <Modal v-if="showModal" @close="showModal = false">
      <h3 slot="header">Stack so far...</h3>
      <div slot="body">
        <StackTrackListItem v-for="track in stackTracks" :key="track.id" :track="track"/>
      </div>
    </Modal>
  </div>
</template>

<script>
import SearchBar from "~/components/SearchBar";
import ArtistHeader from "~/components/ArtistHeader";
import TrackList from "~/components/TrackList";
import StackSongCount from "~/components/StackSongCount";
import Modal from "~/components/Modal";
import StackTrackListItem from "~/components/StackTrackListItem";
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
      artistQuery: "",
      loading: false,
      showModal: false
    };
  },
  components: {
    ArtistHeader,
    TrackList,
    SearchBar,
    StackSongCount,
    Modal,
    StackTrackListItem
  },
  middleware: ["checkAuth", "auth"],
  methods: {
    async searchArtist(query) {
      this.loading = true;
      try {
        const artistResponse = await this.$axios.get(
          `https://api.spotify.com/v1/search?q=${query}&type=artist`,
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
        this.loading = false;
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
    },
    cancelCreation() {
      this.$store.dispatch("deleteStack", { type: "editingStack" });
    },
    handleTrackToggle(trackId) {
      if (this.stackTracks.find(track => track.id === trackId)) {
        console.log("removing");
        this.$store.dispatch("removeTrack", { type: "editingStack", trackId });
      } else {
        this.$store.dispatch("addTrack", {
          type: "editingStack",
          track: this.tracks.find(track => track.id === trackId)
        });
      }
    }
  },
  computed: {
    stackTracks() {
      return this.$store.getters.getStackTracks("editingStack");
    }
  }
};
</script>


<style lang="scss" scoped>
.container {
  width: 90%;
  margin: 0 auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    border: none;
    font-size: 15px;
    cursor: pointer;
  }
}

.loading-container {
  text-align: center;
  padding: 100px 0px;
}

audio {
  display: block;
  width: 80%;
  margin: 0 auto;

  @media only screen and (min-width: 800px) {
    width: 600px;
  }
}
</style>
