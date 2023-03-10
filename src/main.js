import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

Vue.config.productionTip = false;
Vue.use(VueRouter);

// 引入less文件
import './assets/less/index.less'

import router from './router'
import store from './store'
// 引入mock拦截
import './api/mock'
// 引入element-ui的提示框
import { MessageBox } from 'element-ui'
Vue.prototype.$confirm = MessageBox.confirm

// 部分引入 Element-UI
import {
  Button, Container, Header, Main, Aside, Menu, Submenu, MenuItem, MenuItemGroup,
  Dropdown, DropdownMenu, DropdownItem, Row, Col, Card, Table, TableColumn, Breadcrumb, BreadcrumbItem,
  Tag, Form, FormItem, Input, Select, Option, Switch, Message,
  DatePicker,
  Dialog,
  Pagination,

} from "element-ui"

Vue.prototype.$message = Message
Vue.use(Button);
Vue.use(Container);
Vue.use(Header);
Vue.use(Main);
Vue.use(Aside);
Vue.use(Menu)
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Row);
Vue.use(Col);
Vue.use(Card);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Tag);
Vue.use(Form);
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(Switch)
Vue.use(DatePicker)
Vue.use(Dialog)
Vue.use(Pagination)





// 路由导航守卫，未登录用户自动跳转登录页面
router.beforeEach((to, from, next) => {
  store.commit('getToken');
  const token = store.state.user.token;
  if (!token && to.name !== 'Login') {
    next({ name: 'Login' });
  } else if (token && to.name === 'login') {
    // Cookie已存在登录信息，直接跳转home界面
    next({ name: 'home' })
  } else {

    next()
  }
})






new Vue({
  router, store,
  render: h => h(App),
  created() {
    // Vue实例创建前，设置动态路由
    store.commit("tab/addMenu", router);

  }

}).$mount('#app')
