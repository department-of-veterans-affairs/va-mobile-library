import { View, ViewStyle } from 'react-native'
import { spacing } from '@department-of-veterans-affairs/mobile-tokens'
import React, { FC, Fragment } from 'react'

import { Checkbox } from '../Checkbox/Checkbox'
import { ComponentWrapper } from '../../../wrapper'
import { Error, Header, Hint } from '../FormText'
import { FormElementProps } from '../../../types/forms'
import { Spacer } from '../../Spacer/Spacer'
import { TextWithA11y } from '../../../types/common'
import { useTheme } from '../../../utils'

export type CheckboxGroupItem =
  | string
  | (TextWithA11y & { value?: string | number })

export type CheckboxGroupProps = FormElementProps & {
  /** Array of checkbox options. Can be an array of strings or objects if values and/or a11y overrides are needed */
  items: CheckboxGroupItem[]
  /** OnPress logic to alter `checked` state or other behavior associated with the checkbox */
  onSelectionChange: (selected: (string | number)[]) => void
  /** Callback function that receives an updated array of selected values when checkboxes are pressed */
  selectedItems: (string | number)[]
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
