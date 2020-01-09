<template>
  <div>
    <ul>
      <li v-for="(item ,index) in list">{{item.name}}---{{item.age}}---{{index}}</li>
    </ul>
  </div>
</template>

<script lang="ts">
  import {Vue,Component} from 'vue-property-decorator';

  interface Person {
    name: string;
    age: number;
  }

  @Component
  export default class List extends Vue {
    list: Array<Person> = [{
      name: '我有' + 1 + "个女朋友",
      age: 1 + 20
    }];

    constructor(props) {
      super(props);
      // for (let i = 0; i < 10; i++) {
      //   let obj = {
      //     name: '我有' + i + "个女朋友",
      //     age: i + 20
      //   };
      //   this.list.push(obj)
      // }
    }


    private created():void {
      console.log('created');
      console.log(this);
      alert('created')
    }
    private mounted(): void {
      console.log('mounted');
      for (let i = 0; i < 10; i++) {
        let obj = {
          name: '我有' + i + "个女朋友",
          age: i + 20
        };
        this.list.push(obj)
      }
    }

  }
</script>

<style scoped>

</style>
