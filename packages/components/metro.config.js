/* eslint-disable @typescript-eslint/no-var-requires */
const { getDefaultConfig } = require('expo/metro-config')
const path = require('path')

const { generate } = require('@storybook/react-native/scripts/generate')

// Generates storybook.requires, which is used to load all our stories and addons in our project.
generate({
  configPath: path.resolve(__dirname, './.storybook/native'),
})

// Find the project and workspace directories
const projectRoot = __dirname
// This can be replaced with `find-yarn-workspace-root`
const workspaceRoot = path.resolve(projectRoot, '../..')

module.exports = (() => {
  const config = getDefaultConfig(__dirname)

  const { transformer, resolver } = config

  config.watchFolders = [workspaceRoot]

  config.transformer = {
    ...transformer,
    // Enables dynamic imports
    unstable_useRequireContext: true,
    // SVG Support
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  }
  config.resolver = {
    ...resolver,
    // SVG Support
    assetExts: resolver.assetExts.filter((ext) => ext !== 'svg'),
    sourceExts: [...resolver.sourceExts, 'svg'],
    // Let Metro know where to resolve packages and in what order
    nodeModulesPaths: [
      path.resolve(projectRoot, 'node_modules'),
      path.resolve(workspaceRoot, 'node_modules'),
    ],
    // Force Metro to resolve (sub)dependencies only from the `nodeModulesPaths`
    disableHierarchicalLookup: true,
    // Fix due to breaking change with RN 0.79 (see https://github.com/expo/expo/discussions/36551)
    unstable_enablePackageExports: false,
  }

  return config
})()
