import { Pressable, StyleProp, Text, View, ViewStyle } from 'react-native'
import React, { FC } from 'react'

import { spacing } from '@department-of-veterans-affairs/mobile-tokens'
import { useTranslation } from 'react-i18next'

import { ComponentWrapper } from '../../wrapper'
import { Icon } from '../Icon/Icon'
import { Spacer } from '../Spacer/Spacer'
import { useTheme } from '../../utils'

export type CheckboxProps = {
  /** Primary text for checkbox */
  label: string
  /** OnPress function. Pass a function that alters `checked` state */
  onPress: () => void
  /** Optional boolean that determines whether checkbox appears checked */
  checked?: boolean
  /** Optional description that appears below label */
  description?: string
  /** Optional accessibility override for description text  */
  descriptionA11y?: string
  /** Optional hint text. Appears below header */
  hint?: string
  /** Optional accessibility override for hint text  */
  hintA11y?: string
  /** Optional error text. Non-null value styles checkbox in error state */
  error?: string
  /** Optional accessibility override for error text  */
  errorA11y?: string
  /** Optional header text */
  header?: string
  /** Optional accessibility override for header  */
  headerA11y?: string
  /** Optional indeterminate boolean. Overrides checked styling */
  indeterminate?: boolean
  /** Optional accessibility override for label  */
  labelA11y?: string
  /** Optional required boolean that denotes a label as (*Required) */
  required?: boolean
  /** Optional tile styling */
  tile?: boolean
}

export const Checkbox: FC<CheckboxProps> = ({
  checked,
  label,
  labelA11y,
  description,
  descriptionA11y,
  error,
  errorA11y,
  header,
  headerA11y,
  hint,
  hintA11y,
  indeterminate,
  onPress,
  required,
  tile,
}) => {
  const { t } = useTranslation()
  const theme = useTheme()

  const baseTextStyle = {
    fontFamily: 'SourceSansPro-Regular',
    color: theme.vadsColorForegroundDefault,
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
   * Pressable styling
   */

  const pressableBaseStyle: StyleProp<ViewStyle> = {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
  }

  const tileStyle: ViewStyle = {
    ...pressableBaseStyle,
    borderWidth: 2,
    borderRadius: spacing.vadsSpace2xs,
    paddingTop: spacing.vadsSpaceSm,
    paddingBottom: spacing.vadsSpaceSm,
    paddingLeft: spacing.vadsSpaceSm,
    paddingRight: spacing.vadsSpaceMd,
    borderColor: checked
      ? theme.vadsColorFormsBorderActive
      : theme.vadsColorFormsBorderSubtle,
    backgroundColor: checked
      ? theme.vadsColorFormsSurfaceActive
      : theme.vadsColorSurfaceDefault,
  }

  /**
   * Icon
   */

  const iconViewStyle: ViewStyle = {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 3,
    paddingBottom: 3,
  }

  const _icon = (
    <View style={iconViewStyle}>
      <Icon
        name={
          indeterminate
            ? 'IndeterminateCheckBox'
            : checked
              ? 'CheckBox'
              : 'CheckBoxOutlineBlank'
        }
        fill={
          checked
            ? theme.vadsColorFormsForegroundActive
            : theme.vadsColorFormsBorderDefault
        }
      />
    </View>
  )

  /**
   * Label
   */

  const labelProps = {
    'aria-label': labelA11y || label,
    style: {
      ...baseTextStyle,
      fontFamily: error ? 'SourceSansPro-Bold' : 'SourceSansPro-Regular',
      fontSize: 20,
      lineHeight: 30,
    },
  }

  const requiredStyle = {
    color: theme.vadsColorForegroundError,
  }

  const _label = (
    <Text {...labelProps}>
      {label}
      {required && <Text style={requiredStyle}>{` (*${t('required')})`}</Text>}
    </Text>
  )

  /**
   * Header
   */

  const headerProps = {
    'aria-label': headerA11y || header,
    style: { ...baseTextStyle, fontSize: 20, lineHeight: 30 },
  }

  const _header = header && (
    <>
      <Text {...headerProps}>{header}</Text>
      <Spacer size="xs" />
    </>
  )

  /**
   * Hint
   */

  const hintProps = {
    'aria-label': hintA11y || hint,
    style: {
      ...baseTextStyle,
      color: theme.vadsColorForegroundSubtle,
      fontSize: 16,
      lineHeight: 22,
    },
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
    style: {
      fontFamily: 'SourceSansPro-Bold',
      color: theme.vadsColorForegroundError,
      fontSize: 16,
      lineHeight: 22,
    },
  }

  const _error = error && (
    <>
      <Text {...errorProps}>{error}</Text>
      <Spacer size="xs" />
    </>
  )

  /**
   * Description
   */

  const descriptionProps = {
    'aria-label': descriptionA11y || description,
    style: { ...baseTextStyle, fontSize: 16, lineHeight: 22 },
  }

  const _description = description && (
    <>
      <Spacer size="xs" />
      <Text {...descriptionProps}>{description}</Text>
    </>
  )

  return (
    <ComponentWrapper>
      <View style={containerStyle}>
        {_header}
        {_hint}
        {_error}
        <Pressable
          onPress={onPress}
          style={tile ? tileStyle : pressableBaseStyle}
          aria-checked={checked}
          accessibilityState={{ checked }}
          role="checkbox">
          {_icon}
          <Spacer size="xs" horizontal />
          <View style={{ flexShrink: 1 }}>
            {_label}
            {_description}
          </View>
        </Pressable>
      </View>
    </ComponentWrapper>
  )
}
