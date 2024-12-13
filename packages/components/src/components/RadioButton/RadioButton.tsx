import { View, ViewStyle } from 'react-native'
import { spacing } from '@department-of-veterans-affairs/mobile-tokens'
import { useTranslation } from 'react-i18next'
import React, { FC, Fragment } from 'react'

import { CheckboxRadio } from '../shared/CheckboxRadio'
import { ComponentWrapper } from '../../wrapper'
import { Error, Header, Hint } from '../shared/FormText'
import {
  FormElementProps,
  StringOrTextWithA11y,
  TextWithA11y,
} from '../../types'
import { Spacer } from '../Spacer/Spacer'
import { useTheme } from '../../utils'

type TextWithA11yAndValue = TextWithA11y & {
  /** Description for radio item */
  description?: StringOrTextWithA11y
  /** Value or ID for radio item if different than radio label */
  value?: string | number
  /** Optional TestID */
  testID?: string
}

export type RadioButtonProps = FormElementProps & {
  /** Array of radio options. Can be an array containing strings or objects if values or a11y overrides are needed */
  items: string[] | TextWithA11yAndValue[]
  /** Callback function that receives an updated selected value when a radio is pressed */
  onSelectionChange: (selected: string | number) => void
  /** The label or value (if provided) of currently selected radio, if any */
  selectedItem?: string | number
  /** True to apply tile styling */
  tile?: boolean
}

/**
 * ### Managing checked item state
 * The state of the selected radio item should be provided to RadioButton via the `selectedItem` prop and updated
 * using the `onSelectionChange` callback. When a radio is tapped, the provided `onSelectionChange` callback
 * function is fired and passed the newly `selectedItem`, which can be used to update the parent
 * component's state, whether that be redux, zustand, useState, or any other state management methods. Here is a basic
 * example using the `useState` hook to store the state of the `selectedItem`:
 *
 * ```jsx
 * export const ParentComponent = () => {
 *   const [selectedItem, setSelectedItem] = useState()
 *
 *   const onSelectionChange = (updatedItem) => setSelectedItem(updatedItem)
 *
 *   const items = ['Option 1', 'Option 2', 'Option 3']
 *
 *   return (
 *     <RadioButton
 *       items={items}
 *       onSelectionChange={onSelectionChange}
 *     />
 *   )
 *
 * }
 * ```
 *
 * ### Providing values or accessibility labels
 * RadioButton can accept a simple array of strings to display as radios as shown above. If you want to provide
 * values for each item that differ from display labels, or you want to provide accessibility labels for certain items,
 * you can pass an array of objects containing these optional fields as well. For example:
 *
 * ```jsx
 * export const ParentComponent = () => {
 *   const [selectedItem, setSelectedItem] = useState()
 *
 *   const onSelectionChange = (updatedItem) => setSelectedItem(updatedItem)
 *
 *   const items = [
 *    { text: 'Minnesota', value: 'MN' },
 *    { text: 'California', value: 'CA' },
 *    { text: 'New Jersey', value: 'NJ' },
 *    { text: 'Washington D.C.', value: 'DC', a11yLabel: 'District of Columbia' },
 *   ]
 *
 *   return (
 *     <RadioButton
 *       items={items}
 *       onSelectionChange={onSelectionChange}
 *     />
 *   )
 *
 * }
 * ```
 */
export const RadioButton: FC<RadioButtonProps> = ({
  items,
  selectedItem,
  error,
  header,
  hint,
  onSelectionChange,
  required,
  testID,
  tile,
}) => {
  const theme = useTheme()
  const { t } = useTranslation()

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
      paddingLeft: spacing.vadsSpaceMd,
    }
  }

  return (
    <ComponentWrapper>
      <View style={containerStyle} testID={testID}>
        <Header text={header} required={required} />
        {header && <Spacer size="xs" />}

        <Hint text={hint} />
        {hint && <Spacer size="xs" />}

        <Error text={error} />
        {error && <Spacer size="xs" />}

        {items.map((item, index) => {
          const isObject = typeof item === 'object'
          const value = isObject ? item.value || item.text : item
          const a11yListPosition = t('listPosition', {
            position: index + 1,
            total: items.length,
          })

          return (
            <Fragment key={`radio-button-item-${index}`}>
              <CheckboxRadio
                label={item}
                a11yListPosition={a11yListPosition}
                description={isObject ? item.description : undefined}
                checked={selectedItem === value}
                onPress={() => onSelectionChange(value)}
                radio
                testID={isObject ? item.testID : undefined}
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
