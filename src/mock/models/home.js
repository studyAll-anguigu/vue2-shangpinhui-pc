/**
 * 因为这个在node中执行了，而node遵循commonjs的规范，因为使用commonjs的导出方式
 *
 * **/
module.exports = [
  {
    method: 'get',
    url: '/mock/getHomeBanner',
    response: {
      code: 200,
      message: '成功',
      succuss: true,
      data: [
        {
          id: '1',
          imgUrl: '/images/banner1.jpg',
        },
        {
          id: '2',
          imgUrl: '/images/banner2.jpg',
        },
        {
          id: '3',
          imgUrl: '/images/banner3.jpg',
        },
        {
          id: '4',
          imgUrl: '/images/banner4.jpg',
        },
      ],
    },
  },
];
