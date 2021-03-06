var path = require("path");
var webpack = require("webpack");
var proxy = require("http-proxy-middleware");

function resolve(dir) {
  console.log(path.join(__dirname, "../", dir));
  return path.join(__dirname, "../", dir);
}
module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    publicPath: "/dist/",
    filename: "build.js"
  },
  module: {
    rules: [{
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"]
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
        exclude: /node_modules/,
        options: {
          loaders: {}
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]?[hash]"
        }
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/, //需要配置
        loader: "file-loader"
      }
    ]
  },
  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm.js",
      "@": resolve("src")
    },
    extensions: ["*", ".js", ".vue", ".json"]
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true,
    stats: {
      colors: true
    },
    proxy: [{
      context: [
        "/login",
        "/register",
        "/user/navlist",
        "/user/outfit",
        "/user/build",
        "/user/created",
        "/user/getframelist",
        "/user/setauthority",
        "/user/upmission",
        "/captcha",
        "/checkname",
        "/getgroup",
        "/setgroup",
        "/getgrouptree",
        "/getwating",
        "/getworking",
        "/getprogress",
        "/getmycensus",
        "/upload",
        "/user/getuserinfo",
        "/user/setmyinfo",
        "/getusermap",
        "/logupload",
        "/user/subdaily",
        "/user/getmydaily",
        "/actionlog",
        "/findpass",
        "/socket"
      ],
      target: "http://localhost:3000",
      changeOrigin: true,
      secure: false
    }]
  },
  performance: {
    hints: false
  },
  devtool: "#eval-source-map"
};

if (process.env.NODE_ENV === "production") {
  module.exports.devtool = "#source-map";
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]);
}
