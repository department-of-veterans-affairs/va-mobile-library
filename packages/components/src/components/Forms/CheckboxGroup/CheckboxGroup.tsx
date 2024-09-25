import { View, ViewStyle } from 'react-native'
import { spacing } from '@department-of-veterans-affairs/mobile-tokens'
import React, { FC, Fragment } from 'react'

import { AccessibleText } from '../../../types/common'
import { Checkbox } from '../Checkbox/Checkbox'
import { ComponentWrapper } from '../../../wrapper'
import { Error, Header, Hint } from '../FormText'
import { Spacer } from '../../Spacer/Spacer'
import { useTheme } from '../../../utils'

export type CheckboxGroupItem = AccessibleText & {
  value?: string | number
}

export type CheckboxGroupProps = {
  /** Array of checkbox options. Can be an array of strings or objects if values and/or a11y overrides are needed */
  items: CheckboxGroupItem[]
  /** OnPress logic to alter `checked` state or other behavior associated with the checkbox */
  onSelectionChange: (selected: (string | number)[]) => void
  /** Callback function that receives an updated array of selected values when checkboxes are pressed */
  selectedItems: (string | number)[]
  /** Description that appears below label */
  description?: string
  /** Accessibility override for description text  */
  descriptionA11y?: string
  /** Hint text. Appears below header */
  hint?: string
  /** Accessibility override for hint text  */
  hintA11y?: string
  /** Optional error text. If present, applies error styling to checkbox */
  error?: string
  /** Accessibility override for error text  */
  errorA11y?: string
  /** Header text */
  header?: string
  /** Accessibility override for header  */
  headerA11y?: string
  /** True to append (*Required) suffix to label */
  required?: boolean
  /** True to apply tile styling */
  tile?: boolean
}

export const CheckboxGroup: FC<CheckboxGroupProps> = ({
  items,
  selectedItems,
  error,
  header,
  hint,
  onSelectionChange,
  required,
  tile,
}) => {
  const theme = useTheme()

  const handleCheckboxChange = (value: string | number) => {
    if (selectedItems.includes(value)) {
      onSelectionChange(
        selectedItems.filter((itemValue) => itemValue !== value),
      )
    } else {
      onSelectionChange([...selectedItems, value])
    }
  }

  /**
   * Container styling
   */
  let containerStyle: ViewStyle = {
    width: '100%',
  }

  if (error) {
    containerStyle = {
      ...containerStyle,
      borderLeftWidth: spacing.vadsSpace2xs,
      borderColor: theme.vadsColorFormsBorderError,
      paddingLeft: spacing.vadsSpaceLg,
    }
  }

  return (
    <ComponentWrapper>
      <View style={containerStyle}>
        {header && (
          <>
            <Header text={header} required={required} />
            <Spacer size="xs" />
          </>
        )}

        {hint && (
          <>
            <Hint text={hint} />
            <Spacer size="xs" />
          </>
        )}

        {error && (
          <>
            <Error text={error} />
            <Spacer size="xs" />
          </>
        )}
        {items.map((item, index) => {
          const value =
            typeof item === 'object' ? item.value || item.text : item

          return (
            <Fragment key={`checkbox-group-item-${index}`}>
              <Checkbox
                label={item}
                checked={selectedItems.includes(value)}
                onPress={() => handleCheckboxChange(value)}
                tile={tile}
              />
              {index < items.length - 1 && <Spacer size="sm" />}
            </Fragment>
          )
        })}
      </View>
    </ComponentWrapper>
  )
}
