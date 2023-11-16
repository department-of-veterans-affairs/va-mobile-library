import { ColorSchemeName } from "react-native"

/**
 * Module to set App environment:
 *   - Standalone Expo App (Storybook environment)
 *   - Component wrapper environment as part of NPM package/within external app (App = null)
 */
export type AppType = {
  default: JSX.Element | null
  initiateExpo: ((expoApp: JSX.Element | null) => void) | null
  webStorybookColorScheme: () => ColorSchemeName | null
}

let App: AppType
try {
  App = require('./App.tsx')
} catch {
  App = require('./wrapper.tsx')
}
export default App
