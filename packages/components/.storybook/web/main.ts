module.exports = {
  stories: [
    '../../src/components/**/*.stories.mdx',
    '../../src/components/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    {
      name: '@storybook/addon-essentials',
      options: {
        backgrounds: false,
      },
    },
    '@storybook/addon-react-native-web',
    'storybook-addon-designs',
    'storybook-dark-mode',
  ],
  core: {
    builder: 'webpack5',
  },
  framework: '@storybook/react',
  staticDirs: ['../../src/assets'],
}
