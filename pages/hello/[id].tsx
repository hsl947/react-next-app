import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { NextPage } from 'next'

const HelloId: NextPage = () => {
  const router = useRouter()
  const { id } = router.query
  if (process.browser) {
    // 这里是客户端
  }
  useEffect(() => {
    // console.log(1, window)
  }, [])
  return <h5>当前 id -- {id}</h5>
}

export default HelloId
