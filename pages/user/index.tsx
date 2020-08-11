import React from 'react'
import { NextPage } from 'next'

import { connect } from 'react-redux'

interface Props {
  storeData?: Record<any, any>;
}

const User: NextPage<Props> = () => {
  return (
    <>
      <h5>个人中心</h5>
    </>
  )
}

export default connect((state) => state, {})(User)
