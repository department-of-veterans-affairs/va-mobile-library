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
// This can be replaced with `find-yarn-workspace-root`
// const workspaceRoot = path.resolve(projectRoot, '../..')

const defaultConfig = getDefaultConfig(projectRoot)

module.exports = withStorybook(defaultConfig)

// module.exports = (() => {
//   const config = getDefaultConfig(__dirname)

//   const { transformer, resolver } = config

//   config.watchFolders = [workspaceRoot]

//   config.transformer = {
//     ...transformer,
//     // Enables dynamic imports
//     unstable_useRequireContext: true,
//     // SVG Support
//     babelTransformerPath: require.resolve('react-native-svg-transformer'),
//   }
//   config.resolver = {
//     ...resolver,
//     // SVG Support
//     assetExts: resolver.assetExts.filter((ext) => ext !== 'svg'),
//     sourceExts: [...resolver.sourceExts, 'svg'],
//     // Let Metro know where to resolve packages and in what order
//     nodeModulesPaths: [
//       path.resolve(projectRoot, 'node_modules'),
//       path.resolve(workspaceRoot, 'node_modules'),
//     ],
//     // Force Metro to resolve (sub)dependencies only from the `nodeModulesPaths`
//     disableHierarchicalLookup: true,
//   }

//   return config
// })()
