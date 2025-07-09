import React, { FC } from 'react'

import { CheckboxRadio } from '../shared/CheckboxRadio'
import { CheckboxRadioProps } from '../../types/forms'
import { ComponentWrapper } from '../../wrapper'

/**
 * #### [<u>View guidance for the Checkbox component on the VA Mobile Documentation Site</u>](https://department-of-veterans-affairs.github.io/va-mobile-app/design/Components/Selection%20and%20Input/Checkbox/)
 */
export const Checkbox: FC<CheckboxRadioProps> = ({
  a11yListPosition,
  checked,
  label,
  description,
  error,
  header,
  hint,
  indeterminate,
  onPress,
  required,
  testID,
  tile,
}) => {
  const props = {
    a11yListPosition,
    checked,
    description,
    error,
    header,
    hint,
    indeterminate,
    label,
    onPress,
    required,
    testID,
    tile,
  }

  return (
    <ComponentWrapper>
      <CheckboxRadio {...props} />
    </ComponentWrapper>
  )
}
