// eslint-disable-next-line @typescript-eslint/no-var-requires
const StyleDictionary = require('style-dictionary')

/**
 * Removes unneeded prefixes from tokens and applies PascalCase to USWDS colors
 * @param name - name of token being passed
 * @returns name stripped of unneeded prefixes and formatted in camel case
 */
const formatColorTokenName = (name) => {
  return name
    .replace('color', '')
    .replace('SystemColor', '')
    .replace('uswds', 'Uswds')
}

/** Custom filter to include only tokens with the 'color' category */
StyleDictionary.registerFilter({
  name: 'isColor',
  matcher: function (token) {
    return token.attributes.category.includes('color')
  },
})

/** Custom format for colors. Exports color tokens as single object */
StyleDictionary.registerFormat({
  name: 'javascript/es6/vads-colors',
  formatter: function (dictionary) {
    const colorTokens = dictionary.allProperties.reduce((result, token) => {
      result[formatColorTokenName(token.name)] = token.value
      return result
    }, {})

    return `export const Colors = ${JSON.stringify(colorTokens, null, 2)};`
  },
})

/** Creates named type declaration for Colors. Allows for TypeScript autocomplete */
StyleDictionary.registerFormat({
  name: 'typescript/es6-declarations/colors',
  formatter: function (dictionary) {
    let declaration = 'export declare const Colors: { [key: string]: string;\n'
    dictionary.allProperties.forEach((token) => {
      declaration += `  ${formatColorTokenName(token.name)}: string;\n`
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

/** Registering transform group to massage output as desired for figma */
StyleDictionary.registerTransformGroup({
  name: 'figma',
  transforms: ['name/ti/camel', 'color/hex'],
})

const StyleDictionaryExtended = StyleDictionary.extend(__dirname + '/config.js')

StyleDictionaryExtended.buildAllPlatforms()
