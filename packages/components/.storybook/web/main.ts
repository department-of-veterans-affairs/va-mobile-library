import { dirname, join } from 'path'
const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  stories: [
    // '../../storybook/*.stories.mdx',
    '../../src/components/**/*.stories.@(js|jsx|ts|tsx)',
  ],

  addons: [
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-react-native-web'),
    getAbsolutePath('@storybook/addon-designs'),
    getAbsolutePath('storybook-dark-mode'),
  ],

  docs: {
    autodocs: true,
  },

  core: {
    builder: getAbsolutePath('@storybook/builder-webpack5'),
    disableWhatsNewNotifications: true,
  },

  // Force import of react-webpack5 to ensure compatibility
  framework: path.resolve(
    require.resolve('@storybook/react-webpack5'),
    '..',
  ) as any,

  // improves build performance
  options: { builder: { useSWC: true } },

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

  //   typescript: {
  //     reactDocgen: 'react-docgen-typescript',
  //   },
}

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')))
}
