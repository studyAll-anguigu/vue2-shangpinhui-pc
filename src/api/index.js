// api 汇总
//  这里的其他ap文件是使用分别暴露的方式暴露。

//  引入各个文件中暴露的所有内容
import * as detail from './detail';
import * as home from './home';
import * as order from './order';
import * as pay from './pay';
import * as search from './search';
import * as shopCart from './shopCart';
import * as user from './user';

// 统一导出
export default {
  detail,
  home,
  order,
  pay,
  search,
  shopCart,
  user,
};
