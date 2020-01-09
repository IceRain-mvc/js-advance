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
  import {State, Action} from 'vuex-class'


  @Component
  export default class MenuList extends Vue {

    private created(): void {
      this.getMenuList();
    }

    @State(state => {
      console.log(state);
      return state.menuList

    })
    menulist!: Array<any>;

    @Action('getMenuList') getMenuList!: Function;


    @Emit()
    buy(index: number, ind: number) {
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
