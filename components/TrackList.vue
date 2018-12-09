<template>
  <div class="list-container">
    <TrackListItem
      v-for="track in tracks"
      :key="track.id"
      :track="{
        id: track.id,
        name: track.name,
        image: track.album.images[0].url,
        preview: track.preview_url
        }"
      @trackPreviewSelect="handleTrackSelect"
      :isSelected="stackTracks.map(stackTrack => stackTrack.id).includes(track.id)"
      @toggleTrack="handleTrackToggle"
    />
  </div>
</template>


<script>
import TrackListItem from "~/components/TrackListItem";
export default {
  props: ["tracks", "stackTracks"],
  components: {
    TrackListItem
  },
  methods: {
    handleTrackSelect(trackUrl) {
      this.$emit("trackPreviewSelection", trackUrl);
    },
    handleTrackToggle(trackId) {
      console.log(trackId);
      this.$emit("trackSelectionToggle", trackId);
    }
  }
};
</script>

<style scoped>
.list-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
</style>

