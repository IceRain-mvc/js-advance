<template>
  <div>
    <h1>{{msg}}</h1>
    <h1>{{aaa}}</h1>
    <List/>
  </div>
</template>

<script lang="ts">
  import {Component,Vue} from 'vue-property-decorator'
  // import   from 'vue-class-component'

  import List from '../components/List';

  //1: 组件 变成类组件


  @Component({
    computed: {
      aaa() {
        return 111;
      }
    },
    components:{
      List
    }
  })
  export default class Page extends Vue{
    msg: string = '你好';

  }

</script>

<style scoped>

</style>
