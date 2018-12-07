<template>
  <div>
    <img :src="image" :alt="name">
    <h3>{{ name }}</h3>
  </div>
</template>

<script>
export default {
  props: ["name", "image"]
};
</script>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-bottom: 10px;
}
</style>
