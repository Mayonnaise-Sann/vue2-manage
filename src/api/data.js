import axios from './axios'

// 注意get请求和post请求的参数是不一样的
// get-params  post-data



export const getMenu = (param) => {
    return axios.request({
        url: '/permission/getMenu',
        method: 'post',
        data: param
    })
}

export const getData = () => {
    return axios.request({
        url: '/home/getData'
    })
}
export const sendAddData = (data) => {
    return axios.request({
        url: '/user/sendAddData',
        method: 'post',
        data: data
    })
}
export const sendEditData = (data) => {
    return axios.request({
        url: '/user/edit',
        method: 'post',
        data: data
    })
}
export const getUser = (params) => {
    return axios.request({
        url: '/user/getUser',
        method: 'get',
        params: params
    })
}
export const sendDeleteID = (params) => {
    return axios.request({
        url: '/user/del',
        method: 'get',
        params: params
    })
}

