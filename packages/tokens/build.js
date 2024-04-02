// eslint-disable-next-line @typescript-eslint/no-var-requires
const StyleDictionary = require('style-dictionary')

/**
 * Custom filter to include only tokens with the 'color' category and
 * exclude uswds primitives from variables.json to avoid collisions since these
 * colors are defined twice in variables.json
 */
StyleDictionary.registerFilter({
  name: 'isUniqueColor',
  matcher: (token) => token.attributes.category.includes('color'),
})

StyleDictionary.registerFilter({
  name: 'notDarkMode',
  matcher: (token) =>
    token.attributes.category.includes('color') &&
    !token.name.includes('OnDark'),
})

StyleDictionary.registerFilter({
  name: 'notLightMode',
  matcher: (token) =>
    token.attributes.category.includes('color') &&
    !token.name.includes('OnLight'),
})

StyleDictionary.registerFilter({
  name: 'isUniqueColor',
  matcher: (token) =>
    token.attributes.category.includes('color') &&
    token.filePath !== 'tokens/uswds.json',
})

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
    const tokensObject = dictionary.allTokens.reduce(
      (previousTokens, token) => ({
        ...previousTokens,
        [token.name]: {
          $value: token.value,
          $type: token.path[0], // path[0] is top level token type (e.g. 'color'), should meet: https://tr.designtokens.org/format/#types
        },
      }),
      {},
    )

    return JSON.stringify(tokensObject, undefined, 2) + `\n`
  },
})

/** Registering a transform that strips out category from token name */
StyleDictionary.registerTransform({
  name: 'name/color/clean-up',
  type: 'name',
  transformer: (token) => {
    return token.name
      .replace('Color', '')
      .replace('color', '')
      .replace('System', '')
      .replace('vads', '')
  },
})

/** Registering transform group to massage output as desired for figma */
StyleDictionary.registerTransformGroup({
  name: 'rn',
  transforms: ['name/cti/camel', 'name/color/clean-up', 'color/css'],
})

/** Registering transform group to massage output as desired for figma */
StyleDictionary.registerTransformGroup({
  name: 'figma',
  transforms: ['name/cti/camel', 'name/color/clean-up', 'color/hex'],
})

const StyleDictionaryExtended = StyleDictionary.extend(__dirname + '/config.js')

StyleDictionaryExtended.buildAllPlatforms()
