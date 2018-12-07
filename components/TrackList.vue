<template>
  <div class="list-container">
    <TrackListItem
      v-for="track in tracks"
      :key="track.id"
      :track="{name: track.name,
        image: track.album.images[0].url,
        preview: track.preview_url
        }"
      @trackSelect="handleTrackSelect"
    />
  </div>
</template>


<script>
import TrackListItem from "~/components/TrackListItem";
export default {
  props: ["tracks"],
  components: {
    TrackListItem
  },
  methods: {
    handleTrackSelect(track) {
      this.$emit("trackPreviewSelection", track);
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

