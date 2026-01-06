/* eslint-disable @typescript-eslint/no-var-requires */
const { getDefaultConfig } = require('expo/metro-config')
const path = require('path')

const withStorybook = require('@storybook/react-native/metro/withStorybook')
const { generate } = require('@storybook/react-native/scripts/generate')

// Generates storybook.requires, which is used to load all our stories and addons in our project.
generate({
  configPath: path.resolve(__dirname, './.rnstorybook'),
})

// Find the project and workspace directories
const projectRoot = __dirname
const workspaceRoot = path.resolve(projectRoot, '../..')

const defaultConfig = getDefaultConfig(projectRoot)

// Extend the default config with custom settings
const customConfig = {
  ...defaultConfig,
  watchFolders: [workspaceRoot],
  transformer: {
    ...defaultConfig.transformer,
    // Enables dynamic imports
    unstable_useRequireContext: true,
    // SVG Support
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    ...defaultConfig.resolver,
    // SVG Support
    assetExts: defaultConfig.resolver.assetExts.filter((ext) => ext !== 'svg'),
    sourceExts: [...defaultConfig.resolver.sourceExts, 'svg'],
    // Let Metro know where to resolve packages and in what order
    nodeModulesPaths: [
      path.resolve(projectRoot, 'node_modules'),
      path.resolve(workspaceRoot, 'node_modules'),
    ],
  },
}

module.exports = withStorybook(customConfig)
