import type { StorybookConfig } from '@storybook/react-native-web-vite'

import { mergeConfig } from 'vite'
import svgr from 'vite-plugin-svgr'
import vitePluginRequire from 'vite-plugin-require'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)', '../storybook/*.mdx'],
  addons: ['@storybook/addon-docs', '@vueless/storybook-dark-mode'],
  framework: { name: '@storybook/react-native-web-vite', options: {} },
  staticDirs: [
    '../src/assets', // Points to `assets` folder for custom SVG icon for Icon story
    {
      // Copies fonts from the `mobile-assets` package to `fonts` directory to be available to preview-head.html
      from: '../../../node_modules/@department-of-veterans-affairs/mobile-assets/fonts',
      to: 'fonts',
    },
  ],
  // Activates TS support in the Story Controls so all props display and use custom types instead of raw type defs
  typescript: { reactDocgen: 'react-docgen-typescript' },
  viteFinal: async (config) =>
    mergeConfig(config, {
      // Vite uses import.meta instead of process, but babel/node expects process.env
      define: { 
        'process.env': 'import.meta.env',
        'process.env.STORYBOOK_WEB': JSON.stringify(process.env.STORYBOOK_WEB || 'true')
      },
      plugins: [
        // Plugin to handle SVG icons as React components
        svgr({ include: '**/*.svg' }),
        // Plugin to enable require() in vite for hooks and stories
        vitePluginRequire(),
      ],
      resolve: { alias: { 'react-native': 'react-native-web' } },
    }),
}

export default config
