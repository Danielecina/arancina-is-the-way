const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  webpack: function (config) {
    config.optimization.splitChunks = {
      cacheGroups: {
        default: false,
      },
    };

    config.optimization.runtimeChunk = false;

    config.entry = {
      main: "./src/index.tsx",
      content: "./src/pages/content/index.ts",
      background: "./src/pages/background/index.ts",
    };

    config.output.filename = "[name].js";

    config.plugins = config.plugins
      .filter((plugin) => !(plugin instanceof MiniCssExtractPlugin))
      .concat(
        new MiniCssExtractPlugin()
      );

    return config;
  }
};
