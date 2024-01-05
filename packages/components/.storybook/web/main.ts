const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  stories: [
    '../../src/components/**/*.stories.mdx',
    '../../src/components/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-react-native-web',
    'storybook-addon-designs',
    'storybook-dark-mode',
  ],
  core: {
    builder: 'webpack5',
  },
  framework: '@storybook/react',
  staticDirs: ['../../src/assets'],
  webpackFinal: async (config) => {
    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: '../../node_modules/@department-of-veterans-affairs/mobile-assets/fonts',
            to: 'fonts',
          },
        ],
      }),
    )

    return config
  },
}
