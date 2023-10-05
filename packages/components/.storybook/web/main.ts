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
  ],
  core: {
    builder: 'webpack5',
  },
  framework: '@storybook/react',
  staticDirs: ['../../src/assets'],
}
