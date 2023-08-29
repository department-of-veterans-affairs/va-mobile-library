import { registerRootComponent } from 'expo'

// @ts-ignore
import * as App from './main'

const expoApp: JSX.Element | null = App.default

if (expoApp) {
  // registerRootComponent calls AppRegistry.registerComponent('main', () => App);
  // It also ensures that whether you load the app in Expo Go or in a native build,
  // the environment is set up appropriately
  registerRootComponent(App.default)
}

// Export components here so they are exported through npm
export { MyButton } from './components/Button/Button'
export { SegmentedControl } from './components/SegmentedControl/SegmentedControl'
