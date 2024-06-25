// eslint-disable-next-line @typescript-eslint/no-var-requires
const StyleDictionary = require('style-dictionary')

/**
 * Filters
 */

/** Remove tokens that do not have 'color' in the category */
StyleDictionary.registerFilter({
  name: 'filter/color/is-color',
  matcher: (token) => token.attributes.category.includes('color'),
})

/** Remove tokens that have the dark mode (OnDark/-on-dark) suffix */
StyleDictionary.registerFilter({
  name: 'filter/color/light-mode',
  matcher: (token) =>
    token.attributes.category.includes('color') &&
    !token.name.includes('OnDark') &&
    !token.name.includes('-on-dark'),
})

/** Remove tokens that have the light mode (OnLight/-on-light) suffix */
StyleDictionary.registerFilter({
  name: 'filter/color/dark-mode',
  matcher: (token) =>
    token.attributes.category.includes('color') &&
    !token.name.includes('OnLight') &&
    !token.name.includes('-on-light'),
})

/**
 * Formats
 */

/** Custom format for colors. Exports color tokens as single object */
StyleDictionary.registerFormat({
  name: 'javascript/es6/vads-colors',
  formatter: function (dictionary) {
    const colorTokens = dictionary.allProperties.reduce((result, token) => {
      result[token.name] = token.value
      return result
    }, {})

    return `export const Colors = ${JSON.stringify(sortTokensByKey(colorTokens), null, 2)};`
  },
})

// /** Custom format for themes. Exports color tokens as single object */
// StyleDictionary.registerFormat({
//   name: 'javascript/es6/vads-colors-theme',
//   formatter: function (dictionary) {
//     const colorTokens = dictionary.allProperties.reduce((result, token) => {
//       result[stripMode(token.name)] = token.value
//       return result
//     }, {})

//     return `export const Theme = ${JSON.stringify(sortTokensByKey(colorTokens), null, 2)};`
//   },
// })

/** Custom format for themes. Exports color tokens as single object */
StyleDictionary.registerFormat({
  name: 'javascript/es6/vads-colors-themes',
  formatter: function (dictionary) {
    const light = dictionary.allProperties
      .filter(
        (token) =>
          token.attributes.category.includes('color') &&
          !token.name.includes('OnDark') &&
          !token.name.includes('-on-dark'),
      )
      .reduce((result, token) => {
        result[stripMode(token.name)] = token.value
        return result
      }, {})

    const dark = dictionary.allProperties
      .filter(
        (token) =>
          token.attributes.category.includes('color') &&
          !token.name.includes('OnLight') &&
          !token.name.includes('-on-light'),
      )
      .reduce((result, token) => {
        result[stripMode(token.name)] = token.value
        return result
      }, {})

    return `export const themes = {
  light: ${JSON.stringify(sortTokensByKey(light), null, 4)},
  dark: ${JSON.stringify(sortTokensByKey(dark), null, 4)}
    }`
  },
})

/** Custom format to generate index js with exports */
StyleDictionary.registerFormat({
  name: 'javascript/es6/vads-module-export',
  formatter: function () {
    return `export { Colors } from './colors'
export { themes } from './themes'
`
  },
})

/** Creates named type declaration for Colors. Allows for TypeScript autocomplete */
StyleDictionary.registerFormat({
  name: 'typescript/es6-declarations/colors',
  formatter: function (dictionary) {
    let declaration = 'export declare const Colors: {\n'
    dictionary.allProperties.forEach((token) => {
      declaration += `  ${token.name}: string;\n`
    })

    declaration += `}`
    return declaration
  },
})

/** Creates named type declaration for Themes. Allows for TypeScript autocomplete */
StyleDictionary.registerFormat({
  name: 'typescript/es6-declarations/theme',
  formatter: function (dictionary) {
    let declaration = 'export declare type Theme = {\n'
    dictionary.allProperties.forEach((token) => {
      declaration += `  ${stripMode(token.name)}: string;\n`
    })

    declaration += `}

export declare const themes: {
  light: Theme;
  dark: Theme;
}`

    return declaration
  },
})

/** Custom format to generate index.d.ts with exports */
StyleDictionary.registerFormat({
  name: 'typescript/es6-declarations/module',
  formatter: function () {
    return `
export * from './types/theme'
export * from './types/colors'`
  },
})

/** Registering format to generate JSON in Design Token Community Group format (https://tr.designtokens.org/format/) */
StyleDictionary.registerFormat({
  name: 'json/dtcg',
  formatter: function ({ dictionary }) {
    // Returns proper  value for dtcg aliasing
    const getValue = (value) => {
      if (value.startsWith('{') && value.includes('.')) {
        return `${value.split('.')[0]}}`
      }

      return value
    }

    // Infers type from attributes. VADS does not consistently populate the type field properly
    const getType = (attributes) => {
      const { category, type } = attributes

      if (category.includes('color')) {
        return 'color'
      } else if (category === 'units') {
        return 'dimension'
      } else if (category === 'font' && type === 'family') {
        return 'fontFamily'
      } else if (category === 'font' && type === 'weight') {
        return 'fontWeight'
      } else if (category === 'font' && type === 'size') {
        return 'dimension'
      }

      return ''
    }

    // Format tokens for dtcg
    const tokens = dictionary.allTokens.reduce(
      (previousTokens, token) => ({
        ...previousTokens,
        [token.name]: {
          $value: getValue(token.original.value),
          $type: getType(token.attributes),
        },
      }),
      {},
    )

    return JSON.stringify(sortTokensByKey(tokens), undefined, 2) + `\n`
  },
})

/**
 * Transform Groups
 */

/** Registering transform group to massage output as desired for figma */
StyleDictionary.registerTransformGroup({
  name: 'rn',
  transforms: ['name/cti/camel', 'color/hex'],
})

/** Registering transform group to massage output as desired for figma */
StyleDictionary.registerTransformGroup({
  name: 'figma',
  transforms: ['name/cti/kebab', 'color/hex'],
})

/**
 * Utils
 */

const sortTokensByKey = (obj) => {
  const sortedKeys = Object.keys(obj).sort()
  const sortedObj = {}
  sortedKeys.forEach((key) => {
    sortedObj[key] = obj[key]
  })

  return sortedObj
}

const stripMode = (name) => name.replace('OnDark', '').replace('OnLight', '')

const StyleDictionaryExtended = StyleDictionary.extend(__dirname + '/config.js')

StyleDictionaryExtended.buildAllPlatforms()
