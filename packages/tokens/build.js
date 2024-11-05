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

/** Returns a new tokens array sorted alphabetically by token name */
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

/** Filter function to return tokens of category 'font', type from filter, and npm true */
const filterFont = (token, fontType) => {
  const { category, type, npm } = token.attributes

  return category === 'font' && type === fontType && npm === true
}

/**
 * Filters
 */

/** Remove tokens that do not have 'color' in the category */
StyleDictionary.registerFilter({
  name: 'filter/color/is-color',
  matcher: (token) => token.attributes.category.includes('color'),
})

/** Filter to tokens of category 'font', type 'family', and npm true */
StyleDictionary.registerFilter({
  name: 'filter/font/family-npm',
  matcher: (token) => filterFont(token, 'family'),
})

/** Filter to tokens of category 'font', type 'letter-spacing', and npm true */
StyleDictionary.registerFilter({
  name: 'filter/font/letter-spacing-npm',
  matcher: (token) => filterFont(token, 'letter-spacing'),
})

/** Filter to tokens of category 'font', type 'size', and npm true */
StyleDictionary.registerFilter({
  name: 'filter/font/size-npm',
  matcher: (token) => filterFont(token, 'size'),
})

/** Filter to tokens of category 'font', type 'line-height', and npm true */
StyleDictionary.registerFilter({
  name: 'filter/font/line-height-npm',
  matcher: (token) => filterFont(token, 'line-height'),
})

/** Filter to tokens of category 'font', type 'composite', and npm true */
StyleDictionary.registerFilter({
  name: 'filter/font/composite-npm',
  matcher: (token) => filterFont(token, 'composite'),
})

/** Remove tokens that do not have 'font' in the category and have figma attribute */
StyleDictionary.registerFilter({
  name: 'filter/font-figma',
  matcher: (token) =>
    token.attributes.category === 'font' && token.attributes.figma === true,
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

/** Custom format for basic named export of simple key:value token pairs */
StyleDictionary.registerFormat({
  name: 'javascript/es6/simple-key-value',
  formatter: function ({ dictionary, options }) {
    const tokens = dictionary.allProperties.reduce((result, token) => {
      result[token.name] = token.value
      return result
    }, {})

    const exportName = options.exportName

    if (options.noSort) {
      return `export const ${exportName} = ${JSON.stringify(tokens, null, 2)};`
    }

    return `export const ${exportName} = ${JSON.stringify(sortTokensByKey(tokens), null, 2)};`
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
    const files = ['colors', 'font', 'spacing', 'themes']
    let exports = ''
    for (const file of files) exports += `export { ${file} } from './${file}'\n`

    return exports
  },
})

/** Custom format to generate font/index.js with exports */
StyleDictionary.registerFormat({
  name: 'javascript/es6/fontIndex',
  formatter: function () {
    const files = [
      'family',
      'letterSpacing',
      'lineHeight',
      'size',
      'typography',
    ]
    let imports = '',
      exports = ''

    for (const file of files) imports += `import { ${file} } from './${file}'\n`
    exports += 'export const font = {\n'
    for (const file of files) exports += `${file},\n`

    return `${imports}\n${exports}}`
  },
})

/** Custom format to generate font/index.d.ts with exports */
StyleDictionary.registerFormat({
  name: 'typescript/es6-declarations/fontIndex',
  formatter: function () {
    const files = [
      'family',
      'letterSpacing',
      'lineHeight',
      'size',
      'typography',
    ]
    let imports = '',
      exports = ''

    for (const file of files) imports += `import { ${file} } from './${file}'\n`
    exports += 'export declare const font: {\n'
    for (const file of files) exports += `${file}: typeof ${file},\n`

    return `${imports}\n${exports}}`
  },
})

/** Formats basic key-value type declarations exports */
StyleDictionary.registerFormat({
  name: 'typescript/es6-declarations/simple-key-value',
  formatter: function ({ dictionary, options }) {
    const tokenTyping = options.tokenTyping || 'number'
    let tokens = dictionary.allTokens,
      declaration = '',
      globalValuesDoc = '/**\n',
      docLine = ' * '

    if (!options.noSort) {
      tokens = sortTokensByName(tokens)
    }

    if (options.noGlobalDoc) {
      globalValuesDoc = ''
    } else {
      // Add global values doc to the top of the file
      for (const token of tokens) {
        let tokenDoc = ''
        // Shorten token names:
        const shortName = token.name
          .replace('vads', '')
          .replace('FontFamily', '')
          .replace('FontLetterSpacing', '')
          .replace('FontLineHeight', '')
          .replace('FontSize', '')
          .replace('Space', '')

        tokenDoc = `${shortName}: \`${token.value}\``
        tokenDoc += token === tokens[tokens.length - 1] ? '' : ' | ' // Add | if not last token

        if (docLine.length + tokenDoc.length > 120) {
          globalValuesDoc += docLine + '\n'
          docLine = ' * '
        }
        docLine += tokenDoc
      }
      globalValuesDoc += docLine + '\n */\n'
    }

    declaration += `export declare const ${options.exportName}: {\n`
    for (const token of dictionary.allTokens) {
      declaration += `  /** Value: \`${token.value}\` */\n`
      declaration += `  ${token.name}: ${tokenTyping};\n`
    }
    declaration += '}'
    return globalValuesDoc + declaration
  },
})

/** Formats declarations exports for composite tokens */
StyleDictionary.registerFormat({
  name: 'typescript/es6-declarations/composite',
  formatter: function ({ dictionary, options }) {
    let tokens = dictionary.allTokens,
      declaration = `export declare const ${options.exportName}: {\n`

    if (!options.noSort) {
      tokens = sortTokensByName(tokens)
    }

    for (const token of tokens) {
      let docs = `/** `
      let valueKeys = '{\n'

      // Generate docs line and object of value types
      Object.keys(token.value).forEach((key, index) => {
        docs += `${index !== 0 ? '| ' : ''}${key}: ${token.value[key]} `
        valueKeys += `    ${key}: ${typeof token.value[key]}\n`
      })

      docs += `*/\n`
      declaration += `  ${docs}`
      declaration += `  ${token.name}: ${valueKeys}`
      declaration += `  }\n`
    }

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
      declaration += `  /** ${token.value} */\n`
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
    const files = ['colors', 'font', 'spacing', 'themes']
    let exports = ''
    for (const file of files) exports += `export * from './types/${file}'\n`

    return exports
  },
})

/** Registering format to generate JSON in Design Token Community Group format (https://tr.designtokens.org/format/) */
StyleDictionary.registerFormat({
  name: 'json/dtcg',
  formatter: function ({ dictionary, options }) {
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
      }

      switch (category) {
        case 'font':
          switch (type) {
            case 'family':
            case 'style':
              return 'string'
            case 'letter-spacing':
            case 'size':
            case 'line-height':
            case 'paragraph-spacing':
              return 'number'
            default:
              return ''
          }
        case 'spacing':
          return 'number'
        default:
          return ''
      }
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

    if (options.noSort) return JSON.stringify(tokens, undefined, 2) + `\n`

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

const StyleDictionaryExtended = StyleDictionary.extend(__dirname + '/config.js')

StyleDictionaryExtended.buildAllPlatforms()
