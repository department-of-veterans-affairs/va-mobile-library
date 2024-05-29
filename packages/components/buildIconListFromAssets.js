/**
 * A script to perform the following:
 *   1. Read icons from department-of-veterans-affairs/mobile-assets package 'icons' folder
 *   2. Process the icons into UpperCamelCase and arrange data for writing
 *   3. Output the results as src/components/Icon/iconList.ts file that is pulled into Icon.tsx
 */

// eslint-disable-next-line
const fs = require('fs')

const importLocation = '@department-of-veterans-affairs/mobile-assets/icons'

const importArray = []
let iconMap = []
// const icons = {}

/**
 * Function to massage SVG file name to an UpperCamelCase icon name
 * @param name - String of SVG file name
 * @returns UpperCamelCase icon name
 */
function parseName(name) {
  if (name === 'vads') return '' // Remove 'vads' from list; it is a folder, not file
  if (name.startsWith('vads/')) name = name.replace('vads/', '') // Remove 'vads/' folder prefix
  // Convert name to UpperCamelCase
  name =
    name.charAt(0).toUpperCase() +
    name.substring(1).replace(/_./g, (letter) => letter[1].toUpperCase())
  name = name.replace('.svg', '') // Remove file type

  return name
}

/**
 * Function to build the content of the output file
 */
function formIconListFile() {
  if (importArray.length === 0 || iconMap.length === 0)
    throw Error('importArray or iconMap missing')

  let fileContent = ''

  // Set file header
  fileContent +=
    '/** This file is automatically generated by `yarn buildIcons` */ \n\n'

  // Build named import list
  importArray.forEach((importItem) => {
    fileContent += `${importItem}\n`
  })

  // Build IconMap object
  fileContent += '\nexport const IconMap = {\n'
  iconMap.forEach((iconName) => {
    fileContent += `  ${iconName},\n`
  })
  fileContent += '}\n'

  return fileContent
}

/** Begin script */

// Retrieve icon files from assets package
const icons = fs.readdirSync('../../node_modules/' + importLocation, {
  recursive: true,
})

// Process icons list into requisite icon data
for (const icon of icons) {
  const iconName = parseName(icon)
  const importPath = `${importLocation}/${icon}`

  if (!iconName) continue

  // TODO: Move import/from text to writing the file once icons do not contain duplicates
  importArray.push(`import ${iconName} from '${importPath}'`)
  iconMap.push(iconName)
}

// Sort icon data
importArray.sort()
iconMap.sort()
// TODO: Remove below once the icons are cleaned up to not have duplicates
// Remove duplicates from iconMap array (https://stackoverflow.com/a/9229821/13261302)
iconMap = [...new Set(iconMap)]

// Form file content and create iconList.ts
fs.writeFile(
  './src/components/Icon/iconList.ts',
  formIconListFile(),
  (error) => {
    if (error) return console.log('writeFile error: ', error)
    return console.log('Successfully created iconList.ts!')
  },
)
