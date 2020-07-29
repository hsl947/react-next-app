import React, { useEffect } from 'react'
import { NextPage, InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import axios from '@/assets/js/axios'
import styles from './index.module.scss'

interface Props {
  data: Record<any, any>;
}

export const getStaticProps = async () => {
  const data: Props = await axios.get(
    '/api/battle/index/dayQuantiy?gameType=lol&startTime=1595952000000&endTime=1596038400000&dateType=tomorrow'
  )
  return {
    props: {
      data
    }
  }
}

const Home = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
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

export default Home
