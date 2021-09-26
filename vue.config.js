const fs = require('fs')
const path = require('path')
const join = path.join
const resolve = (dir) => path.join(__dirname, './', dir)
var isProduct = process.env.NODE_ENV === 'production'
var target = process.env.tagrget

console.log('环境变量:', isProduct, process.env.tagrget)
function toLine (name) {
  return name.replace(/([A-Z])/g, '-$1').toLowerCase()
}
const utils = {
  resolve,
  getComponentEntries (path) {
    const files = fs.readdirSync(resolve(path))
    const componentEntries = files.reduce((ret, item) => {
      const itemPath = join(path, item)
      const isDir = fs.statSync(itemPath).isDirectory()
      if (!['types', 'utils', 'mixins', 'index.js'].includes(item)) {
        if (['styles'].includes(item)) {
          item = 'theme'
        } else if (!['index.js'].includes(item)) {
          item = 'xl-' + toLine(item)
        }
        if (isDir) {
          ret[item] = resolve(join(itemPath, 'index.js'))
        } else {
          const [name] = item.split('.')
          ret[name] = resolve(`${itemPath}`)
        }
      }
      return ret
    }, {})
    console.dir(componentEntries)
    return componentEntries
  }
}

const pub = {
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      src: utils.resolve('src'),
      components: utils.resolve('components'),
      'demo-vuecli3-ui': utils.resolve('components/index.js')
    }
  }
}

module.exports = () => {
  if (isProduct) {
    if (target === 'COMP') {
      return {
        publicPath: isProduct ? './' : './',
        outputDir: resolve('lib'),
        productionSourceMap: false,
        configureWebpack: {
          entry: {
            ...utils.getComponentEntries('packages')
          },
          output: {
            filename: '[name]/index.js',
            libraryTarget: 'commonjs2',
            libraryExport: 'default',
            library: 'demo-vuecli3-ui'
          },
          resolve: pub.resolve
        },
        css: {
          sourceMap: false,
          // extract: false
          extract: {
            filename: '[name]/style.css'
          }
        },
        chainWebpack: config => {
          config.optimization.delete('splitChunks')
          config.plugins.delete('copy')
          config.plugins.delete('preload')
          config.plugins.delete('prefetch')
          config.plugins.delete('html')
          config.plugins.delete('hmr')
          config.entryPoints.delete('app')

          config.module
            .rule('fonts')
            .use('url-loader')
            .tap(option => {
              option.fallback.options.name = 'static/fonts/[name].[hash:8].[ext]'
              return option
            })
        }
      }
    } else {
      return {
        outputDir: resolve('lib'),
        productionSourceMap: false,
        configureWebpack: {
          entry: 'package/index.js',
          output: {
            filename: 'index.js',
            libraryTarget: 'commonjs2',
            libraryExport: 'default',
            library: 'demo-vuecli3-ui'
          },
          resolve: pub.resolve
        },
        css: {
          sourceMap: false,
          extract: {
            filename: '[name]/style.css'
          }
        },
        chainWebpack: config => {
          config.optimization.delete('splitChunks')
          config.plugins.delete('copy')
          config.plugins.delete('preload')
          config.plugins.delete('prefetch')
          config.plugins.delete('html')
          config.plugins.delete('hmr')
          config.entryPoints.delete('app')

          config.module
            .rule('fonts')
            .use('url-loader')
            .tap(option => {
              option.fallback.options.name = 'static/fonts/[name].[hash:8].[ext]'
              return option
            })
        }
      }
    }
  } else {
    return {
      publicPath: isProduct ? './' : './',
      outputDir: 'build',
      assetsDir: 'assets',
      indexPath: 'index.html',
      filenameHashing: true,
      pages: {
        index: {
          entry: 'example/main.js',
          template: 'public/index.html',
          filename: 'index.html'
        }
      },
      runtimeCompiler: false,
      productionSourceMap: false,
      configureWebpack: {
        devtool: 'source-map'
      },
      chainWebpack: (config) => {
        config.resolve.alias
          .set('@', path.resolve('example'))
          .set('~', path.resolve('packages'))

        config.module
          .rule('js')
          .include.add(/packages/).end()
          .include.add(/example/).end()
          .use('babel')
          .loader('babel-loader')
          .tap(options => {
            return options
          })
      }
    }
  }
}

// const path = require('path')
// var isProduct = process.env.NODE_ENV === 'production'
// module.exports = {
//   publicPath: isProduct ? './' : './',
//   outputDir: 'build',
//   assetsDir: 'assets',
//   indexPath: 'index.html',
//   filenameHashing: true,
//   pages: {
//     index: {
//       entry: 'example/main.js',
//       template: 'public/index.html',
//       filename: 'index.html',
//     }
//   },
//   runtimeCompiler: false,
//   productionSourceMap: false,

//   chainWebpack: (config) => {
//     config.resolve.alias
//       .set('@', path.resolve('example'))
//       .set('~', path.resolve('packages'))

//       config.module
//       .rule('js')
//       .include.add(/packages/).end()
//       .include.add(/example/).end()
//       .use('babel')
//       .loader('babel-loader')
//       .tap(options => {
//         return options
//       })
//   },

// }
