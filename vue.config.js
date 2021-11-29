'use strict';
const path = require('path');
// 开启gzip压缩
const CompressionWebpackPlugin = require('compression-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname, dir);
}

const name = 'BlockPI'; // page title

// 判断开发环境
const isProduction = process.env.NODE_ENV === 'production';
// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following methods:
// port = 9528 npm run dev OR npm run dev --port = 9528
const port =
  process.env.port ||
  process.env.npm_config_port ||
  process.env.VUE_APP_LOCAL_PORT; // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    historyApiFallback: true,
    port: port,
    proxy: {
      '/api': {
        target: `${process.env.VUE_APP_SERVER_HOST}:${process.env.VUE_APP_SERVER_PORT}`,
        ws: false,
        changeOrigin: true,
        cookieDomainRewrite: {
          [process.env.VUE_APP_SERVER_HOST +
          ':' +
          process.env.VUE_APP_SERVER_PORT]: 'http://127.0.0.1'
        },
        pathRewrite: { '^/api': '/api' }
      }
    }
  },
  configureWebpack: config => {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    config.name = name;
    config.resolve.alias = { '@': resolve('src') };

    if (isProduction) {
      config.externals = {
        'vue': 'Vue',
        'element-ui': 'ELEMENT',
        'echarts': 'echarts',
        'vuetify': 'Vuetify'
      };
      // 开启GZIP
      config.plugins.push(new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: /\.js$|\.html$|\.json$|\.css/,
        threshold: 10240,
        minRatio: 0.8,
        deleteOriginalAssets: true
      }));

      // 开启分离js
      config.optimization = {
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: Infinity,
          minSize: 20000,
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name(module) {
              // get the name. E.g. node_modules/packageName/not/this/part.js
              // or node_modules/packageName
                const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                // npm package names are URL-safe, but some servers don't like @ symbols
                return `npm.${packageName.replace('@', '')}`;
              }
            }
          }
        }
      };
    }
  },
  chainWebpack(config) {
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end();
    config.module
      .rule('icons')
      .test(/\.svg$/u)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({ symbolId: 'icon-[name]' })
      .end();
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.directives = {
          html(node, directiveMeta) {
            (node.props || (node.props = [])).push({
              name: 'innerHTML',
              value: `xss(_s(${directiveMeta.value}))`
            });
          }
        };
        return options;
      });
  }
};
