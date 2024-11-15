import App from './main'

const expoApp = App.default

if (expoApp && App.initiateExpo) {
  App.initiateExpo(expoApp)
}

// Export components here so they are exported through npm
export { Alert, AlertProps } from './components/Alert/Alert'
export { Button, ButtonVariants, ButtonProps } from './components/Button/Button'
export { Checkbox, CheckboxProps } from './components/Checkbox/Checkbox'
export {
  CheckboxGroup,
  CheckboxGroupProps,
} from './components/CheckboxGroup/CheckboxGroup'
export { Icon, IconProps } from './components/Icon/Icon'
export { Link, LinkProps } from './components/Link/Link'
export {
  LoadingIndicator,
  LoadingIndicatorProps,
} from './components/LoadingIndicator/LoadingIndicator'
export {
  SegmentedControl,
  SegmentedControlProps,
} from './components/SegmentedControl/SegmentedControl'
export {
  SnackbarProvider,
  SnackbarProviderWithSafeArea,
} from './components/Snackbar/SnackbarProvider'
export { Spacer, SpacerProps } from './components/Spacer/Spacer'
export { Text, TextProps } from './components/Text/Text'

// Export consumer available utilities here so they are exported through npm
export { useIsScreenReaderEnabled, useTheme } from './utils'
export { useSnackbar } from './components/Snackbar/useSnackbar'
