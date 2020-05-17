import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {Table, TableColumn,  DatePicker,  Dialog,  Dropdown,
  DropdownMenu,
  DropdownItem,
  Button,
  Pagination
}  from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'


Vue.use(Table);
Vue.use(TableColumn);
Vue.use(DatePicker);
Vue.use(Dialog);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Button);
Vue.use(Pagination);
Vue.config.productionTip = false
Vue.prototype.axios = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
