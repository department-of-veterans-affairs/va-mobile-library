/**
 * Module to set App environment:
 *   - Standalone Expo App (Storybook environment)
 *   - Component wrapper environment as part of NPM package/within external app (App = null)
 */
// Empty export so TS doesn't interpret as a script file
export {}

let App
try {
  App = require('./App.tsx')
} catch {
  App = require('./wrapper.tsx')
}
module.exports = App
