/* eslint-disable @typescript-eslint/no-var-requires */
const tokenCategories = require('./src/tokens')

module.exports = {
  source: [
    '../../node_modules/@department-of-veterans-affairs/css-library/dist/tokens/json/variables.json',
  ],
  platforms: {
    rn: {
      transformGroup: 'react-native',
      buildPath: './dist/',
      prefix: '',
      files: [
        {
          destination: 'js/index.js',
          format: 'javascript/es6/vads-colors',
          filter: 'isColor',
        },
        {
          destination: 'index.d.ts',
          format: 'typescript/es6-declarations/colors',
          filter: 'isColor',
        },
      ],
    },
    figma: {
      transformGroup: 'figma',
      buildPath: './figma/',
      files: tokenCategories.map((tokenCategory) => ({
        destination: `${tokenCategory}.json`,
        format: 'json/dtcg',
        filter: 'isColor',
      })),
    },
  },
}
