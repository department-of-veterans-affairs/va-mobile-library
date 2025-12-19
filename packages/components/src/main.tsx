import React from 'react'

/**
 * Module to set App environment:
 *   - Standalone Expo App (Storybook environment)
 *   - Component wrapper environment as part of NPM package/within external app (App = null)
 */
export type AppType = {
  default: React.JSX.Element | null
  initiateExpo: ((expoApp: React.JSX.Element | null) => void) | null
}

let App: AppType
try {
  App = require('./App.tsx') // eslint-disable-line
} catch {
  App = require('./wrapper.tsx') // eslint-disable-line
}
export default App
