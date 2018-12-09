<template>
  <div class="track-list-item-container">
    <div :class="{hovered: showingControls}" @mouseleave="hideControls">
      <div class="heart-container" v-if="showingControls">
        <img
          v-if="isSelected"
          @click="$emit('toggleTrack', track.id)"
          src="~/assets/img/heart-gold.png"
          alt="remove from stack"
        >
        <img
          v-else
          @click="$emit('toggleTrack', track.id)"
          src="~/assets/img/heart-grey.png"
          alt="add to stack"
        >
      </div>
      <img
        class="album-art"
        :src="track.image"
        :alt="track.name"
        @mouseover="showControls"
        @focus="showControls"
      >
      <div class="play-control" v-if="showingControls">
        <img src="~/assets/img/play-button.png" alt="play preview" @click="selectTrackPreview">
      </div>
    </div>
    <div class="name-container">
      <p>{{ track.name }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["track", "isSelected"],
  data() {
    return {
      showingControls: false
    };
  },
  methods: {
    selectTrackPreview() {
      this.$emit("trackPreviewSelect", this.track.preview);
    },
    showControls() {
      this.showingControls = true;
    },
    hideControls() {
      this.showingControls = false;
    }
  }
};
</script>

<style scoped lang="scss">
.track-list-item-container {
  width: 150px;
  margin: 20px 10px;
}
.album-art {
  width: 100%;
  vertical-align: middle;
}

.name-container {
  padding: 10px;
  font-weight: 400;
  background-color: #000;
  color: #f9f9f9;
  min-height: 56px;
  max-height: 56px;
  overflow: hidden;
  display: flex;
  align-items: center;
}

.hovered {
  cursor: pointer;
  position: relative;
  background: rgba(0, 0, 0, 0.7);
}

.play-control {
  position: absolute;
  top: 50%; /* position the top  edge of the element at the middle of the parent */
  left: 50%; /* position the left edge of the element at the middle of the parent */
  transform: translate(-50%, -50%);
  cursor: pointer;
  display: flex;
  align-items: center;
  img {
    width: 60px;
  }
}

.heart-container {
  position: absolute;
  top: 5px;
  right: 5px;
  img {
    width: 25px;
  }
}
</style>

