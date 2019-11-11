const path = require("path")

/** @type import('webpack').Configuration */
module.exports = {
  context: path.resolve(__dirname, ".."),
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              configFile: path.resolve(__dirname, "..", "tsconfig.json"),
              transpileOnly: true
            }
          }
        ]
      }
    ]
  }
}
