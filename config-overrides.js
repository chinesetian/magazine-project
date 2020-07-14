const { fixBabelImports, addDecoratorsLegacy, override, addBabelPlugins, 
  addLessLoader, addWebpackAlias, useEslintRc } = require("customize-cra");

// const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
// const myPlugin = [
//   new UglifyJsPlugin(
//     {
//       uglifyOptions: {
//         warnings: false,
//         compress: {
//           drop_debugger: true,
//           drop_console: true
//         }
//       }
//     }
//   )
// ]

const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const myPlugin = [
  new TerserPlugin(
    {
      terserOptions: {
        warnings: false,
        compress: {
          drop_debugger: true,
          drop_console: true
        }
      }
    }
  ),
  new CleanWebpackPlugin({
    dry: true,
  }),
]

if (process.env.NODE_ENV === "development") {
  process.env.PORT = 3000;
}
const path = require("path");
module.exports = override(
  addWebpackAlias({ src: path.resolve("./"), module: path.resolve("./node_modules") }),
  addDecoratorsLegacy(),
  addBabelPlugins(["react-hot-loader/babel"]),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  useEslintRc(),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { 
      '@primary-color': '#e91d25', // 全局主色
      '@link-color': '#e91d25', // 链接色
      '@success-color': '#52c41a', // 成功色
      '@warning-color': '#faad14', // 警告色
      '@error-color': '#f5222d', // 错误色
      '@font-size-base': '14px', // 主字号
      '@heading-color': 'rgba(0, 0, 0, 0.85)', // 标题色
      '@text-color': 'rgba(0, 0, 0, 0.65)', // 主文本色
      '@text-color-secondary' : 'rgba(0, 0, 0, .45)', // 次文本色
      '@disabled-color' : 'rgba(0, 0, 0, .25)', // 失效色
      '@border-radius-base': '4px', // 组件/浮层圆角
      '@border-color-base': '#d9d9d9',// 边框色
      '@box-shadow-base': '0 2px 8px rgba(0, 0, 0, 0.15)', // 浮层阴影
     },
  }),
  (config)=>{ //暴露webpack的配置 config ,evn
    // 去掉打包生产map 文件
    config.devtool = process.env.NODE_ENV !== 'development' ? 'nosources-source-map' : 'source-map';
    config.plugins = process.env.NODE_ENV !=="development" ? [...config.plugins,...myPlugin] : [...config.plugins,]
    return config
  }
);
