// Adapted from https://gist.github.com/mhmdnsr/18343cceb12858c8b148ef31d1e5a32b

import * as fs from 'fs'
import { parse } from 'svg-parser'
import { toHtml } from 'hast-util-to-html'

fs.readFile(
  '../../node_modules/@department-of-veterans-affairs/component-library/dist/img/sprite.svg',
  'utf8',
  function (err, contents) {
    const parsed = parse(contents)
    const symbols = parsed.children[0].children
    let length = 0
    symbols.forEach((symbol) => {
      const name = symbol.properties.id
      symbol.tagName = 'svg'
      let newIcon = toHtml(symbol)
      fs.writeFile(`icons/vads/${name}.svg`, newIcon, () => {
        console.log(name)
        length += 1
      })
      console.log(length, ' icons extracted')
    })
  },
)
