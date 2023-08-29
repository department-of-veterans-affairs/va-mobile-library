import { registerRootComponent } from 'expo'

// @ts-ignore
import * as App from './main'

const storybook = App.default
// console.log('1: ', storybook)
// let m
// try {
//   // storybook = true
//   m = require('expo')
//   // if (!m) {
//   //   throw new Error("oops")
//   // }
//   // console.log('2: ', storybook)
// } catch (error) {
//   storybook = true
//   console.log('3: ', error)
//   // m = require('./App').default
// }

// console.log('mmmmm: ', m)
console.log('4: ', storybook)

// const storybookEnabled = process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === 'true'

if (storybook) {
  // const App = require('./App').default
  // registerRootComponent calls AppRegistry.registerComponent('main', () => App);
  // It also ensures that whether you load the app in Expo Go or in a native build,
  // the environment is set up appropriately
  registerRootComponent(App.default)
}

// Export components here so they are exported through npm

export { MyButton } from './components/Button/Button'
export { SegmentedControl } from './components/SegmentedControl/SegmentedControl'
