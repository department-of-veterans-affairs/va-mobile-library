module.exports = {
  stories: [
    '../../src/components/**/*.stories.mdx',
    '../../src/components/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-ondevice-controls',
    '@storybook/addon-ondevice-actions',
  ],
}
