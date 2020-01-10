import axios from 'axios';
import {get} from "@/utils/request";
import api from '@/api';
export default {
  namespaced: true,//命名空间
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
      let res = await get(api.home.menu);//硬编码
      commit('pushMenuList', res.data);
    }
  },
  getters: {},
  modules: {}
}
