import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { NextPage } from 'next'

import { connect } from 'react-redux'

interface Props {
  storeData?: Record<any, any>;
}

const HelloId: NextPage<Props> = (props) => {
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

export default connect((state) => state, {})(HelloId)
