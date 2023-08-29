let main
try {
  main = require('./App.tsx')
} catch {
  main = require('./wrapper.tsx')
}
module.exports = main
