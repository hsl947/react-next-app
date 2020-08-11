import Router from 'next/router'
import { NextPageContext } from 'next'
import { regx } from '@/assets/js/types'
import moment from '@/utils/moment'

/**
 * 重定向函数
 * @param ctx context对象
 * @param path 重定向路径
 */
export const redirect = (ctx: NextPageContext, path: string) => {
  const { req, res } = ctx
  // 如果包含 req 信息则表示代码运行在服务端
  if (req) {
    res.writeHead(301, { Location: path })
    res.end()
  } else {
    // 客户端跳转方式
    Router.push(path)
  }
}

/**
 * 校验表单
 * @param type 校验字段
 * @param value 校验的值
 */
export const validate = (type: string, value: string) => {
  return regx[type].test(value)
}

/**
 * 判断是否登录
 */
export function isLogin() {
  const token = process.browser
    ? localStorage.getItem('token')
    : process.env.SN_TOKEN
  return !!token && token !== 'undefined'
}

// 判断浏览器环境
export const broswerEnv = () => {
  if (!process.browser) return 'server'
  const browser = {
    versions: (() => {
      const u = navigator.userAgent
      return {
        // 移动终端浏览器版本信息
        trident: u.indexOf('Trident') > -1, // IE内核
        presto: u.indexOf('Presto') > -1, // opera内核
        webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, // 火狐内核
        mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, // android终端或uc浏览器
        iPhone: u.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
        iPad: u.indexOf('iPad') > -1, // 是否iPad
        webApp: u.indexOf('Safari') === -1 // 是否web应该程序，没有头部与底部
      }
    })()
  }
  if (browser.versions.mobile) {
    // 判断是否是移动设备打开。browser代码在下面
    const ua = navigator.userAgent.toLowerCase() // 获取判断用的对象
    if (ua.includes('micromessenger')) {
      // 在微信中打开
      return 'weixin'
    }
    if (ua.includes('weibo')) {
      // 在新浪微博客户端打开
      return 'weibo'
    }
    if (ua.includes('qq')) {
      // 在QQ空间打开
      return 'qq'
    }
    if (browser.versions.ios) {
      // 是否在IOS浏览器打开
      return 'ios'
    }
    if (browser.versions.android) {
      // 是否在安卓浏览器打开
      return 'android'
    }
  }

  // 否则就是PC浏览器打开
  return 'pc'
}

/**
 * 判断是否登录的回调
 */
export function loginCb(cb: () => void) {
  if (isLogin()) {
    cb()
  } else {
    Router.push('/login')
  }
}

/**
 * 时间戳转化为年 月 日 时 分 秒
 * @param number: 传入时间戳
 * @param format：返回格式，支持自定义
 * formatTime(timestamp, 'YYYY-MM-DD HH:mm:ss');//转换为日期：2017/03/03 03:03:03
 */
export function formatTime(timestamp: number | string, format: string) {
  if (!timestamp) {
    return '---'
  }
  return moment(+timestamp).format(format)
}

/**
 * 距今多久转换
 * @param date: 传入时间戳
 */
export function dateForNow(date: string | number) {
  const dateYear = moment(date).year()
  const curYear = moment().year()
  return dateYear === curYear
    ? moment(date).fromNow()
    : formatTime(date, 'YYYY-MM-DD')
}

/**
 * 设置 cookie
 * @param val: 值
 */
export function setCookie(val: string) {
  document.cookie = `SN_token=${val}; path=/; expires=Thu, 01 Jan 2099 00:00:01 GMT`
}
