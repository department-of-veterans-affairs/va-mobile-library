/* eslint-disable @typescript-eslint/no-var-requires */
const tokenCategories = require('./src/tokens')
const StyleDictionary = require('style-dictionary')

StyleDictionary.registerFormat({
  name: 'javascript/es6/vads-colors',
  formatter: function (dictionary) {
    console.log(`dictionary`, dictionary)
    const colorTokens = dictionary.allProperties
      .filter((token) => token.attributes.category === 'color')
      .reduce((result, token) => {
        result[token.name.replace('color', '')] = token.value
        return result
      }, {})

    return `export const Colors = ${JSON.stringify(colorTokens, null, 2)};`
  },
})

StyleDictionary.registerFormat({
  name: 'typescript/es6-declarations/colors',
  formatter: function () {
    return `export declare const Colors: { [key: string]: string };`
  },
})

module.exports = {
  source: [
    '../../node_modules/@department-of-veterans-affairs/css-library/dist/tokens/json/variables.json',
    // 'src/uswds/*.json',
  ],
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
          destination: 'js/index.js',
          format: 'javascript/es6/vads-colors',
        },
        // {
        //   format: 'typescript/es6-declarations',
        //   destination: 'index.d.ts',
        // },
        {
          destination: 'index.d.ts',
          format: 'typescript/es6-declarations/colors',
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
