import App from './main'

const expoApp = App.default

if (expoApp && App.initiateExpo) {
  App.initiateExpo(expoApp)
}

// Export components here so they are exported through npm
export { Alert } from './components/Alert/Alert'
export { Button, ButtonVariants } from './components/Button/Button'
export { Icon } from './components/Icon/Icon'
export { Link } from './components/Link/Link'
export { LoadingIndicator } from './components/LoadingIndicator/LoadingIndicator'
export { SegmentedControl } from './components/SegmentedControl/SegmentedControl'
export { SnackbarProvider } from './components/Snackbar/SnackbarProvider'
export { Spacer } from './components/Spacer/Spacer'

// Export consumer available utilities here so they are exported through npm
export { useSnackbar } from './hooks/useSnackbar'
export { useTheme } from './utils'
