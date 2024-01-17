const axios = require('axios')
const download = require('download')

const repo = 'uswds/uswds'
const dir = 'packages/uswds-tokens/colors'
const destinationFolder = 'uswds'

axios
  .get(`https://api.github.com/repos/${repo}/contents/${dir}`)
  .then((response) => {
    const files = response.data
    console.log(files)
    files.forEach((file) => {
      if (file.type === 'file') {
        const rawUrl = file.download_url
        download(rawUrl, destinationFolder)
          .then(() => {
            console.log(`Downloaded ${file.name}`)
          })
          .catch((err) => {
            console.error(`Error downloading ${file.name}:`, err)
          })
      }
    })
  })
  .catch((err) => {
    console.error('Error fetching directory:', err)
  })
