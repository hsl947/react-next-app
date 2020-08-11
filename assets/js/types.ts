export const TAB_LIST = [
  {
    id: '1',
    icon: '/img/tabbar/tab-icon1.png',
    iconActive: '/img/tabbar/tab-icon1-active.png',
    text: '比赛',
    url: '/live'
  },
  {
    id: '2',
    icon: '/img/tabbar/tab-icon2.png',
    iconActive: '/img/tabbar/tab-icon2-active.png',
    text: '数据',
    url: '/statistic'
  },
  {
    id: '3',
    icon: '/img/tabbar/tab-icon3.png',
    iconActive: '/img/tabbar/tab-icon3-active.png',
    text: '看点',
    url: '/news',
    large: true
  },
  {
    id: '4',
    icon: '/img/tabbar/tab-icon4.png',
    iconActive: '/img/tabbar/tab-icon4-active.png',
    text: '任务',
    url: '/task'
  },
  {
    id: '5',
    icon: '/img/tabbar/tab-icon5.png',
    iconActive: '/img/tabbar/tab-icon5-active.png',
    text: '我的',
    url: '/user'
  }
]

export const regx = {
  phone: /^1([0-9][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/,
  password: /^(?![0-9]+$)(?![a-zA-Z!@#$%^&,.*~:?_/=+\\-]+$)[0-9A-Za-z!@#$%^&,.*~:?_/=+\\-]{6,20}$/,
  code: /^[A-Za-z0-9]+$/
}

export const DOWNLOAD_URL = {
  ios: 'https://apps.apple.com/cn/app/id1487909642',
  android: 'https://sndj.oss-cn-hangzhou.aliyuncs.com/apk/shangniu_baidu.apk'
}
