// Import components here so they can be exported through npm
import { registerRootComponent } from 'expo'

import './main'
import App from './App'

let storybook = true
try {
  require('@storybook/react-native')
} catch {
  storybook = false
}

const storybookEnabled = process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === 'true'

if (storybookEnabled && storybook) {
  // registerRootComponent calls AppRegistry.registerComponent('main', () => App);
  // It also ensures that whether you load the app in Expo Go or in a native build,
  // the environment is set up appropriately
  registerRootComponent(App)
}
