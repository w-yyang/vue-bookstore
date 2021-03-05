<template>
  <div id="app">
    <w-header />
    <router-view/>
  </div>
</template>

<script>
  import Header from './components/common/header.vue'
  import Footer from './components/common/footer.vue'

  export default {
    data(){
      return {

      }
    },
    methods: {

    },
    components: {
      'w-header': Header,
      'w-footer': Footer
    }
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}


#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
