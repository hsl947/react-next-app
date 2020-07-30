// import App from 'next/app'
import React from 'react'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import Head from 'next/head'

import { Provider as ReduxProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { store, persistor } from '@/store/index'

import '@/assets/css/global.scss'
import '@/assets/js/flexible'

// 自定义 App入口组件
const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"
          />
        </Head>
        <Component {...pageProps} />
      </PersistGate>
    </ReduxProvider>
  )
}

export default App
