const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    // 模式: 生产环境
    mode: 'production',
    // 入口
    entry: {
        app: path.resolve(__dirname, 'src/index.js')
    },
    // 出口(打包生成js)
    output: {
        filename: 'static/js/[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    // 模块加载器
    module: {
        rules: [
            //处理ES6=>ES5
            {
                test: /\.js$/, //匹配文件
                // exclude: /(node_modules|bower_components)/,
                include: [path.resolve(__dirname, 'src')], //只针对哪些文件
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'], //预设包：包含n个常用插件包的一个大包
                    }
                }
            },
            //处理css
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            //处理图片
            {
                test: /\.(png|jpg|gif)$/i,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: 'static/img/[name].[hash:7].[ext]' // 相对于output.path
                    },
                }, ],
            },
        ]
    },

    // 插件
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
            filename: 'index.html'
        })
    ],
    // 配置开发服务器
    devServer: {
        open: true, // 自动打开浏览器
        quiet: true, // 不做太多日志输出
    },
}