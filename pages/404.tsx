import React from 'react'
import { NextPage } from 'next'
import Router from 'next/router'
import styles from './index.module.less'

interface Props {}

// 自定义 404入口组件
const MyError: NextPage<Props> = () => {
  return (
    <div className={styles.errorBox}>
      <img className={styles.img} src="/img/404.png" alt="404" />
      <p className={styles.text}>抱歉...您访问的页面不存在</p>
      <p className={styles.back} onClick={() => Router.replace('/')}>
        返回首页
      </p>
    </div>
  )
}

export default MyError
