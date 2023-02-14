// api 汇总
//  这里的其他ap文件是使用分别暴露的方式暴露。

// 导出方式1：
//  都一部: 先引入各个文件中暴露的所有内容
// import * as detail from './detail';
// import * as home from './home';
// import * as order from './order';
// import * as pay from './pay';
// import * as search from './search';
// import * as shopCart from './shopCart';
// import * as user from './user';

// 第二步: 在统一暴露
// export default {
//   detail,
//   home,
//   order,
//   pay,
//   search,
//   shopCart,
//   user,
// };
// 到时候如何一次性引入所有内容?  import api from '@/api/index.js';

// 导出方式2 :  引入对应模块所暴露的所有内容 , 并把这些内容分别暴露出去
// 到时候如何引入这些内容?  import * as api from '@/api/index.js';
export * as detail from './detail';
export * as home from './home';
export * as order from './order';
export * as pay from './pay';
export * as search from './search';
export * as shopCart from './shopCart';
export * as user from './user';
