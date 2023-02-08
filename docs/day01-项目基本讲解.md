# day01

## Git

**本地仓库与远程仓库交互之前，必须先进行本地仓库版本控制**

**一定先进行本地仓库版本控制，再进行其他操作**

### 1. 本地仓库操作

1. 本地仓库版本控制：将所有代码提交到版本区进行版本控制

- `git init` 初始化 git 仓库（一次）
- `git add .` 将工作区代码提交到暂存区保管
- `git commit -m xxx` 将暂存区代码提交到版本区进行版本控制

2. 分支操作

- `git checkout -b xxx` 新建并切换到 xxx 分支
- `git checkout xxx` 切换到 xxx 分支
- `git merge xxx` 在当前分支合并 xxx 分支的内容
- `git branch` 查看所有分支
- `git branch -d xxx` 删除 xxx 分支

### 2. 本地仓库与远程仓库的交互

1. 本地有仓库，远程没有仓库

- 新建远程仓库
- 先进行本地仓库版本控制
  - `git init`
  - `git add .`
  - `git commit -m xxx`
- 本地仓库与远程仓库关联起来
  - `git remote add origin xxx`
- 在将本地仓库代码推送到远程仓库保管
  - `git push -u origin master`
  - 只有 master 分支推送指令可以简写 `git push`
- 本地新建开发分支
  - `git checkout -b xxx`
- 在开发分支代码推送到远程仓库保管
  - `git push origin xxx`

2. 远程有仓库，本地没有仓库（去公司入职场景）

- `git clone xxx` 将远程仓库克隆到本地来 (公司需要提供克隆仓库地址，账号和密码)
- `cd xxx` 进入仓库内
- `git fetch origin xxx:xxx` 将远程仓库 xxx 分支拉取到本地仓库 xxx 分支上来（本地仓库没有 xxx 分支会自动创建）
- `git checkout xxx` 切换到 xxx 分支，将来进行开发

3. 常见问题

- 问题：拉取老师远程仓库代码报错

  - 原因：本地修改老师代码，老师也修改远程代码，出现冲突，就会报错
  - 解决：
    - `git reset --hard HEAD^` 回退到上一个版本
    - `git pull origin xxx` 重新拉取老师代码

- 问题：不清楚代码是否进行了本地仓库版本控制
  - 解决：
    - `git status`
    - 红色位于工作区
    - 绿色位于暂存区
    - 没有就是版本区

## 项目文件介绍

```
├─ docs 项目文档
├─ public 公共资源目录
|  ├─ favicon.ico 网站图标
|  └─ index.html
├─ src 项目源码
|  ├─ api 接口函数目录
|  ├─ assets 公共资源目录（图标、字体图标）
|  ├─ components 公共组件目录
|  ├─ router 路由配置目录
|  ├─ store vuex配置目录
|  ├─ styles 公共样式目录
|  ├─ utils 公共/工具js目录
|  ├─ views 路由组件目录
|  ├─ App.vue 主组件
|  └─ main.js 入口js文件
├─ .gitignore git忽略文件
├─ babel.config.js babel配置文件
├─ jsconfig.json vscode配置文件
├─ package-lock.json npm下载包缓存文件
├─ package.json 包描述文件
├─ README.md
└─ vue.config.js 项目脚手架配置文件
```

## 配置路由

### 1. 新建路由组件

- views/Home/index.vue
- views/Search/index.vue
- views/Login/index.vue
- views/Register/index.vue

### 2. 定义路由配置文件

```js
import Vue from "vue";
import VueRouter from "vue-router";

// 引入路由组件
import Home from "@/views/Home";
import Search from "@/views/Search";
import Login from "@/views/Login";
import Register from "@/views/Register";

// 安装插件
Vue.use(VueRouter);

export default new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/home",
      component: Home,
      name: "Home",
    },
    {
      path: "/search",
      component: Search,
      name: "Search",
    },
    {
      path: "/login",
      component: Login,
      name: "Login",
    },
    {
      path: "/register",
      component: Register,
      name: "Register",
    },
    {
      path: "*",
      redirect: "/home",
    },
  ],
});
```

### 3. 应用路由

```js
// ...
import router from "./router";

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
```

### 4. 使用路由

```html
<!-- app.vue -->
<router-view />
```

## 搭建 Home 静态组件

### 1. 拆分组件

1. 按照是否可复用拆分组件
2. 按照独立功能拆分组件

我们按照是否可复用拆分 Header 和 Footer 组件

### 2. 搭建 Header 和 Footer 组件

- components/Header/index.vue
- components/Footer/index.vue

### 3. 复用组件

1. 在 Home、Login 等组件使用

- 全局注册组件

```js
import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
  name: "SHome",
  components: {
    Header,
    Footer,
  },
};
```

- 组件使用

```vue
<div>
  <Header />
  home
  <Footer />
</div>
```

问题：每个组件都要写一遍 Header、Footer，太麻烦了

2. 直接在 App 中复用

```vue
<template>
  <div>
    <Header />
    <!-- 加载渲染路由组件 -->
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
};
</script>
```

问题：Login 和 Register 组件不要显示 Footer，其他组件都要

3. 切换显示

```vue
<!-- 因为不频繁，所以使用v-if -->
<Footer v-if="$route.path !== '/login' && $route.path !== '/register'" />
```

问题：表达式太长了

4. 使用计算属性优化

```vue
<Footer v-if="isShowFooter" />
```

```js
computed: {
  isShowFooter() {
    const path = this.$route.path;
    return path !== "/login" && path !== "/register";
  },
},
```

问题：将来维护麻烦

5. 使用 meta 参数

```js
[
  {
    path: "/home",
    component: Home,
    name: "Home",
    meta: {
      isShowFooter: true,
    },
  },
  {
    path: "/search",
    component: Search,
    name: "Search",
    meta: {
      isShowFooter: true,
    },
  },
  {
    path: "/login",
    component: Login,
    name: "Login",
    meta: {
      isShowFooter: false,
    },
  },
  {
    path: "/register",
    component: Register,
    name: "Register",
    meta: {
      isShowFooter: false,
    },
  },
];
```

```vue
<Footer v-if="$route.meta.isShowFooter" />
```

问题：大部分路由都要配置这个参数，太麻烦

6. 取反

```js
[
  {
    path: "/home",
    component: Home,
    name: "Home",
  },
  {
    path: "/search",
    component: Search,
    name: "Search",
  },
  {
    path: "/login",
    component: Login,
    name: "Login",
    meta: {
      isHideFooter: true,
    },
  },
  {
    path: "/register",
    component: Register,
    name: "Register",
    meta: {
      isHideFooter: true,
    },
  },
];
```

```vue
<Footer v-if="!$route.meta.isHideFooter" />
```

### 4. Header 静态组件

1. 结构尽量清晰、少一点（不要有多余结构）
2. 样式尽量不嵌套写

```vue
<template>
  <div>
    <div class="header__top">
      <div class="header__wrap">
        <span>
          尚品汇欢迎您！ 请
          <router-link to="/login">登录</router-link> |
          <router-link to="/register">免费注册</router-link>
        </span>

        <div>
          <span class="header__top-nav-item">我的订单</span>
          <span class="header__top-nav-item">我的购物车</span>
          <span class="header__top-nav-item">我的尚品汇</span>
          <span class="header__top-nav-item">尚品汇会员</span>
          <span class="header__top-nav-item">企业采购</span>
          <span class="header__top-nav-item">关注尚品汇</span>
          <span class="header__top-nav-item">合作招商</span>
          <span class="header__top-nav-item">商家后台</span>
        </div>
      </div>
    </div>
    <div class="header__bottom">
      <div class="header__wrap">
        <!-- 所有public目录下的资源，通过/直接访问 -->
        <img src="/images/logo.png" alt="logo" />

        <form class="header__bottom-form">
          <input type="text" class="header__bottom-input" />
          <button class="header__bottom-btn">搜索</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SHeader",
};
</script>

<style lang="less" scoped>
// 嵌套写样式缺点：1. 打包体积大 2. 难以维护
// .header{
//   .header__top {

//   }
// }

.header__top {
  padding: 8px 0;
  background-color: #eaeaea;
  display: flex;
  justify-content: center;
}

.header__wrap {
  min-width: 1200px;
  display: flex;
  justify-content: space-between;
}

.header__top-nav-item {
  border-right: 1px solid #000;
  padding-right: 10px;
  margin-right: 10px;
  &:last-child {
    border-right: none;
    padding-right: 0;
    margin-right: 0;
  }
}
// .header__top-nav-item:last-child{}

.header__bottom {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90px;
}

.header__bottom-form {
  display: flex;
  align-items: center;
}
.header__bottom-input {
  width: 450px;
  height: 25px;
  border: 2px solid red;
  outline: none;
  padding-left: 10px;
}

.header__bottom-btn {
  height: 29px;
  width: 80px;
  border: none;
  background-color: red;
  color: #fff;
}
</style>
```
