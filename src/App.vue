<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Header from './components/header.vue'
export default {
    name: 'App',
    methods: {
        setrem () {
            var docEl = window.document.documentElement;
            var width = docEl.getBoundingClientRect().width;
            var rem = width / 7.5;
            docEl.style.fontSize = rem + 'px';
        }
    },
    mounted () {
        this.setrem();
    }
}
</script>

<style>
@import '../static/css/style.css';
#app {
  font-family: 'PingFangSC-Regular', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow: hidden;
}
</style>
