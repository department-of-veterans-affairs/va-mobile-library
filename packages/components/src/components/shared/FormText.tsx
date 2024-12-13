import { Text as RNText } from 'react-native'
import { font, spacing } from '@department-of-veterans-affairs/mobile-tokens'
import { useTranslation } from 'react-i18next'
import React, { FC } from 'react'

import { StringOrTextWithA11y } from '../../types/common'
import { getA11yLabel, getDisplayText, useTheme } from '../../utils'

type FormTextProps = {
  /** String to display or TextWithA11y object with string and a11y label */
  text?: StringOrTextWithA11y
}

/**
 * Fonts (TODO: replace with typography tokens)
 */
const { family, typography } = font
const fontRegular = family.vadsFontFamilySansSerifRegular
const fontBold = family.vadsFontFamilySansSerifBold

export const fontLabel = {
  ...typography.vadsFontBodyLarge,
  marginBottom: 0,
}

export type HeaderProps = FormTextProps & {
  /** True to display (*Required) label next to header */
  required?: boolean
}

/**
 * Header text element commonly used in form components
 */
export const Header: FC<HeaderProps> = ({ text, required }) => {
  const theme = useTheme()
  const { t } = useTranslation()

  if (!text) return null

  const textStyle = {
    ...typography.vadsFontBodyLarge,
    marginBottom: 0,
    color: theme.vadsColorForegroundDefault,
  }

  const requiredStyle = {
    color: theme.vadsColorForegroundError,
  }

  const ariaLabel = required
    ? getA11yLabel(text) + ', ' + t('required')
    : getA11yLabel(text)

  return (
    <RNText role="heading" aria-label={ariaLabel} style={textStyle}>
      {getDisplayText(text)}
      {required && (
        <RNText style={requiredStyle}>{` (*${t('required')})`}</RNText>
      )}
    </RNText>
  )
}

/**
 * Hint text element commonly used in form components
 */
export const Hint: FC<FormTextProps> = ({ text }) => {
  const theme = useTheme()

  if (!text) return null

  const textStyle = {
    ...typography.vadsFontBodySmall,
    marginBottom: 0,
    color: theme.vadsColorForegroundSubtle,
  }

  return (
    <RNText aria-label={getA11yLabel(text)} style={textStyle}>
      {getDisplayText(text)}
    </RNText>
  )
}

/**
 * Error text element commonly used in form components
 */
export const Error: FC<FormTextProps> = ({ text }) => {
  const { t } = useTranslation()
  const theme = useTheme()

  if (!text) return null

  const textStyle = {
    ...typography.vadsFontBodySmall,
    fontFamily: fontBold,
    marginBottom: 0,
    color: theme.vadsColorForegroundError,
  }

  return (
    <RNText
      aria-label={`${t('error')}: ${getA11yLabel(text)}`}
      style={textStyle}>
      {getDisplayText(text)}
    </RNText>
  )
}
export type LabelProps = FormTextProps & {
  /** True to display (*Required) label next to label */
  required?: boolean
  /** Error message that modifies label styling when provided */
  error?: StringOrTextWithA11y
}

/**
 * Label text element commonly used in form components
 */
export const Label: FC<LabelProps> = ({ text, error, required }) => {
  const theme = useTheme()
  const { t } = useTranslation()

  if (!text) return null

  const textStyle = {
    ...fontLabel,
    fontFamily: error ? fontBold : fontRegular,
    color: theme.vadsColorForegroundDefault,
  }

  const requiredStyle = {
    color: theme.vadsColorForegroundError,
  }

  return (
    <RNText style={textStyle}>
      {getDisplayText(text)}
      {required && (
        <RNText style={requiredStyle}>{` (*${t('required')})`}</RNText>
      )}
    </RNText>
  )
}

/**
 * Description text element commonly used in form components
 */
export const Description: FC<FormTextProps> = ({ text }) => {
  const theme = useTheme()

  if (!text) return null

  const textStyle = {
    ...typography.vadsFontBodySmall,
    marginBottom: 0,
    color: theme.vadsColorForegroundDefault,
  }

  return <RNText style={textStyle}>{getDisplayText(text)}</RNText>
}
