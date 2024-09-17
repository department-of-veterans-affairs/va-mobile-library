import { Pressable, StyleProp, Text, View, ViewStyle } from 'react-native'
import React, { FC } from 'react'

import { spacing } from '@department-of-veterans-affairs/mobile-tokens'
import { useTranslation } from 'react-i18next'

import { ComponentWrapper } from '../../wrapper'
import { Icon } from '../Icon/Icon'
import { Spacer } from '../Spacer/Spacer'
import { useTheme } from '../../utils'

export type CheckboxProps = {
  checked: boolean
  label: string
  a11yDescription?: string
  a11yError?: string
  a11yHeader?: string
  a11yHint?: string
  a11yLabel?: string
  description?: string
  hint?: string
  error?: string
  header?: string
  indeterminate?: boolean
  onPress?: () => void
  required?: boolean
  tile?: boolean
}

export const Checkbox: FC<CheckboxProps> = ({
  checked = false,
  label,
  a11yDescription,
  a11yError,
  a11yHeader,
  a11yHint,
  a11yLabel,
  description,
  error,
  header,
  hint,
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
   * Container
   */

  let containerStyle: ViewStyle = {
    width: '100%',
  }

  if (error) {
    containerStyle = {
      ...containerStyle,
      borderLeftWidth: 4,
      borderColor: theme.vadsColorFormsBorderError,
      paddingLeft: spacing.vadsSpaceLg,
    }
  }

  /**
   * Pressable Area
   */

  const pressableBaseStyle: StyleProp<ViewStyle> = {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
  }

  const tileBaseStyle: ViewStyle = {
    ...pressableBaseStyle,
    borderWidth: 2,
    borderRadius: spacing.vadsSpace2xs,
    paddingTop: spacing.vadsSpaceSm,
    paddingBottom: spacing.vadsSpaceSm,
    paddingLeft: spacing.vadsSpaceSm,
    paddingRight: spacing.vadsSpaceMd,
  }

  const tileStyle: ViewStyle = checked
    ? {
        ...tileBaseStyle,
        borderColor: theme.vadsColorFormsBorderActive,
      }
    : {
        ...tileBaseStyle,
        borderColor: theme.vadsColorFormsBorderSubtle,
        backgroundColor: theme.vadsColorSurfaceDefault,
      }

  /**
   * Icon
   */

  const _icon = (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 3,
        paddingBottom: 3,
      }}>
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
    'aria-label': a11yLabel || label,
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
    'aria-label': a11yHeader || header,
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
    'aria-label': a11yHint || hint,
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
    'aria-label': a11yError || error,
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
    'aria-label': a11yDescription || description,
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
          style={tile ? tileStyle : pressableBaseStyle}>
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
