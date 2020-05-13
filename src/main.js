import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {Table, TableColumn,  DatePicker,  Dialog,}  from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(DatePicker);
Vue.use(Dialog);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
