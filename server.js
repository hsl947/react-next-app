/* eslint-disable no-console */
const express = require('express')
const next = require('next')
const { createProxyMiddleware } = require('http-proxy-middleware')

const devProxy = {
  '/api': {
    target: 'http://121.40.239.167:9008',
    pathRewrite: {
      '^/api': '/api'
    },
    changeOrigin: true
  }
}

const port = parseInt(process.env.PORT, 10) || 3033
const dev = process.env.NODE_ENV !== 'production'
const app = next({
  dev
})
const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    const server = express()

    if (devProxy) {
      Object.keys(devProxy).forEach((context) => {
        server.use(context, createProxyMiddleware(devProxy[context]))
      })
    }

    server.all('*', (req, res) => {
      handle(req, res)
    })

    server.listen(port, (err) => {
      if (err) {
        throw err
      }
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
  .catch((err) => {
    console.log('An error occurred, unable to start the server')
    console.log(err)
  })
