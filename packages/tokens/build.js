// eslint-disable-next-line @typescript-eslint/no-var-requires
const StyleDictionary = require('style-dictionary')

/**
 * Filters
 */

/** Remove tokens that have the dark mode (OnDark) suffix */
StyleDictionary.registerFilter({
  name: 'filter/color/light-mode',
  matcher: (token) =>
    token.attributes.category.includes('color') &&
    !token.name.includes('OnDark') &&
    !token.name.includes('-on-dark'),
})

/** Remove tokens that have the light mode (OnLight) suffix */
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

    return `export const Colors = ${JSON.stringify(colorTokens, null, 2)};`
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
    // Infers type from name. VADS does not use the type field properly so we need to
    // infer them from the name. Will need to adjust when they add type and spacing
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
          $value: token.original.value,
          $type: getType(token.attributes),
        },
      }),
      {},
    )

    // Sorts token alphabetically
    const sorted = Object.keys(tokens)
      .sort()
      .reduce((obj, key) => {
        obj[key] = tokens[key]
        return obj
      }, {})

    return JSON.stringify(sorted, undefined, 2) + `\n`
  },
})

/**
 * Transforms
 */

/** Registering a transform that strips out category from token name */
StyleDictionary.registerTransform({
  name: 'name/color/clean-up-camel',
  type: 'name',
  transformer: (token) => {
    return token.name
      .replace('Color', '')
      .replace('color', '')
      .replace('vads', '')
      .replace('uswds', 'Uswds')
  },
})

/** Registering a transform that strips out category from beginning of token name */
StyleDictionary.registerTransform({
  name: 'name/color/clean-up-kebab',
  type: 'name',
  transformer: (token) => {
    return token.name.replace(/^color-/, '')
  },
})

/**
 * Transform Groups
 */

/** Registering transform group to massage output as desired for figma */
StyleDictionary.registerTransformGroup({
  name: 'rn',
  transforms: ['name/cti/camel', 'name/color/clean-up-camel', 'color/hex'],
})

/** Registering transform group to massage output as desired for figma */
StyleDictionary.registerTransformGroup({
  name: 'figma',
  transforms: ['name/cti/kebab', 'name/color/clean-up-kebab', 'color/hex'],
})

const StyleDictionaryExtended = StyleDictionary.extend(__dirname + '/config.js')

StyleDictionaryExtended.buildAllPlatforms()
