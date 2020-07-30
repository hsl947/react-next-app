import React, { useEffect } from 'react'
import { NextPage, GetServerSideProps } from 'next'
import Link from 'next/link'
import axios from '@/assets/js/axios'

import { connect } from 'react-redux'
import * as actions from '@/store/actions'

import styles from './index.module.scss'

interface Props {
  data: Record<any, any>;
  storeData?: Record<any, any>;
  setStoreData?: (type: string, payload: any) => object;
}

const Home: NextPage<Props> = (props) => {
  const { data, storeData, setStoreData } = props
  useEffect(() => {
    axios
      .get(
        '/api/battle/index/dayQuantiy?gameType=lol&startTime=1595952000000&endTime=1596038400000&dateType=tomorrow'
      )
      .then(() => {
        setStoreData('SET_USERINFO', { token: '123', userName: '456' })
      })
  }, [])

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to{' '}
          <Link href="/hello/123">
            <a>Next.js!</a>
          </Link>
        </h1>
        <h2 className={styles.subTitle}>{JSON.stringify(data)}</h2>
        <h2 className={styles.subTitle}>{JSON.stringify(storeData)}</h2>
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const data = await axios.get(
    '/api/battle/index/dayQuantiy?gameType=lol&startTime=1595952000000&endTime=1596038400000&dateType=tomorrow'
  )
  return {
    props: {
      data
    }
  }
}

export default connect((state) => state, actions)(Home)
