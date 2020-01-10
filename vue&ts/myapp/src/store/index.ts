import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules';
import rootModules from './rootModules';

Vue.use(Vuex);

/*
* rootModules
* modules  vuex modules
* */
const vuex = new Vuex.Store({
  modules,
  ...rootModules
});
//@ts-ignore
window.store = vuex;
export default vuex;
