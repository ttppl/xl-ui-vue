<template>
  <div id="app">
    <router-view name="main" />
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  },

  data: () => {
    return {

    }
  },

  methods: {
  }
}
</script>

<style lang="css" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height:100%;
}
::v-deep .emphasize{
  color: red;
  display: block;
}
</style>
