<template>
  <div>
    <ul>
      <li v-for="(item,index) in menulist">
        <ul>
          <li v-for="(key,ind) in item.foods">
            {{key.name}}
            <img class="img" :src="key.icon" alt="">
            <button @click="buy(index,ind)">来一份</button>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import {Component, Vue, Emit} from 'vue-property-decorator';
  /*
  * vue ts
  *
  * 装饰器  @State() aa
  * */
  import {State, Action} from 'vuex-class'
  @Component
  export default class MenuList extends Vue {
    private created(): void {
      this.getMenuList();
    }
    @State(state => {
      console.log(state);
      return state.menu.menuList
    })
    menulist!: Array<any>;

    @Action('menu/getMenuList')
    getMenuList!: Function;
    @Emit()
    buy(index: number, ind: number) {
      //this.$emit('buy', '12212');
      // console.log(this.menulist[index].foods[ind])
      return this.menulist[index].foods[ind]
    }
  };
</script>

<style scoped>

  .img {
    width: 80px;
    height: 80px;
    border-radius: 8px;

  }
</style>
