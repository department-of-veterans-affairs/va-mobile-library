import { TextWithA11y } from './common'

/**
 * Props that are common to most form elements
 */
export type FormElementProps = {
  /** Optional error text. If present, applies error styling to element */
  error?: string | TextWithA11y
  /** Header text */
  header?: string | TextWithA11y
  /** Hint text. Appears below header */
  hint?: string | TextWithA11y
  /** True to append (*Required) suffix to element */
  required?: boolean
  /** True to apply tile styling */
  tile?: boolean
}

/**
 * Props that are common to Checkbox and Radio
 */
export type CheckboxRadioProps = {
  /** Primary text for checkbox */
  label: string | TextWithA11y
  /** OnPress logic to alter `checked` state or other behavior associated with the checkbox */
  onPress: () => void
  /** Description that appears below label */
  description?: string | TextWithA11y
}
