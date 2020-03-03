import * as path from "path";
import * as webpack from "webpack";
// @ts-ignore
import { CheckerPlugin } from "awesome-typescript-loader";
// @ts-ignore
import * as CleanWebpackPlugin from "clean-webpack-plugin";
// @ts-ignore
import * as ExtractTextPlugin from "extract-text-webpack-plugin";

interface Config extends webpack.Configuration {
    module: {
        rules: webpack.NewUseRule[]
    };
}

const srcPath = path.join(__dirname, "Client");
const distPath = path.join(__dirname, "wwwroot", "dist");

const configFunc = (env: any): Config => {
    const isProd: boolean = env && env.prod;

    const extractSass = new ExtractTextPlugin({
        filename: "[name].bundle.css",
        disable: !isProd
    });

    let config: Config = {
        context: srcPath,
        devtool: "eval-source-map",
        resolve: {
            extensions: [
                ".js", ".ts"
            ]
        },
        entry: {
            polyfills: "./scripts/polyfills.ts",
            main: "./scripts/app.ts"
        },
        output: {
            path: distPath,
            filename: "[name].bundle.js"
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: "awesome-typescript-loader"
                },
                {
                    test: /\.scss$/,
                    use: extractSass.extract({
                        use: [{
                            loader: "css-loader",
                            options: {
                                importLoaders: 2
                            }
                        },
                        {
                            loader: "postcss-loader"
                        },
                        {
                            loader: "sass-loader"
                        }
                        ],
                        fallback: "style-loader"
                    })
                }
            ]
        },
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                Popper: "jquery"
            }),
            new CheckerPlugin(),
            new CleanWebpackPlugin(["wwwroot/dist/"]),
            extractSass
        ]
    };

    if (isProd) {
        config.devtool = "source-map";
        config.plugins = config.plugins!.concat([
            new webpack.optimize.UglifyJsPlugin({
                sourceMap: true
            })
        ]);
    }

    return config;
};

export default configFunc;