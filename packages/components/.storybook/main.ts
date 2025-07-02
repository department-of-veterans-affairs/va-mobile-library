import type { StorybookConfig } from '@storybook/react-native-web-vite'

import { mergeConfig } from 'vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
    '@vueless/storybook-dark-mode',
  ],
  framework: {
    name: '@storybook/react-native-web-vite',
    options: {},
  },
  staticDirs: [
    '../src/assets', // Points to `assets` folder for custom SVG icon for Icon story
    // Copies fonts from the `mobile-assets` package to `fonts` directory to be available to preview-head.html
    {
      from: '../../../node_modules/@department-of-veterans-affairs/mobile-assets/fonts',
      to: 'fonts',
    },
  ],
  viteFinal: async (config) =>
    mergeConfig(config, {
      // Vite uses import.meta instead of process, but babel/node expects process.env
      define: { 'process.env': 'import.meta.env' },
      // module: {
      //   rules: [
      //     {
      //       test: /\.svg$/,
      //       issuer: /\.[jt]sx?$/,
      //       use: ['@svgr/webpack'],
      //     },
      //   ],
      // },
      resolve: {
        alias: {
          'react-native': 'react-native-web',
          // 'react-native-svg': 'react-native-svg-web',
        },
      },
    }),
}

export default config
