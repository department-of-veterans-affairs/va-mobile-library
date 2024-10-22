import { AccessibilityValue } from 'react-native'

import { StringOrTextWithA11y } from './common'

/**
 * Props that are common to most form elements
 */
export type FormElementProps = {
  /** Optional error text. If present, applies error styling to element */
  error?: StringOrTextWithA11y
  /** Header text */
  header?: StringOrTextWithA11y
  /** Hint text. Appears below header */
  hint?: StringOrTextWithA11y
  /** True to append (*Required) suffix to element */
  required?: boolean
  /** Optional TestID */
  testID?: string
}

/**
 * Props that are common to Checkbox and Radio
 */
export type CheckboxRadioProps = {
  /** Primary text for checkbox */
  label: StringOrTextWithA11y
  /** OnPress logic to alter `checked` state or other behavior associated with the checkbox */
  onPress: () => void
  /** Textual description of position within list of checkboxes */
  a11yListPosition?: string
  /** Description that appears below label */
  description?: StringOrTextWithA11y
  /** True to apply tile styling */
  tile?: boolean
}
