import App from './main'

const expoApp = App.default

if (expoApp) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const expo = require('expo')
  // registerRootComponent calls AppRegistry.registerComponent('main', () => App);
  // It also ensures that whether you load the app in Expo Go or in a native build,
  // the environment is set up appropriately
  expo.registerRootComponent(expoApp)
}

// Export components here so they are exported through npm
export { SegmentedControl } from './components/SegmentedControl/SegmentedControl'
