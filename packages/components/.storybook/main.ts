import type { StorybookConfig } from '@storybook/react-vite'

import { mergeConfig } from 'vite'

import { join, dirname } from 'path'

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')))
}
const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    getAbsolutePath('@storybook/addon-docs'),
    getAbsolutePath('@storybook/addon-onboarding'),
    getAbsolutePath('@vueless/storybook-dark-mode'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
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
      resolve: {
        alias: {
          'react-native': 'react-native-web',
        },
      },
    }),
}
export default config
