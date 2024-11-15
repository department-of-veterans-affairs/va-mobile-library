import App from './main'

const expoApp = App.default

if (expoApp && App.initiateExpo) {
  App.initiateExpo(expoApp)
}

// Export consumer available utilities here so they are exported through npm
export { useIsScreenReaderEnabled, useTheme } from './utils'
export { useSnackbar } from './components/Snackbar/useSnackbar'

// Export components here so they are exported through npm
export { Alert } from './components/Alert/Alert'
export { Button, ButtonVariants } from './components/Button/Button'
export { Checkbox } from './components/Checkbox/Checkbox'
export { CheckboxGroup } from './components/CheckboxGroup/CheckboxGroup'
export { Icon } from './components/Icon/Icon'
export { Link } from './components/Link/Link'
export { LoadingIndicator } from './components/LoadingIndicator/LoadingIndicator'
export { SegmentedControl } from './components/SegmentedControl/SegmentedControl'
export {
  SnackbarProvider,
  SnackbarProviderWithSafeArea,
} from './components/Snackbar/SnackbarProvider'
export { Spacer } from './components/Spacer/Spacer'
export { Text } from './components/Text/Text'

// Export Prop Types
export type { AlertProps } from './components/Alert/Alert'
export type { ButtonProps } from './components/Button/Button'
export type { CheckboxProps } from './components/Checkbox/Checkbox'
export type { CheckboxGroupProps } from './components/CheckboxGroup/CheckboxGroup'
export type { IconProps } from './components/Icon/Icon'
export type { LinkProps } from './components/Link/Link'
export type { LoadingIndicatorProps } from './components/LoadingIndicator/LoadingIndicator'
export type { SegmentedControlProps } from './components/SegmentedControl/SegmentedControl'
export type { SpacerProps } from './components/Spacer/Spacer'
export type { TextProps } from './components/Text/Text'
