/**
 * Module to set App environment:
 *   - Standalone Expo App (Storybook environment)
 *   - Component wrapper environment as part of NPM package/within external app (App = null)
 */
type AppType = { default: JSX.Element | null }

let App: AppType
try {
  App = require('./App.tsx')
} catch {
  App = require('./wrapper.tsx')
}
export default App
