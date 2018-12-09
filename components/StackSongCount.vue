<template>
  <div class="stack-song-count-container" @click="$emit('click')">
    <img src="~/assets/img/stack.png" :alt="'current stack track count is' + count">
    <div class="count">{{count}}</div>
  </div>
</template>

<script>
export default {
  props: ["count"]
};
</script>

<style scoped>
.stack-song-count-container {
  position: fixed;
  right: 30px;
  bottom: 30px;
  cursor: pointer;
}

.count {
  background-color: #000;
  font-size: 15px;
  color: #fff;
  font-weight: bold;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  position: absolute;
  top: -3px;
  right: -7px;
  text-align: center;
}

img {
  height: 45px;
  width: 45px;
}
</style>
