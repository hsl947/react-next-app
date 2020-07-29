import Axios from 'axios'

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

// 请求前拦截
axios.interceptors.request.use(
  (req) => {
    req.headers.token = null
    return req
  },
  (err) => Promise.reject(err)
)

// 返回后拦截
axios.interceptors.response.use(
  ({ data }) => {
    return Promise.resolve(data)
  },
  (err) => Promise.reject(err)
)

export default axios
