import React, { useEffect } from 'react'
import { NextPage, GetServerSideProps } from 'next'
import Link from 'next/link'
import axios from '@/assets/js/axios'
import styles from './index.module.scss'

interface Props {
  data: Record<any, any>;
}

const Home: NextPage<Props> = ({ data }) => {
  useEffect(() => {
    axios.get(
      '/api/battle/index/dayQuantiy?gameType=lol&startTime=1595952000000&endTime=1596038400000&dateType=tomorrow'
    )
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

export default Home
