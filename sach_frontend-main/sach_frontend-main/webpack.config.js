const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const CompressionPlugin = require("compression-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let webpack = require("webpack");

const prodPlugins = [
  new MiniCssExtractPlugin({
    filename: "css/[name].[chunkhash:8].css",
  }),
  new CompressionPlugin({
    // filename: '[name].gz[contenthash]',
    algorithm: "gzip",
    test: /\.js$|\.jsx$|\.css$|\.html$/,
    threshold: 10240,
    minRatio: 0.8,
  }),
];

const plugins = [
  new HtmlWebpackPlugin({
    template: path.resolve("./public/index.html"),
  }),
  new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery",
  }),
];

module.exports = (env, options) => {
  const isProd = env.production;
  console.log("Production: ", env.production, env.development); // true
  return {
    externals: {
      // only define the dependencies you are NOT using as externals!
      canvg: "canvg",
      html2canvas: "html2canvas",
      dompurify: "dompurify"
    },
    entry: path.resolve(__dirname, "./src/index.js"),
    devtool: "source-map",
    target: "web",
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ["babel-loader"],
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(gif|png|jpe?g|svg|ico|webp)$/i,
          use: [
            {
              loader: "file-loader",
              options: { name: "media/[name].[hash:8].[ext]" },
            },
          ],
        },
        {
          test: /\.(woff(2)?|ttf|otf|eot)(\?[a-z0-9=&.]+)?$/,
          use: [
            {
              loader: "url-loader",
              options: { limit: 1000, name: "media/[name].[hash:8].[ext]" },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ["*", ".js", ".jsx"],
    },
    output: {
      path: path.resolve(__dirname, options.mode === "production" ? "./dist" : "./public"),
      filename: "[name].[contenthash].js",
      chunkFilename: "[name].[contenthash].chunk.js",
      publicPath: "/",
    },
    devServer: {
      static: {
        directory: path.join(__dirname, "public"),
      },
      compress: true,
      allowedHosts: "all",
      port: 3000,
      historyApiFallback: true,
    },
    plugins: isProd ? prodPlugins.concat(plugins) : plugins,
    optimization: {
      usedExports: true,
      runtimeChunk: {
        name: "webpackManifest",
      },
      minimize: isProd ? true : false,
      minimizer: isProd
        ? [
            new TerserPlugin({
              parallel: 4,
            }),
            new OptimizeCSSAssetsPlugin({}),
            new UglifyJsPlugin({
              include: /\.min\.js$/,
            }),
          ]
        : [],
      splitChunks: {
        name: false,
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: `vendor.such`,
            chunks: "initial",
          },
          default: {
            minChunks: 2,
            reuseExistingChunk: true,
            minSize: 100000,
          },
        },
      },
    },
  };
};
