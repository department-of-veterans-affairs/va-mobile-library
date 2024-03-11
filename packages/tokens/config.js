/* eslint-disable @typescript-eslint/no-var-requires */
const tokenCategories = require('./src/tokens')

module.exports = {
  source: [
    '../../node_modules/@department-of-veterans-affairs/css-library/dist/tokens/json/variables.json',
    'src/tokens/color/uswds.json',
    'src/tokens/color/semantic.json',
  ],
  platforms: {
    rn: {
      transformGroup: 'rn',
      buildPath: './dist/',
      prefix: '',
      files: [
        {
          destination: 'js/index.js',
          format: 'javascript/es6/vads-colors',
          filter: 'isUniqueColor',
        },
        {
          destination: 'index.d.ts',
          format: 'typescript/es6-declarations/colors',
          filter: 'isUniqueColor',
        },
      ],
    },
    figma: {
      transformGroup: 'figma',
      buildPath: './figma/',
      files: tokenCategories.map((tokenCategory) => ({
        destination: `${tokenCategory}.json`,
        format: 'json',
        filter: 'isUniqueColor',
      })),
    },
  },
}
