/* eslint-disable @typescript-eslint/no-var-requires */
const tokenCategories = require('./src/tokens')

module.exports = {
  source: ['src/tokens/**/*.json'],
  platforms: {
    rn: {
      transformGroup: 'react-native',
      buildPath: './dist/',
      prefix: '',
      files: [
        {
          destination: 'js/tokens.js',
          format: 'javascript/es6',
        },
        {
          format: 'typescript/es6-declarations',
          destination: 'index.d.ts',
        },
      ],
    },
    figma: {
      transformGroup: 'figma',
      buildPath: './figma/',
      files: tokenCategories.map((tokenCategory) => ({
        destination: `${tokenCategory}.json`,
        format: 'json/dtcg',
      })),
    },
  },
}
