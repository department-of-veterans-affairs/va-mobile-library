/**
 * Module to set App environment:
 *   - Standalone Expo App (Storybook environment)
 *   - Component wrapper environment as part of NPM package/within external app (App = null)
 */
let App
try {
  App = require('./App.tsx')
} catch {
  App = require('./wrapper.tsx')
}
module.exports = App
