import Mock from 'mockjs'
import homeApi from './mockServeData/home.js'
import userApi from './mockServeData/user.js'
import permissionApi from './mockServeData/permission.js'


// mock拦截
// 语法：
// 路径是自己设置的，当axios发送的path和mock拦截配置的path一致时，就会拦截
// 两种匹配方式： 1-路径path字符串匹配 2-正则
// 这个项目中，网络请求视频用了vue.resource 和 自己封装的axios.request方法，我只采用后者


Mock.mock('/home/getData', homeApi.getStatisticalData)
// Mock.mock(/user\/add/,'post', userApi.createUser)
// Mock.mock(/user\/edit/, 'post',userApi.createUser)
Mock.mock(/user\/sendAddData/, userApi.createUser)
Mock.mock(/user\/edit/, userApi.updateUser)
Mock.mock(/user\/getUser/, 'get', userApi.getUserList)
Mock.mock(/user\/del/, 'get', userApi.deleteUser)
Mock.mock(/permission\/getMenu/, 'post', permissionApi.getMenu)





