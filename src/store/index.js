import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    title:'氮气能耗实时监测看板'
  },
  getters:{
    getTitle:state => state.title
  },
  mutations: {
    setTitle(state,title){
      state.title = title;
    }
  },
  actions: {
  },
  modules: {
  }
})
