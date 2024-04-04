// eslint-disable-next-line @typescript-eslint/no-var-requires
const StyleDictionary = require('style-dictionary')

/** Remove tokens that have the dark mode (OnDark) suffix */
StyleDictionary.registerFilter({
  name: 'notDarkMode',
  matcher: (token) =>
    token.attributes.category.includes('color') &&
    !token.name.includes('OnDark'),
})

/** Remove tokens that have the light mode (OnLight) suffix */
StyleDictionary.registerFilter({
  name: 'notLightMode',
  matcher: (token) =>
    token.attributes.category.includes('color') &&
    !token.name.includes('OnLight'),
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
    const tokens = dictionary.allTokens.reduce(
      (previousTokens, token) => ({
        ...previousTokens,
        [token.name]: {
          $value: token.value,
          $type:
            token.path[0] && token.path[0].includes('color') ? 'color' : '', // path[0] is top level token type (e.g. 'color'), should meet: https://tr.designtokens.org/format/#types
        },
      }),
      {},
    )

    const sorted = Object.keys(tokens)
      .sort()
      .reduce((obj, key) => {
        obj[key] = tokens[key]
        return obj
      }, {})

    return JSON.stringify(sorted, undefined, 2) + `\n`
  },
})

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
