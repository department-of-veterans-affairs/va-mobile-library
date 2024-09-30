// eslint-disable-next-line @typescript-eslint/no-var-requires
const StyleDictionary = require('style-dictionary')

/**
 * Utils
 */

/** Returns a new tokens object sorted alphabetically by key */
const sortTokensByKey = (obj) => {
  const sortedKeys = Object.keys(obj).sort()
  const sortedObj = {}
  sortedKeys.forEach((key) => {
    sortedObj[key] = obj[key]
  })

  return sortedObj
}

/** Returns a new tokens array sorted alphabetically by key */
const sortTokensByName = (tokens) =>
  tokens.sort((a, b) => {
    return a.name.localeCompare(b.name)
  })

/** Reusable filter function that returns only non-dark-mode tokens */
const filterLight = (token) =>
  token.attributes.category.includes('color') &&
  !token.name.includes('OnDark') &&
  !token.name.includes('-on-dark')

/** Reusable filter function that returns only non-light-mode tokens */
const filterDark = (token) =>
  token.attributes.category.includes('color') &&
  !token.name.includes('OnLight') &&
  !token.name.includes('-on-light')

/** Removes OnDark and OnLight mode suffixes for themes */
const stripMode = (name) => name.replace('OnDark', '').replace('OnLight', '')

/** Reusable reducer function that creates tokens with the mode removed from their name */
const stripModeReducer = (result, token) => {
  result[stripMode(token.name)] = token.value
  return result
}

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
  matcher: filterLight,
})

/** Remove tokens that have the light mode (OnLight/-on-light) suffix */
StyleDictionary.registerFilter({
  name: 'filter/color/dark-mode',
  matcher: filterDark,
})

/** Remove tokens that do not have 'spacing' in the category */
StyleDictionary.registerFilter({
  name: 'filter/spacing/is-spacing',
  matcher: (token) => token.attributes.category.includes('spacing'),
})

/**
 * Formats
 */

/** Custom format for colors. Exports all color tokens as single object */
StyleDictionary.registerFormat({
  name: 'javascript/es6/vads-colors',
  formatter: function (dictionary) {
    const colorTokens = dictionary.allProperties.reduce((result, token) => {
      result[token.name] = token.value
      return result
    }, {})

    return `export const colors = ${JSON.stringify(sortTokensByKey(colorTokens), null, 2)};`
  },
})

/** Custom format for themes. Filters light and dark mode themes into properties
 *  and exports them as a single themes object */
StyleDictionary.registerFormat({
  name: 'javascript/es6/vads-colors-themes',
  formatter: function (dictionary) {
    const light = dictionary.allProperties
      .filter(filterLight)
      .reduce(stripModeReducer, {})

    const dark = dictionary.allProperties
      .filter(filterDark)
      .reduce(stripModeReducer, {})

    return (
      'export const themes = {\n' +
      `  light: ${JSON.stringify(sortTokensByKey(light), null, 4)},\n` +
      `  dark: ${JSON.stringify(sortTokensByKey(dark), null, 4)}\n` +
      '}'
    )
  },
})

/** Custom format to generate index js with exports */
StyleDictionary.registerFormat({
  name: 'javascript/es6/vads-module-export',
  formatter: function () {
    return (
      "export { colors } from './colors'\n" +
      "export { themes } from './themes'\n" +
      "export { spacing } from './spacing'"
    )
  },
})

/** Creates named type declaration for colors. Allows for TypeScript autocomplete */
StyleDictionary.registerFormat({
  name: 'typescript/es6-declarations/colors',
  formatter: function (dictionary) {
    const sortedTokens = sortTokensByName(dictionary.allTokens)
    let declaration = 'export declare const colors: {\n'
    sortedTokens.forEach((token) => {
      declaration += `  /** #${token.value} */\n`
      declaration += `  ${token.name}: string;\n`
    })
    declaration += '}'
    return declaration
  },
})

/** Creates named type declaration for spacing. Allows for TypeScript autocomplete */
StyleDictionary.registerFormat({
  name: 'typescript/es6-declarations/spacing',
  formatter: function (dictionary) {
    let declaration = 'export declare const spacing: {\n'
    dictionary.allProperties.forEach((token) => {
      declaration += `  /** Value: ${token.value} */\n`
      declaration += `  ${token.name}: number;\n`
    })
    declaration += '}'
    return declaration
  },
})

/** Creates named type declaration for Themes. Allows for TypeScript autocomplete */
StyleDictionary.registerFormat({
  name: 'typescript/es6-declarations/theme',
  formatter: function (dictionary) {
    const sortedTokens = sortTokensByName(dictionary.allTokens)
    let declaration = 'export declare type Theme = {\n'
    sortedTokens.forEach((token) => {
      declaration += `  /** #${token.value} */\n`
      declaration += `  ${stripMode(token.name)}: string;\n`
    })
    declaration += '}\n\n'

    declaration +=
      'export declare const themes: {\n' +
      '  light: Theme;\n' +
      '  dark: Theme;\n' +
      '}'
    return declaration
  },
})

/** Custom format to generate index.d.ts with exports */
StyleDictionary.registerFormat({
  name: 'typescript/es6-declarations/module',
  formatter: function () {
    let declaration = "export * from './types/theme'\n"
    declaration += "export * from './types/colors'\n"
    declaration += "export * from './types/spacing'"

    return declaration
  },
})

/** Registering format to generate JSON in Design Token Community Group format (https://tr.designtokens.org/format/) */
StyleDictionary.registerFormat({
  name: 'json/dtcg',
  formatter: function ({ dictionary }) {
    // Returns proper color value for dtcg aliasing
    const getValue = (value) => {
      if (
        typeof value == 'string' &&
        value.startsWith('{') &&
        value.includes('.')
      ) {
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
      } else if (category === 'spacing') {
        return 'number'
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

    // Leave spacing tokens sorted by size
    if (dictionary.allTokens?.[0].attributes?.category === 'spacing') {
      return JSON.stringify(tokens, undefined, 2) + `\n`
    }

    return JSON.stringify(sortTokensByKey(tokens), undefined, 2) + `\n`
  },
})

/** Custom format for spacing. Exports all spacing tokens as single object */
StyleDictionary.registerFormat({
  name: 'javascript/es6/vads-spacing',
  formatter: function (dictionary) {
    const tokens = dictionary.allProperties.reduce((result, token) => {
      result[token.name] = token.value
      return result
    }, {})

    return `export const spacing = ${JSON.stringify(tokens, null, 2)};`
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

const StyleDictionaryExtended = StyleDictionary.extend(__dirname + '/config.js')

StyleDictionaryExtended.buildAllPlatforms()
