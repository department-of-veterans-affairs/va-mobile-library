import App from './main'

const expoApp = App.default

if (expoApp && App.initiateExpo) {
  App.initiateExpo(expoApp)
}

// Export components here so they are exported through npm
export { Button, ButtonVariants } from './components/Button/Button'
export { Icon } from './components/Icon/Icon'
export { SegmentedControl } from './components/SegmentedControl/SegmentedControl'
