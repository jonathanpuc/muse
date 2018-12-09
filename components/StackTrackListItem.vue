<template>
  <div class="stack-track-list-item">
    <img :src="track.album.images[0].url" :alt="track.name">
    <div class="stack-track-list-item__info">
      <p>{{ track.artists[0].name }}</p>
      <p>{{ track.name }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["track"]
};
</script>

<style scoped lang="scss">
.stack-track-list-item {
  padding: 5px 0px;
  display: flex;
  align-items: center;
  margin: 10px 0px;
  img {
    height: 50px;
    width: 50px;
    margin-right: 10px;
  }
}

.stack-track-list-item__info {
  p:first-child {
    font-size: 13.5px;
  }
  p:last-child {
    font-size: 15px;
    margin-top: 6px;
  }
}
</style>



