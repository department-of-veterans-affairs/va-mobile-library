/* eslint-disable @typescript-eslint/no-var-requires */
const tokenCategories = require('./src/tokens')
const StyleDictionary = require('style-dictionary')

StyleDictionary.registerFilter({
  name: 'isColor',
  matcher: function (token) {
    return token.attributes.category.includes('color')
  },
})

StyleDictionary.registerFormat({
  name: 'javascript/es6/vads-colors',
  formatter: function (dictionary) {
    console.log(`dictionary`, dictionary)
    const colorTokens = dictionary.allProperties.reduce((result, token) => {
      result[
        token.name
          .replace('color', '')
          .replace('SystemColor', '')
          .replace('uswds', 'Uswds')
      ] = token.value
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
  ],
  platforms: {
    rn: {
      transformGroup: 'react-native',
      buildPath: './dist/',
      prefix: '',
      files: [
        // {
        //   destination: 'js/tokens.js',
        //   format: 'javascript/es6',
        // },
        {
          destination: 'js/index.js',
          format: 'javascript/es6/vads-colors',
          filter: 'isColor',
        },
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
