module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo', '@babel/preset-typescript'],
    plugins: [
      '@babel/plugin-transform-react-jsx',
      'react-native-reanimated/plugin',
    ],
  }
}
