module.exports = {
    watch: true,

    entry: {
        index: __dirname + "/src/scripts/pages/index.js",
        photographer: __dirname + "/src/scripts/pages/photographer.js",
        404: __dirname + "/src/scripts/pages/404.js"

    },

    output: {
        path: __dirname + '/dist',
        filename: "[name].js"
    },

    module: {
        rules: [

            {
                test: /\.m?js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            [
                                "@babel/preset-env",
                                {
                                    "useBuiltIns": "entry",
                                    "corejs": 3,
                                }
                            ]
                        ]
                    }
                }
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    // Style loader allow inject CSS into DOM from JS
                    "style-loader",
                    // Translates CSS into CommonJS (@imports url() to import/require)
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                    {
                        loader: "postcss-loader", // Support Old css for old browser
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env"
                                    ]
                                ]
                            }
                        }
                    }
                ]
            }
        ]


    }


};


