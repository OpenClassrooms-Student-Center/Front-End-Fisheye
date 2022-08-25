const path = require('path');


module.exports = {
    mode: 'production',

    entry: {
        index: __dirname + "/src/scripts/pages/index.js",
        photographer: __dirname + "/src/scripts/pages/photographer.js"
    },

    output: {
        path: __dirname + '/dist',
        filename: "[name].js"
    },



    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env', {
                            "useBuiltIns": "entry",
                            "corejs": "3.22"
                        }]
                    }
                }
            }
        ]
    },

    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Style loader allow inject CSS into DOM from JS
                    "style-loader",
                    // Translates CSS into CommonJS (@imports url() to import/require)
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                    {
                        loader: "postcss-loader", // Allow to use New CSS Styles like :has
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            // Options
                                        },
                                    ],
                                ],
                            },
                        },
                    },
                ],
            },
        ],
    },

    watch: true,
};

