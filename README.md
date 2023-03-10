# vue2-manage

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 依赖版本
1. 安装router 
   
   > npm i vue-router
   
2. 安装less和less解析器
   > npm i less
   > npm i less-loader@6.0.0
   
3. 安装axios

   ```
   npm install axios@0.25.0
   ```

4. 引入vuex

   ```
   npm i vuex
   ```

   

5. 安装mock

   ```
   npm i mockjs
   ```

   新建mock.js

   ```
   import Mock from 'mockjs'
   import homeApi from './mockServeData/home.js'
   
   Mock.mock('/home/getData', homeApi.getStatisticalData)
   ```

   在main.js引入

   ```
   import "./api/mock.js"
   ```

   

6. 安装echarts

   ```
   npm i echarts@5.1.2
   ```

   引入

   ```
   import * as echarts from "echarts";
   ```

7. cookie

   ```
   npm i js-cookie
   ```

   

3. 

### 记录问题
1. 问题：element-ui 使用v-for需要设置index，且必须为string类型，直接使用后端传来的数据可能报错。
   解决：使用toString()方法  `:index = "item.index.toString()"`
   
2. 编程式路由导航连续点击问题
   原因：该问题存在于Vue-router v3.0之后的版本，由于新加入的同一路径跳转错误异常功能导致。如果没有通过参数指定成功或者失败回调函数就返回一个promise来指定成功/失败的回调且内部会判断如果要跳转的路径和参数都没有变化, 会抛出一个失败的promise
   解决：
   1. push方法后添加.catch(err => err)；
   
   2. 重写Vue原型上的push和replace方法
   
      ```js
      //push
      const VueRouterPush = VueRouter.prototype.push
      VueRouter.prototype.push = function push (to) {
        return VueRouterPush.call(this, to).catch(err => err)
      }
      
      //replace
      const VueRouterReplace = VueRouter.prototype.replace
      VueRouter.prototype.replace = function replace (to) {
        return VueRouterReplace.call(this, to).catch(err => err)
      }
      ```
   
3. vuex的模块化和命名空间问题
   问题：视频中使用了模块化配置vue，但是没有开启命名空间，视频使用的调用mutations里的方法如下（没有体现模块化）：

   ```js
   this.$store.commit("collapseMenu");
   
   ```

   **默认情况下，模块内部的 action、mutation 和 getter 是注册在全局命名空间的——这样使得多个模块能够对同一 mutation 或 action 作出响应。所以`this.$store.commit("collapseMenu");`是注册在全局命名空间的**

   解决：在模块中打开命名空间

   ```js
   const tab {
       namespace:true,
       mutations:{},
   }
   ```

   调用方法

   ```js
   // 路径上加上了模块
   this.$store.commit("tab/collapseMenu");
   ```

   

4. axios的二次封装

5. mock拦截ajax请求，返回模拟数据

6. echarts的使用

   ```js
   import * as charts from 'echarts'
   3. 饼状图
           const videoOption = {
             tooltip: {
               trigger: "item",
             },
             color: [
               "#0f78f4",
               "#dd536b",
               "#9462e5",
               "#a6a6a6",
               "#e1bb22",
               "#39c362",
               "#3ed1cf",
             ],
             series: [
               {
                 data: data.videoData,
                 type: "pie",
               },
             ],
           };
   
           const VE = echarts.init(this.$refs.videoEcharts);
           VE.setOption(videoOption);
   ```

   

7. $route 和 $router 的区别

8. 封装一个表单`Form`组件

9. params和query
   [Vue 中query和params的区别 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/349408545)
   [query 和 params 传参的区别 - 云+社区 - 腾讯云 (tencent.com)](https://cloud.tencent.com/developer/article/1848975)

10. 对象解构赋值

11. ```html
    <template slot-scope="scope"> </template>
    ```

12. vue的.sync修饰符

13. TypeError: this.$confirm is not a function

    **原因：**使用了消息提示框，没有引入MessageBox

    **解决：**在 main.js 中 

    ```js
    import {MessageBox} from 'element-ui'
    Vue.prototype.$confirm=MessageBox.confirm;
    ```

14. _this.$message is not a function错误解决
    main.js 引入

    ```
    import { Message } from "element-ui";
    Vue.prototype.$message = Message
    // 注意不是Vue.use()
    ```

15. 删除失败
    原因：视频使用post，接口实际上写的是get请求

    解决：改成get请求，注意get请求参数是params，根据mock的接口，创传参不能只传id需要在deleteUser中把row传过去
    ![image-20220525132456844](C:\Users\mayonnaise\AppData\Roaming\Typora\typora-user-images\image-20220525132456844.png)

16. 一个小bug  40p用户信息编辑表单，点击取消也会修改源数据，
    把 this.operateForm =row;改成
    this.operateForm = JSON.parse(JSON.stringify(row)); 就行，
    这是vue 的双向数据绑定的弊端，实时更新数据，因为是一个数据源，因为在修改对象的时候，对象的指针直接指向页面数据 了

17. 登录权限管理-- Cookie

18. 路由导航守卫

19. { data: res }

20. vue-router 版本委托

    ```
    router.addRoute('Main', item) // 报错
    
    vue install vue-router // 安装最新版
    ```

    

21. 