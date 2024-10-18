import { View, ViewStyle } from 'react-native'
import { spacing } from '@department-of-veterans-affairs/mobile-tokens'
import React, { FC, Fragment } from 'react'

import { Checkbox } from '../Checkbox/Checkbox'
import { ComponentWrapper } from '../../wrapper'
import { Error, Header, Hint } from '../shared/FormText'
import {
  FormElementProps,
  StringOrTextWithA11y,
  TextWithA11y,
} from '../../types'
import { Spacer } from '../Spacer/Spacer'
import { useListPosition } from '../../utils/accessibility'
import { useTheme } from '../../utils'

type TextWithA11yAndValue = TextWithA11y & {
  /** Description for checkbox item */
  description?: StringOrTextWithA11y
  /** Value or ID for checkbox item if different than checkbox label */
  value?: string | number
  /** Optional TestID */
  testID?: string
}

export type CheckboxGroupProps = FormElementProps & {
  /** Array of checkbox options. Can be an array containing strings or objects if values or a11y overrides are needed */
  items: string[] | TextWithA11yAndValue[]
  /** Callback function that receives an updated array of selected values when checkboxes are pressed */
  onSelectionChange: (selected: (string | number)[]) => void
  /** Array of the labels or values (if provided) of currently selected checkboxes */
  selectedItems: (string | number)[]
  /** True to apply tile styling */
  tile?: boolean
}

/**
 * ### Managing checked item state
 * The state of the selected checkbox items should be provided to CheckboxGroup via the `selectedItems` prop and updated
 *  using the `onSelectionChange` callback. When a checkbox is tapped, the provided `onSelectionChange` callback
 * function is fired and passed an array of the newly `selectedItems`, which can be used to update the parent
 * component's state, whether that be redux, zustand, useState, or any other state management methods. Here is a basic
 * example using the `useState` hook to store the state of the `selectedItems`:
 *
 * ```jsx
 * export const ParentComponent = () => {
 *   const [selectedItems, setSelectedItems] = useState([])
 *
 *   const onSelectionChange = (updatedItems) => setSelectedItems(updatedItems)
 *
 *   const items = ['Option 1', 'Option 2', 'Option 3']
 *
 *   return (
 *     <CheckboxGroup
 *       items={items}
 *       onSelectionChange={onSelectionChange}
 *     />
 *   )
 *
 * }
 * ```
 *
 * ### Providing values or accessibility labels
 * CheckboxGroup can accept a simple array of strings to display as checkboxes as shown above. If you want to provide
 * values for each item that differ from display labels, or you want to provide accessibility labels for certain items,
 * you can pass an array of objects containing these optional fields as well. For example:
 *
 * ```jsx
 * export const ParentComponent = () => {
 *   const [selectedItems, setSelectedItems] = useState([])
 *
 *   const onSelectionChange = (updatedItems) => setSelectedItems(updatedItems)
 *
 *   const items = [
 *    { text: 'Minnesota', value: 'MN' },
 *    { text: 'California', value: 'CA' },
 *    { text: 'New Jersey', value: 'NJ' },
 *    { text: 'Washington D.C.', value: 'DC', a11yLabel: 'District of Columbia' },
 *   ]
 *
 *   return (
 *     <CheckboxGroup
 *       items={items}
 *       onSelectionChange={onSelectionChange}
 *     />
 *   )
 *
 * }
 * ```
 */
export const CheckboxGroup: FC<CheckboxGroupProps> = ({
  items,
  selectedItems,
  error,
  header,
  hint,
  onSelectionChange,
  required,
  testID,
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

          const accessibilityValue = useListPosition(index + 1, items.length)

          return (
            <Fragment key={`checkbox-group-item-${index}`}>
              <Checkbox
                label={item}
                accessibilityValue={accessibilityValue}
                description={isObject ? item.description : undefined}
                checked={selectedItems.includes(value)}
                onPress={() => handleCheckboxChange(value)}
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
