const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const vueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    mode: 'development',     //模式 生产模式 development 和 上线 producion
    entry: path.join(__dirname, './src/main.js'),  //入口
    output: {   //出口
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js'
    },
    devServer: {
        open: true,    //自动打开浏览器
        contentBase: path.join(__dirname, 'src'),   //打开文件所在位置
        hot: true,      //启用热更新
        host: '192.168.1.105'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),  //new一个webpack热更新模块
        new htmlWebpackPlugin({   //创建一个在内存中生成 html 的插件
            template: path.join(__dirname, './src/index.html'), //指定 模版页面，将来会根据指定的页面路径，在内存中生成页面
            filename: 'index.html'   //指定生成页面的名称
        }),
        new vueLoaderPlugin()
    ],
    module: {
        rules: [
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
            { test: /\.(png|jpg|gif|bmp|jpeg)$/, use: 'url-loader?limit=492,127&name=[hash:8]-[name].[ext]' },
            { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader' },
            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
            { test: /\.vue$/, use: 'vue-loader' }
        ]
    },
    resolve: {
        alias: {
            "vue$": "vue/dist/vue.common.js"
        }
    }
}