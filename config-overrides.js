const {override, fixBabelImports, addLessLoader} = require('customize-cra')

module.exports = {
  webpack: function (config) {
    config.optimization.splitChunks = {
      cacheGroups: {
        default: false
      }
    }

    config.optimization.runtimeChunk = false

    config.entry = {
      main: './src/index.tsx',
      content: './src/pages/content/index.ts',
      background: './src/pages/background/index.ts'
    }

    config.output.filename = '[name].js'

    return override(
      fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      }),
      addLessLoader({
        lessOptions: {
          javascriptEnabled: true,
          modifyVars: {
            '@primary-color': '#ff8a00',
            '@border-radius-base': '12px'
          }
        }
      })
    )(config)
  }
}
