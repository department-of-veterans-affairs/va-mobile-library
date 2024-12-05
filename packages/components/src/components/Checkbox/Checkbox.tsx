import React, { FC } from 'react'

import { CheckboxRadio } from '../shared/CheckboxRadio'
import { CheckboxRadioProps } from '../../types/forms'
import { ComponentWrapper } from '../../wrapper'

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
