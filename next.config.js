const withCSS = require('@zeit/next-css')
const fs = require('fs')
const path = require('path')
const withLessExcludeAntd = require('./next-less.config.js')

if (typeof require !== 'undefined') {
  require.extensions['.less'] = (file) => {}
  require.extensions['.css'] = (file) => {}
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

module.exports = withBundleAnalyzer(
  withCSS(
    withLessExcludeAntd({
      lessLoaderOptions: {
        javascriptEnabled: true,
        modifyVars: {
          'primary-color': '#3f8ffd'
        }
      },
      cssModules: true,
      cssLoaderOptions: {
        importLoaders: 1,
        localIdentName: '[local]_[hash:base64:5]'
      }
    })
  )
)
