const cssLoaderConfig = require('@zeit/next-css/css-loader-config')

module.exports = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      if (!options.defaultLoaders) {
        throw new Error(
          'This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade'
        )
      }

      const { dev, isServer } = options
      const {
        cssModules,
        cssLoaderOptions,
        lessLoaderOptions = {}
      } = nextConfig

      options.defaultLoaders.less = cssLoaderConfig(config, {
        extensions: ['less'],
        cssModules,
        cssLoaderOptions,
        dev,
        isServer,
        loaders: [
          {
            loader: 'less-loader',
            options: lessLoaderOptions
          }
        ]
      })

      config.module.rules.push({
        test: /\.less$/,
        exclude: /node_modules/,
        use: options.defaultLoaders.less
      })

      // 我们禁用了antd的cssModules
      config.module.rules.push({
        test: /\.less$/,
        include: /node_modules/,
        use: cssLoaderConfig(config, {
          extensions: ['less'],
          cssModules:false,
          cssLoaderOptions,
          dev,
          isServer,
          loaders: [
            {
              loader: 'less-loader',
              options: lessLoaderOptions
            }
          ]
        })
      })

      // for antd less in server (yarn build)
      if (isServer) {
        const antdStyles = /antd-mobile\/.*?\/style.*?/;
        const rawExternals = [...config.externals];

        config.externals = [
          (context, request, callback) => {
            if (request.match(antdStyles)) {
              return callback();
            }

            if (typeof rawExternals[0] === 'function') {
              rawExternals[0](context, request, callback);
            } else {
              callback();
            }
          },
          ...(typeof rawExternals[0] === 'function' ? [] : rawExternals),
        ];

        config.module.rules.unshift({
          test: antdStyles,
          use: 'null-loader',
        });
      }

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }

      return config
    }
  })
}
