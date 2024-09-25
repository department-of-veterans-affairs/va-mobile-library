import { Text, View, ViewStyle } from 'react-native'
import { spacing } from '@department-of-veterans-affairs/mobile-tokens'
import { useTranslation } from 'react-i18next'
import React, { FC, Fragment } from 'react'

import { Checkbox } from '../Checkbox/Checkbox'
import { ComponentWrapper } from '../../wrapper'
import { Spacer } from '../Spacer/Spacer'
import { useTheme } from '../../utils'

export type CheckboxGroupItem = {
  label: string
  a11y?: string
  value?: string | number
}

export type CheckboxGroupProps = {
  /** Array of checkbox options. Can be an array of strings or objects if values and/or a11y overrides are needed */
  items: CheckboxGroupItem[] | string[]
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
  errorA11y,
  header,
  headerA11y,
  hint,
  hintA11y,
  onSelectionChange,
  required,
  tile,
}) => {
  const { t } = useTranslation()
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
   * Fonts
   */
  // TODO: Replace with typography tokens
  const fontRegular = 'SourceSansPro-Regular'
  const fontBold = 'SourceSansPro-Bold'

  const fontHeader = {
    fontFamily: fontRegular,
    color: theme.vadsColorForegroundDefault,
    fontSize: 20,
    lineHeight: 30,
  }

  const fontHint = {
    fontFamily: fontRegular,
    color: theme.vadsColorForegroundSubtle,
    fontSize: 16,
    lineHeight: 22,
  }

  const fontError = {
    fontFamily: fontBold,
    color: theme.vadsColorForegroundError,
    fontSize: 16,
    lineHeight: 22,
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

  /**
   * Header
   */
  const headerProps = {
    'aria-label': headerA11y,
    style: fontHeader,
  }

  const requiredStyle = {
    color: theme.vadsColorForegroundError,
  }

  const _header = header && (
    <>
      <Text {...headerProps}>
        {header}
        {required && (
          <Text style={requiredStyle}>{` (*${t('required')})`}</Text>
        )}
      </Text>
      <Spacer size="xs" />
    </>
  )

  /**
   * Hint
   */
  const hintProps = {
    'aria-label': hintA11y,
    style: fontHint,
  }

  const _hint = hint && (
    <>
      <Text {...hintProps}>{hint}</Text>
      <Spacer size="xs" />
    </>
  )

  /**
   * Error
   */
  const errorProps = {
    'aria-label': `${t('error')}: ${errorA11y || error}`,
    style: fontError,
  }

  const _error = error && (
    <>
      <Text {...errorProps}>{error}</Text>
      <Spacer size="xs" />
    </>
  )

  return (
    <ComponentWrapper>
      <View style={containerStyle}>
        {_header}
        {_hint}
        {_error}
        {items.map((item, index) => {
          const isObject = typeof item === 'object'
          const label = isObject ? item.label : item
          const value = isObject ? item.value || item.label : item

          return (
            <Fragment key={`checkbox-group-item-${index}`}>
              <Checkbox
                label={label}
                labelA11y={isObject ? item.a11y : undefined}
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
