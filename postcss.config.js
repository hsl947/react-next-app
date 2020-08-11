module.exports = {
  plugins: {
    'postcss-flexbugs-fixes': {},
    'postcss-preset-env': {
      autoprefixer: {
        flexbox: 'no-2009'
      },
      stage: 3
    },
    'postcss-pxtorem': {
      rootValue: 75,
      unitPrecision: 5,
      mediaQuery: false,
      minPixelValue: 0,
      propList: ["*"],
      exclude: RegExp(/node_modules/i)
    }
  }
}
