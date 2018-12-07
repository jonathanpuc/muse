<template>
  <div class="container">
    <div
      :class="{hovered: showingPlay}"
      @mouseleave="hidePlayBtn"
      @click="$emit('trackSelect', track.preview)"
    >
      <img class="album-art" :src="track.image" :alt="track.name" @mouseover="showPlayBtn">
    </div>
    <div class="name-container">
      <p>{{ track.name }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["track"],
  data() {
    return {
      showingPlay: false
    };
  },
  methods: {
    selectTrack() {
      console.log(this);
      console.log("sup");
      this.$emit("trackSelect", this.track.preview);
    },
    showPlayBtn() {
      console.log("yes");
      this.showingPlay = true;
    },
    hidePlayBtn() {
      this.showingPlay = false;
    }
  }
};
</script>

<style scoped>
.container {
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

.hovered::after {
  position: absolute;
  top: 50%; /* position the top  edge of the element at the middle of the parent */
  left: 50%; /* position the left edge of the element at the middle of the parent */
  transform: translate(-50%, -50%);
  content: "";
  background: url("~assets/play-button.png");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
  height: 50%;
  width: 50%;
  display: flex;
  align-items: center;
}
</style>

