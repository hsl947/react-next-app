import React, { useState, useEffect } from 'react'
import { NextPage } from 'next'
import Router from 'next/router'
import { TAB_LIST } from '@/assets/js/types'

import { connect } from 'react-redux'
import * as actions from '@/store/actions'

import styles from './index.module.less'

interface Props extends ReduxProps {
  onClick?: (arg0: Record<string, any>) => void;
  acticeIndex?: string;
}

const TabBar: NextPage<Props> = ({ onClick, acticeIndex, setStoreData }) => {
  // 默认参数配置
  const defaultProps = {
    color: '#657180',
    activeColor: '#3F8FFD',
    tabList: TAB_LIST
  }

  const { color, activeColor, tabList } = defaultProps
  const [curTab, setCurTab] = useState<string>(acticeIndex)

  const switchTab = (item: Record<string, any>) => {
    const { id, url } = item
    setCurTab(id)
    setStoreData('SET_ACTIVEINDEX', id)
    if (onClick) onClick(item)
    Router.push(url)
  }

  useEffect(() => {
    const path = window.location.pathname
    const isTabBar = TAB_LIST.filter((item) => item.url === path)
    if (isTabBar[0]) {
      setCurTab(isTabBar[0].id)
    }
  }, [])

  return (
    <div className={styles.tabbar}>
      <div className={styles['tabbar-list']}>
        {tabList.map((item) => (
          <div
            className={`${styles['tabbar-item']}
              ${item.large ? styles['tabbar-item-lg'] : ''}`}
            key={item.id}
            onClick={() => switchTab(item)}
          >
            <img
              className={styles['tabbar-icon']}
              src={curTab === item.id ? item.iconActive : item.icon}
              alt=""
            />
            <span
              className={styles['tabbar-title']}
              style={{ color: curTab === item.id ? activeColor : color }}
            >
              {item.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default connect((state) => state, actions)(TabBar)
