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

/** Registering format to generate JSON in Design Token Community Group format (https://tr.designtokens.org/format/) */
StyleDictionary.registerFormat({
  name: 'json/dtcg',
  formatter: function ({ dictionary }) {
    const getValue = (value) => {
      // Return proper  value for dtcg aliasing
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

const StyleDictionaryExtended = StyleDictionary.extend(__dirname + '/config.js')

StyleDictionaryExtended.buildAllPlatforms()
