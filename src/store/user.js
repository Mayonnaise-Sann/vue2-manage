import Cookie from 'js-cookie'
export default {
    state: {
        token: ''
    },
    mutations: {
        // 设置token
        setToken(state, val) {
            state.token = val;
            Cookie.set('token', val)
        },
        // 删除token
        clearToken(state) {
            state.token = '';
            Cookie.remove('token')
        },
        // 获取token
        getToken(state) {
            state.token = state.token || Cookie.get('token')
        }
    }
}