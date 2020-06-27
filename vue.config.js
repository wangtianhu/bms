const path = require('path')
module.exports = {
    // 部署应用包时的基本 URL,用法和 webpack 本身的 output.publicPath 一致
    publicPath: './',
    // 输出文件目录
    outputDir: 'dist',
    // eslint-loader 是否在保存的时候检查
    lintOnSave: true,
    // 是否使用包含运行时编译器的 Vue 构建版本
    runtimeCompiler: false,
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: false,
    // 生成的 HTML 中的 <link rel="stylesheet"> 和 <script> 标签上启用 Subresource Integrity (SRI)
    integrity: false,
    // webpack相关配置
    chainWebpack: (config) => {
        config.resolve.symlinks(true)
        config.resolve.alias
            .set('vue$', 'vue/dist/vue.esm.js')
            .set('@', path.resolve(__dirname, './src'))
    },
    configureWebpack: (config) => {
        if (process.env.NODE_ENV === 'production') {
            // 生产环境
            config.mode = 'production'
        } else {
            // 开发环境
            config.mode = 'development'
        }
    },
    // css相关配置
    css: {
        // 是否分离css（插件ExtractTextPlugin）
        extract: true,
        // 是否开启 CSS source maps
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {},
        // 是否启用 CSS modules for all css / pre-processor files.
        modules: false
    },
    // 是否使用 thread-loader
    parallel: require('os').cpus().length > 1,
    // PWA 插件相关配置
    pwa: {},
    // cli3 代理是从指定的target后面开始匹配的，不是任意位置；配置pathRewrite可以做替换
    //启用测试
    //  var ipStr = "http://test.pms.harbourhome.com.cn";
    //  var ipgateway = "http://api.uat.harbourhome.com.cn:8082";
    //  var fileiP = "http://test.pms.harbourhome.com.cn";      // 上传文件的地址
    //  var picIpStr = "http://test.pms.harbourhome.com.cn";    // 本地上传图片
    devServer: {
        open: true,
        host: 'localhost',
        port: 8086,
        https: false,
        hotOnly: false,
        proxy: {
            '/api': {
                pathRewrite: {
                    "^/api/": "/"
                },
                target: 'http://test.pms.harbourhome.com.cn',
                changeOrigin: true
            },
            '/uat': {
                pathRewrite: {
                    "^/uat/": "/"
                },
                target: 'http://api.uat.harbourhome.com.cn:8082',
                changeOrigin: true
            },


        },
        before: app => { }
    }
}