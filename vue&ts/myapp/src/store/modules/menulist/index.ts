// import api from '@/api/api';
// import {get} from '@/utils/request';
import axios from 'axios';

interface ResponseMenuList {
  [data: string]: any
}

export default {
  namespaced: true,
  state: {
    menu: []
  },
  mutations: {
    requestMenu(state: any, action: any) {
      state.menu = action;
    }
  },
  actions: {
    async requestMenu({commit}: any, action: any) {
      let res: ResponseMenuList = await axios('/api/menulist', action);
      commit('requestMenu', res.data);
    }
  },
  getters: {},
  modules: {}
};
