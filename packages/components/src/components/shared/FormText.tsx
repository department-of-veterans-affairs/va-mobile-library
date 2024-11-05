import { Text } from 'react-native'
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
const fontRegular = 'SourceSansPro-Regular'
const fontBold = 'SourceSansPro-Bold'

const fontHeader = {
  fontFamily: fontRegular,
  fontSize: 20,
  lineHeight: 30,
}

const fontHint = {
  fontFamily: fontRegular,
  fontSize: 16,
  lineHeight: 22,
}

const fontError = {
  fontFamily: fontBold,
  fontSize: 16,
  lineHeight: 22,
}

export const fontLabel = {
  fontSize: 20,
  lineHeight: 30,
}

const fontDescription = {
  fontFamily: fontRegular,
  fontSize: 16,
  lineHeight: 22,
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
    ...fontHeader,
    color: theme.vadsColorForegroundDefault,
  }

  const requiredStyle = {
    color: theme.vadsColorForegroundError,
  }

  const ariaLabel = required
    ? getA11yLabel(text) + ', ' + t('required')
    : getA11yLabel(text)

  return (
    <Text role="heading" aria-label={ariaLabel} style={textStyle}>
      {getDisplayText(text)}
      {required && <Text style={requiredStyle}>{` (*${t('required')})`}</Text>}
    </Text>
  )
}

/**
 * Hint text element commonly used in form components
 */
export const Hint: FC<FormTextProps> = ({ text }) => {
  const theme = useTheme()

  if (!text) return null

  const textStyle = {
    ...fontHint,
    color: theme.vadsColorForegroundSubtle,
  }

  return (
    <Text aria-label={getA11yLabel(text)} style={textStyle}>
      {getDisplayText(text)}
    </Text>
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
    ...fontError,
    color: theme.vadsColorForegroundError,
  }

  return (
    <Text aria-label={`${t('error')}: ${getA11yLabel(text)}`} style={textStyle}>
      {getDisplayText(text)}
    </Text>
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
    <Text style={textStyle}>
      {getDisplayText(text)}
      {required && <Text style={requiredStyle}>{` (*${t('required')})`}</Text>}
    </Text>
  )
}

/**
 * Description text element commonly used in form components
 */
export const Description: FC<FormTextProps> = ({ text }) => {
  const theme = useTheme()

  if (!text) return null

  const textStyle = {
    ...fontDescription,
    color: theme.vadsColorForegroundDefault,
  }

  return <Text style={textStyle}>{getDisplayText(text)}</Text>
}
