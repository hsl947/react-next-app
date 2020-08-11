import Axios from 'axios'
import { Toast } from 'antd-mobile'
import Router from 'next/router'
import { setCookie } from '@/assets/js/common'
// import cookies from 'next-cookies'

interface AxiosConfig {
  timeout: number;
  headers: {
    'Content-Type': string
  };
  baseURL?: string;
}

const initConfig = {
  timeout: 600000,
  headers: {
    'Content-Type': 'application/json'
  }
}

const { PORT } = process.env
const urlConfig = process.browser ? {} : { baseURL: `http://localhost:${PORT}` }
const allConfig: AxiosConfig = { ...initConfig, ...urlConfig }
const axios = Axios.create(allConfig)
const clearAll = () => {
  localStorage.clear()
  setCookie('')
  Router.push('/login')
}

// 请求前拦截
axios.interceptors.request.use(
  (req) => {
    let Token = ''
    if (process.browser) {
      // 客户端
      Token = localStorage.getItem('token')
    } else {
      // 服务端
      Token = process.env.SN_TOKEN
    }
    req.headers.token = Token
    req.headers.ctype = 'h5'
    return req
  },
  (err) => Promise.reject(err)
)

// 返回后拦截
axios.interceptors.response.use(
  (res) => {
    const { data } = res
    // console.log('data: ', data)
    if (data.code === 200) {
      return Promise.resolve(data.body)
    }
    if (data.code === 10002) {
      if (process.browser) {
        Toast.fail('登录过期', 2)
        clearAll()
      }
      return Promise.resolve(data)
    }
    if (data.code !== 200) {
      if (process.browser) {
        Toast.info(data.message, 2)
      }
    }
    return Promise.resolve(data)
  },
  (err) => Promise.reject(err)
)

export default axios
