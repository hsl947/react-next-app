import React from 'react'
import { NextPage, GetServerSideProps } from 'next'
import { connect } from 'react-redux'

interface Props {
  storeData?: Record<any, any>;
  data?: any[];
}

const News: NextPage<Props> = () => {
  return (
    <>
      <div>News</div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  return {
    props: {
      data: []
    }
  }
}

export default connect((state) => state, {})(News)
