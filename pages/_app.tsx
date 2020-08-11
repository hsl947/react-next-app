import App from 'next/app'
import React, { useEffect, useState, useCallback } from 'react'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { TAB_LIST } from '@/assets/js/types'
import TabBar from '@/components/common/tabBar'
import cookies from 'next-cookies'
import { Provider as ReduxProvider } from 'react-redux'
import store from '@/store/index'

interface Props extends AppProps {}

// 自定义 App入口组件
const MyApp: NextPage<Props> = ({ Component, pageProps }) => {
  const router = useRouter()
  const { pathname, query } = router

  const [activeIndex, setActiveIndex] = useState<string>('1')

  const initStore = useCallback(() => {
    const reduxObj = localStorage.getItem('redux')
    if (!reduxObj) {
      localStorage.setItem(
        'redux',
        JSON.stringify({
          activeIndex
        })
      )
    }
    try {
      const curIndex = JSON.parse(reduxObj).activeIndex || activeIndex
      setActiveIndex(curIndex)
    } catch (error) {
      setActiveIndex('1')
    }
  }, [activeIndex])

  const promiseFallback = () => {
    // 引入 Promise 的 fallback 支持 (部分安卓手机不支持 Promise)
    if (!window.Promise) {
      const script = document.createElement('script')
      script.src =
        'https://as.alipayobjects.com/g/component/es6-promise/3.2.2/es6-promise.min.js'
      document.body.appendChild(script)
    }
  }

  useEffect(() => {
    promiseFallback()
    initStore()
  }, [initStore])

  // 是否展示底部 tabbar
  const showTabbar = () => {
    let status = TAB_LIST.some(
      (_) => _.url === pathname || pathname.includes(_.url)
    )
    // 资讯详情页不显示
    if (query.gameType) {
      status = status && query.gameType.length === 1
    }
    return status
  }

  return (
    <ReduxProvider store={store}>
      <Head>
        <title>
          尚牛电竞比分网 -
          LOL比分直播-DOTA2比分-CSGO比分-王者荣耀即时比分-电竞比赛直播
        </title>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="utf-8" />
        <meta name="renderer" content="webkit" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"
        />
        <meta
          name="description"
          content="尚牛电竞是以电竞比分直播为主的电子竞技数据平台,涵盖LOL比分、DOTA2比分、CSGO比分、王者荣耀KPL比分等电竞比赛赛程,提供最快即时比分、最新比赛结果、最全比赛数据、最新电竞资讯。"
        />
        <meta
          name="keywords"
          content="尚牛电竞,电竞比分网,王者荣耀比分,dota2比分,lol比分,csgo比分"
        />
        <link
          rel="stylesheet"
          href="//at.alicdn.com/t/font_1983784_nhksuvbfbsi.css"
        />
        <link rel="stylesheet" href="/css/global.css" />
        <script src="/js/flexible.js" />
        <script src="https://ssl.captcha.qq.com/TCaptcha.js" />
      </Head>
      <Component {...pageProps} />
      {showTabbar() && <TabBar acticeIndex={activeIndex} />}
    </ReduxProvider>
  )
}

MyApp.getInitialProps = async (context: any) => {
  const { ctx } = context
  const getCookies = cookies(ctx)
  process.env.SN_TOKEN = getCookies.SN_token
  // ctx.res.cookie('SN_token', 'asdasd1321fsf')
  const appProps: any = await App.getInitialProps(context)
  return { ...appProps }
}

export default MyApp
