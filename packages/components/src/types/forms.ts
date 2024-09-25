import { AccessibleText } from './common'

export type FormElementProps = {
  /** Hint text. Appears below header */
  hint?: AccessibleText
  /** Optional error text. If present, applies error styling to checkbox */
  error?: AccessibleText
  /** Header text */
  header?: AccessibleText
  /** True to append (*Required) suffix to label */
  required?: boolean
}

export type CheckboxRadioProps = {
  /** Primary text for checkbox */
  label: AccessibleText
  /** OnPress logic to alter `checked` state or other behavior associated with the checkbox */
  onPress: () => void
  /** Description that appears below label */
  description?: AccessibleText
  /** True to apply tile styling */
  tile?: boolean
}
