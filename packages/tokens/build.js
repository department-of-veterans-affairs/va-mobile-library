// eslint-disable-next-line @typescript-eslint/no-var-requires
const StyleDictionary = require('style-dictionary')

/**
 * Creates a JSON flat file of the style dictionary.
 *
 * @memberof Formats
 * @kind member
 * @example
 * ```json
 * {
 *   "color-base-red": "#ff0000"
 * }
 * ```
 */
// 'json/flat': function({dictionary}) {
//   return '{\n' + dictionary.allTokens.map(function(token) {
//       return `  "${token.name}": ${JSON.stringify(token.value)}`;
//   }).join(',\n') + '\n}' + '\n';
// },

console.log(StyleDictionary.transformGroup['group_name'])
StyleDictionary.registerTransformGroup({
  name: 'figma',
  transforms: ['name/ti/camel', 'color/hex'],
})

/** Function to generate JSON into Design Token Community Group format (https://tr.designtokens.org/format/) */
StyleDictionary.registerFormat({
  name: 'json/dtcg',
  // type: 'value',
  // matcher: function(token) {
  //     // this is an example of a possible filter (based on the "cti" values) to show how a "matcher" works
  //     return token.attributes.category === 'font' || token.attributes.category === 'margin';
  // },
  // console.log(dictionary.allTokens)
  // const tokensObject = dictionary.allTokens.map(function (token) {
  //   const tokenValue = {
  //     $value: token.value,
  //     $type: token.path[0],
  //   }
  //   return `"${token.name}": ${JSON.stringify(tokenValue, undefined, 4)}`
  // })
  // console.log(JSON.stringify(tokensObject))
  // return `{\n  ${tokensObject.toString()} \n}\n`
  // return (
  //   '{\n' +
  //   dictionary.allTokens
  //     .map(function (token) {
  //       const tokenValue = {
  //         $value: token.value,
  //         $type: token.path[0],
  //       }
  //       // console.log(tokenValue)
  //       return `  "${token.name}": ${JSON.stringify(tokenValue, undefined, 4)}`
  //     })
  //     .join(',\n') +
  //   '\n}' +
  //   '\n'
  // )
  formatter: function ({ dictionary }) {
    const testObject = {
      blue: {
        $value: 'blu',
        $type: 'color',
      },
      red: {
        $value: 'red',
        $type: 'color',
      },
      white: {
        $value: 'white',
        $type: 'color',
      },
    }

    // const tokensArray = dictionary.allTokens.map(function (token) {
    //   const tokenArrayVal = {
    //     $value: token.value,
    //     $type: token.path[0],
    //   }
    //   return {
    //     $value: token.value,
    //     $type: token.path[0],
    //   }
    // })

    const tokensObject = dictionary.allTokens.reduce(
      (previousTokens, token) => ({
        ...previousTokens,
        [token.name]: {
          $value: token.value,
          $type: token.path[0], // path[0] is top level token type (e.g. 'color')
        },
      }),
      {},
    )

    // console.log(dictionary.allTokens)
    // console.log(JSON.stringify(testObject, undefined, 2))
    // console.log(JSON.stringify(tokensObject, undefined, 2))
    return JSON.stringify(tokensObject, undefined, 2) + `\n`
    // return (
    //   '{\n' +
    //   dictionary.allTokens
    //     .map(function (token) {
    //       return `  "${token.name}": {\n    "$value": ${JSON.stringify(
    //         token.value,
    //       )},\n    "$type": ${JSON.stringify(token.path[0])}\n  }`
    //     })
    //     .join(',\n') +
    //   '\n}' +
    //   '\n'
    // )
  },
})

// Works perf but messy:
// return (
//   '{\n' +
//   dictionary.allTokens
//     .map(function (token) {
//       return `  "${token.name}": {\n    "$value": ${JSON.stringify(
//         token.value,
//       )},\n    "$type": ${JSON.stringify(token.path[0])}\n  }`
//     })
//     .join(',\n') +
//   '\n}' +
//   '\n'
// )

const StyleDictionaryExtended = StyleDictionary.extend(
  __dirname + '/config.js',
)

StyleDictionaryExtended.buildAllPlatforms()
