const webpack = require("webpack");

module.exports = {
    entry: {
        index: "./ts/index"
    },
    output: {
        // 直接运行 webpack 的时候需要，
        // 但是如果在 gulp 中使用 webapck-stream 有这个属性会报错
        path: "../www/js",
        filename: "[name].js"
    },
    devtool: "source-map",
    resolve: {
        extensions: [".ts", ".js"]
    },
    // externals 指定模块对应的全局变量，
    // 这样在 require() 这些模块的时候不会把相应的源文件打在包内。
    externals: {
        "jquery": "jQuery"
    },
    plugins: [
        // ProvidePlugin 允许代码中直接使用定义的属性，而不需要 require()
        // 比如下面的定义可以直接使用 $，而不再需要 const $ = require("jquery");
        new webpack.ProvidePlugin({
            $: "jquery"
        })
    ],
    module: {
        rules: [{
                test: /\.js$/,
                use: "babel-loader"
            },
            {
                test: /\.ts$/,
                use: [{
                        loader: "babel-loader",
                        options: {
                            presets: ["env"]
                        }
                    },
                    "ts-loader"
                ]
            }
        ]
    }
};