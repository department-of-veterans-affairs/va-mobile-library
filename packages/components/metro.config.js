/* eslint-disable @typescript-eslint/no-var-requires */
const { getDefaultConfig } = require('metro-config')
const path = require('path')

// Find the project and workspace directories
const projectRoot = __dirname
// This can be replaced with `find-yarn-workspace-root`
const workspaceRoot = path.resolve(projectRoot, '../..')

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts, resolverMainFields },
  } = await getDefaultConfig()

  return {
    // Watch all files within the monorepo
    watchFolders: [workspaceRoot],
    // SVG support
    transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
      unstable_allowRequireContext: true,
    },
    resolver: {
      // SVG support
      assetExts: assetExts.filter((ext) => ext !== 'svg'),
      sourceExts: [...sourceExts, 'svg'],
      // Let Metro know where to resolve packages and in what order
      nodeModulesPaths: [
        path.resolve(projectRoot, 'node_modules'),
        path.resolve(workspaceRoot, 'node_modules'),
      ],
      // Force Metro to resolve (sub)dependencies only from the `nodeModulesPaths`
      disableHierarchicalLookup: true,
      resolverMainFields: ['react-native', ...resolverMainFields],
    },
  }
})()
