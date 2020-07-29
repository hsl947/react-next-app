import Axios from 'axios'

interface AxiosConfig {
  timeout: number;
  headers: {
    'Content-Type': string
  };
}

const config: AxiosConfig = {
  timeout: 600000,
  headers: {
    'Content-Type': 'application/json'
  }
}

const axios = Axios.create(config)

// 请求前拦截
axios.interceptors.request.use(
  (req) => {
    req.headers.token = undefined
    return req
  },
  (err) => {
    return Promise.reject(err)
  }
)

// 返回后拦截
axios.interceptors.response.use(
  ({ data }): any => {
    return Promise.resolve(data)
  },
  (err) => {
    return Promise.reject(err)
  }
)

export default axios
