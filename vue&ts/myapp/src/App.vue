<template>
  <div id="app">
    <MenuList @buy="buy"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// import HelloWorld from './components/HelloWorld.vue';
// import Page from './views/Page';
import MenuList from './views/MenuList';

@Component({
  components: {
    MenuList
  },
})
export default class App extends Vue {
  buy(value) {
    console.log(value);
  }

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
