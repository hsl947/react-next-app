import React from 'react'
import { NextPage, NextPageContext } from 'next'
import { redirect } from '@/assets/js/common'

interface Props {}

const Home: NextPage<Props> = () => <div />

Home.getInitialProps = async (ctx: NextPageContext) => {
  redirect(ctx, '/hello/123')
  return {}
}

export default Home
