/* eslint-disable @typescript-eslint/no-var-requires */
const { getDefaultConfig } = require('expo/metro-config')
const path = require('path')

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
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  }
  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter((ext) => ext !== 'svg'),
    sourceExts: [...resolver.sourceExts, 'svg'],
    // Let Metro know where to resolve packages and in what order
    nodeModulesPaths: [
      path.resolve(projectRoot, 'node_modules'),
      path.resolve(workspaceRoot, 'node_modules'),
    ],
    // Force Metro to resolve (sub)dependencies only from the `nodeModulesPaths`
    disableHierarchicalLookup: true,
  }

  console.log(config.resolver.resolverMainFields)

  return config
})()
// // Find the project and workspace directories
// const projectRoot = __dirname
// // This can be replaced with `find-yarn-workspace-root`
// const workspaceRoot = path.resolve(projectRoot, '../..')

// module.exports = (() => {
//   const {
//     resolver: { sourceExts, assetExts, resolverMainFields },
//   } = getDefaultConfig(__dirname)

//   const config = {
//     // Watch all files within the monorepo
//     watchFolders: [workspaceRoot],
//     // SVG support
//     transformer: {
//       babelTransformerPath: require.resolve('react-native-svg-transformer'),
//       unstable_allowRequireContext: true,
//     },
//     resolver: {
//       // SVG support
//       assetExts: assetExts.filter((ext) => ext !== 'svg'),
//       sourceExts: [...sourceExts, 'svg'],
//       // Let Metro know where to resolve packages and in what order
//       nodeModulesPaths: [
//         path.resolve(projectRoot, 'node_modules'),
//         path.resolve(workspaceRoot, 'node_modules'),
//       ],
//       // Force Metro to resolve (sub)dependencies only from the `nodeModulesPaths`
//       disableHierarchicalLookup: true,
//       resolverMainFields: ['react-native', ...resolverMainFields],
//     },
//   }

//   console.log(config)

//   return config
// })()
