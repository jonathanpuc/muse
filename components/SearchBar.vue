<template>
  <form @submit.prevent="$emit('submit', query)">
    <input type="text" v-model="query" placeholder="Search Drake">
    <button type="submit" :disabled="!query">
      <img src="~/assets/img/magnifying-glass.png" alt="search">
    </button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      query: ""
    };
  }
};
</script>

<style scoped>
form {
  height: 40px;
  width: 200px;
  position: relative;
}
input {
  height: 100%;
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid grey;
  font-size: 20px;
}

img {
  height: 12px;
  width: 12px;
}

button {
  position: absolute;
  background-color: #fff;
  border: none;
  top: 50%;
  transform: translateY(-50%);
  right: 4px;
}
</style>


