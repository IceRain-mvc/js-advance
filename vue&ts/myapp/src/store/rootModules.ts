import axios from "axios";

export default {
  state: {
    menuList: []
  },
  mutations: {
    pushMenuList(state: any, payload: any) {
      state.menuList = payload;
    }
  },
  actions: {
    async getMenuList({commit}: any, payload: any) {
      console.log('getMenuList');
      let res = await axios.get('/api/menulist');
      commit('pushMenuList', res.data.data);
    }
  },
  getters: {}
}
