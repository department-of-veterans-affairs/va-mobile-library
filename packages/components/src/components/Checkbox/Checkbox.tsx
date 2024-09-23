import {
  Pressable,
  StyleProp,
  Text,
  View,
  ViewStyle,
  useWindowDimensions,
} from 'react-native'
import { spacing } from '@department-of-veterans-affairs/mobile-tokens'
import { useTranslation } from 'react-i18next'
import React, { FC } from 'react'

import { ComponentWrapper } from '../../wrapper'
import { Icon, IconProps } from '../Icon/Icon'
import { Spacer } from '../Spacer/Spacer'
import { useTheme } from '../../utils'

export type CheckboxProps = {
  /** Primary text for checkbox */
  label: string
  /** OnPress logic to alter `checked` state or other behavior associated with the checkbox */
  onPress: () => void
  /** True to make checkbox appear as checked */
  checked?: boolean
  /** Description that appears below label */
  description?: string
  /** Accessibility override for description text  */
  descriptionA11y?: string
  /** Hint text. Appears below header */
  hint?: string
  /** Accessibility override for hint text  */
  hintA11y?: string
  /** Optional error text. Non-null value styles checkbox in error state */
  error?: string
  /** Accessibility override for error text  */
  errorA11y?: string
  /** Header text */
  header?: string
  /** Accessibility override for header  */
  headerA11y?: string
  /** True to apply indeterminate icon to checkbox */
  indeterminate?: boolean
  /** Accessibility override for label  */
  labelA11y?: string
  /** True to append (*Required) suffix to label */
  required?: boolean
  /** True to apply tile styling */
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
  const fontScale = useWindowDimensions().fontScale

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
   * Header
   */
  const headerProps = {
    'aria-label': headerA11y,
    style: {
      // TODO: Replace with typography tokens
      fontFamily: 'SourceSansPro-Regular',
      color: theme.vadsColorForegroundDefault,
      fontSize: 20,
      lineHeight: 30,
    },
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
    'aria-label': hintA11y,
    style: {
      // TODO: Replace with typography tokens
      fontFamily: 'SourceSansPro-Regular',
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
      // TODO: Replace with typography tokens
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
   * Label
   */
  const labelProps = {
    'aria-label': labelA11y,
    style: {
      // TODO: Replace with typography tokens
      fontFamily: error ? 'SourceSansPro-Bold' : 'SourceSansPro-Regular',
      color: theme.vadsColorForegroundDefault,
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
   * Icon
   */
  const iconViewStyle: ViewStyle = {
    paddingTop: 3,
    paddingBottom: 3,
    // Below keeps icon aligned with first row of text, centered, and scalable
    alignSelf: 'flex-start',
    minHeight: labelProps.style.lineHeight * fontScale,
    alignItems: 'center',
    justifyContent: 'center',
  }

  const iconProps: IconProps = {
    name: indeterminate
      ? 'IndeterminateCheckBox'
      : checked
        ? 'CheckBox'
        : 'CheckBoxOutlineBlank',
    fill:
      checked || indeterminate
        ? theme.vadsColorFormsForegroundActive
        : theme.vadsColorFormsBorderDefault,
  }

  const _icon = (
    <View style={iconViewStyle}>
      <Icon {...iconProps} />
    </View>
  )

  /**
   * Description
   */
  const descriptionProps = {
    'aria-label': descriptionA11y,
    style: {
      // TODO: Replace with typography tokens
      fontFamily: 'SourceSansPro-Regular',
      color: theme.vadsColorForegroundDefault,
      fontSize: 16,
      lineHeight: 22,
    },
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
          accessibilityState={{ checked: indeterminate ? 'mixed' : checked }}
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
