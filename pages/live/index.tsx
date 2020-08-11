import React from 'react'
import { NextPage } from 'next'

import { connect } from 'react-redux'

interface Props {
  storeData?: Record<any, any>;
}

const Match: NextPage<Props> = () => {
  return (
    <>
      <h5>比赛</h5>
    </>
  )
}

export default connect((state) => state, {})(Match)
