import Cookie from 'js-cookie'
// import Router from 'vue-router'
// import router from '../router';

export default {
    namespaced: true,
    state: {
        isCollapse: false,
        tabList: [{
            path: '/',
            name: 'home',
            label: '首页',
            icon: 'home'
        }],
        currentTag: null,
    },
    actions: {

    },
    mutations: {
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse;
        },
        selectMenu(state, val) {
            if (val.mame !== 'home') {
                state.currentTag = val;
                const result = state.tabList.findIndex(item => item.name === val.name);
                if (result === -1) {
                    state.tabList.push(val)
                } else {
                    state.currentTag = null;
                }
            }
        },
        closeTag(state, val) {
            const result = state.tabList.findIndex(item => item.name == val.name);
            state.tabList.splice(result, 1);
        },
        // 根据登录用户获取数据，渲染侧边栏的菜单
        setMenu(state, val) {
            state.menu = val;
            // 防止页面刷新之后菜单数据丢失，存储在Cookie中
            Cookie.set('menu', JSON.stringify(val))
        },
        // 清除菜单数据
        clearMenu(state) {
            state.menu = [];
            Cookie.remove('menu');
        },
        // 将菜单的路径添加到route里面，动态添加路由
        addMenu(state, router) {
            // 如果获取不到Cookie的菜单数据，直接退出
            if (!Cookie.get('menu')) {
                return
            }
            const menu = JSON.parse(Cookie.get('menu'));
            state.menu = menu;
            const menuArray = [];
            menu.forEach(item => {
                // 判断一下，如果是带有children的，是具有二级路由的，单独处理
                if (item.children) {
                    item.children = item.children.map(item => {
                        item.component = () => import(`../views/${item.url}`);
                        return item
                    })
                    menuArray.push(...item.children);
                } else {
                    item.component = () => import(`../views/${item.url}`);
                    menuArray.push(item);
                }
            });
            // 路由的动态添加

            // router.matcher = new Router().matcher
            menuArray.forEach(item => {
                router.addRoute('Main', item)
            })
        }
    }
}