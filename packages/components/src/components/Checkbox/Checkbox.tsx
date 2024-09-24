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
  /** Optional error text. If present, applies error styling to checkbox */
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

  const fontLabel = {
    fontFamily: error ? fontBold : fontRegular,
    color: theme.vadsColorForegroundDefault,
    fontSize: 20,
    lineHeight: 30,
  }

  const fontDescription = {
    fontFamily: fontRegular,
    color: theme.vadsColorForegroundDefault,
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
    padding: spacing.vadsSpaceSm,
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
    style: fontHeader,
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

  /**
   * Icon
   */
  const iconViewStyle: ViewStyle = {
    // Below keeps icon aligned with first row of text, centered, and scalable
    alignSelf: 'flex-start',
    minHeight: fontLabel.lineHeight * fontScale,
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
   * Label
   */
  const labelProps = {
    'aria-label': labelA11y,
    style: fontLabel,
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
   * Description
   */
  const descriptionProps = {
    'aria-label': descriptionA11y,
    style: fontDescription,
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
          aria-checked={indeterminate ? 'mixed' : checked}
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
