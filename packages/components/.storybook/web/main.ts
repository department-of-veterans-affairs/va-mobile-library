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
    '@storybook/addon-designs',
    'storybook-dark-mode',
  ],
  docs: {
    autodocs: true,
  },
  core: {
    builder: 'webpack5',
  },
  framework: '@storybook/react-webpack5',
  options: { builder: { useSWC: true } },
  typescript: {
    reactDocgen: 'react-docgen', // or false if you don't need docgen at all
  },
  staticDirs: ['../../src/assets'],
  webpackFinal: async (config) => {
    // Copies fonts from mobile-assets to storybook static folder
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

    // SVG support for storybook web
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test.test('.svg'),
    )
    fileLoaderRule.exclude = /\.svg$/
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
}
