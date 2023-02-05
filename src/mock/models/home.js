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
  {
    method: 'get',
    url: '/mock/getHomeFloors',
    response: {
      code: 200,
      message: '成功',
      success: true,
      // 模拟数据的数据结构: 问后端
      data: [
        {
          id: '001',
          name: '家用电器',
          keywords: [
            '节能补贴',
            '4K电视',
            '空气净化器',
            'IH电饭煲',
            '滚筒洗衣机',
            '电热水器',
          ],
          imgUrl: '/images/floor-1-1.png',
          navList: [
            {
              url: 'http://www.atguigu.com',
              text: '热门',
            },
            {
              url: 'http://www.atguigu.com',
              text: '大家电',
            },
            {
              url: 'http://www.atguigu.com',
              text: '生活电器',
            },
            {
              url: 'http://www.atguigu.com',
              text: '厨房电器',
            },
            {
              url: 'http://www.atguigu.com',
              text: '应季电器',
            },
            {
              url: 'http://www.atguigu.com',
              text: '空气/净水',
            },
            {
              url: 'http://www.atguigu.com',
              text: '高端电器',
            },
          ],
          carouselList: [
            {
              id: '0011',
              imgUrl: '/images/floor-1-b01.png',
            },
            {
              id: '0012',
              imgUrl: '/images/floor-1-b02.png',
            },
            {
              id: '0013',
              imgUrl: '/images/floor-1-b03.png',
            },
          ],
          recommendList: [
            '/images/floor-1-2.png',
            '/images/floor-1-3.png',
            '/images/floor-1-5.png',
            '/images/floor-1-6.png',
          ],
          bigImg: '/images/floor-1-4.png',
        },
        {
          id: '002',
          name: '手机通讯',
          keywords: [
            '高通骁龙',
            '16核处理器',
            '超高性价比',
            '鸿蒙系统',
            '以旧换新',
            '免费升级',
          ],
          imgUrl: '/images/1_floor-1-1.png',
          navList: [
            {
              url: 'http://www.atguigu.com',
              text: '安卓机皇',
            },
            {
              url: 'http://www.atguigu.com',
              text: '热销爆品',
            },
            {
              url: 'http://www.atguigu.com',
              text: '性价比之王',
            },
            {
              url: 'http://www.atguigu.com',
              text: '华为钜惠',
            },
            {
              url: 'http://www.atguigu.com',
              text: '小米黑科技',
            },
            {
              url: 'http://www.atguigu.com',
              text: '老人机',
            },
            {
              url: 'http://www.atguigu.com',
              text: '极致奢华',
            },
          ],
          carouselList: [
            {
              id: '0011',
              imgUrl: '/images/1_floor-1-b01.png',
            },
            {
              id: '0012',
              imgUrl: '/images/1_floor-1-b02.png',
            },
            {
              id: '0013',
              imgUrl: '/images/1_floor-1-b03.png',
            },
          ],
          recommendList: [
            '/images/1_floor-1-2.png',
            '/images/1_floor-1-3.png',
            '/images/1_floor-1-5.png',
            '/images/1_floor-1-6.png',
          ],
          bigImg: '/images/1_floor-1-4.png',
        },
      ],
    },
  },
];
