import React, { useEffect } from 'react'
import Link from 'next/link'
import axios from 'axios'
import styles from './index.module.scss'

export default function Home() {
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
      </main>
    </div>
  )
}

Home.getInitialProps = async ({ req }: any) => {
  const { data } = await axios.get(
    `http://${req.headers.host}/api/battle/index/dayQuantiy?gameType=lol&startTime=1595952000000&endTime=1596038400000&dateType=tomorrow`
  )
  return { data }
}
