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
    watchFolders: [workspaceRoot],
    transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
      assetExts: assetExts.filter((ext) => ext !== 'svg'),
      sourceExts: [...sourceExts, 'svg'],
      nodeModulesPaths: [
        path.resolve(projectRoot, 'node_modules'),
        path.resolve(workspaceRoot, 'node_modules'),
      ],
      disableHierarchicalLookup: true,
      resolverMainFields: ['sbmodern', 'react-native', ...resolverMainFields],
    },
  }
})()
