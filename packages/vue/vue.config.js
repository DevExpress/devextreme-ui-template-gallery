const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './',
  outputDir: 'build',
  productionSourceMap: false,
  css: {
    extract: true,
  },
  configureWebpack: {
    optimization: {
      splitChunks: {
        cacheGroups: {
          stylesLightTheme: {
            name: 'theme-light',
            test: /-light\.s?css$/,
            chunks: 'all',
            enforce: true,
          },
          stylesDarkTheme: {
            name: 'theme-dark',
            test: /-dark\.s?css$/,
            chunks: 'all',
            enforce: true,
          },
          stylesLight: {
            name: 'styles',
            test: /[^(\-dark|\-light)]\.s?css$/,
            chunks: 'all',
            enforce: true,
          },
        },
      },
    },
  },
  chainWebpack: (config) => {
    ['vue-modules', 'vue', 'normal-modules', 'normal'].forEach((rule) => {
      config.module.rule('scss')
        .oneOf(rule)
        .use('resolve-url-loader')
        .loader('resolve-url-loader')
        .before('sass-loader')
        .end()
        .use('sass-loader')
        .loader('sass-loader')
        .tap((options) => ({ ...options, sourceMap: true }));
    });
  },
});
