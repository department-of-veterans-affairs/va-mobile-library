import { Text } from 'react-native'
import React, { FC } from 'react'

import { AccessibleText } from '../../types/common'
import { getA11yText, getDisplayText } from '../../utils'
import { useTheme } from '../../utils'
import { useTranslation } from 'react-i18next'

export type FormTextProps = {
  text: AccessibleText
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

/**
 * Header
 */
export type HeaderProps = FormTextProps & {
  required?: boolean
}

export const Header: FC<HeaderProps> = ({ text, required }) => {
  const theme = useTheme()
  const { t } = useTranslation()

  const textStyle = {
    ...fontHeader,
    color: theme.vadsColorForegroundDefault,
  }

  const requiredStyle = {
    color: theme.vadsColorForegroundError,
  }

  return (
    <Text aria-label={getA11yText(text)} style={textStyle}>
      {getDisplayText(text)}
      {required && <Text style={requiredStyle}>{` (*${t('required')})`}</Text>}
    </Text>
  )
}

/**
 * Hint
 */
export const Hint: FC<FormTextProps> = ({ text }) => {
  const theme = useTheme()

  // TODO: Replace with typography tokens
  const textStyle = {
    ...fontHint,
    color: theme.vadsColorForegroundSubtle,
  }

  return (
    <Text aria-label={getA11yText(text)} style={textStyle}>
      {getDisplayText(text)}
    </Text>
  )
}

/**
 * Error
 */
export const Error: FC<FormTextProps> = ({ text }) => {
  const { t } = useTranslation()
  const theme = useTheme()

  // TODO: Replace with typography tokens
  const textStyle = {
    ...fontError,
    color: theme.vadsColorForegroundError,
  }

  return (
    <Text aria-label={`${t('error')}: ${getA11yText(text)}`} style={textStyle}>
      {getDisplayText(text)}
    </Text>
  )
}

/**
 * Label
 */
export type LabelProps = FormTextProps & {
  required?: boolean
  error?: AccessibleText
}

export const Label: FC<LabelProps> = ({ text, error, required }) => {
  const theme = useTheme()
  const { t } = useTranslation()

  // TODO: Replace with typography tokens
  const textStyle = {
    ...fontLabel,
    fontFamily: error ? fontBold : fontRegular,
    color: theme.vadsColorForegroundDefault,
  }

  const requiredStyle = {
    color: theme.vadsColorForegroundError,
  }

  return (
    <Text aria-label={getA11yText(text)} style={textStyle}>
      {getDisplayText(text)}
      {required && <Text style={requiredStyle}>{` (*${t('required')})`}</Text>}
    </Text>
  )
}

/**
 * Description
 */
export const Description: FC<FormTextProps> = ({ text }) => {
  const theme = useTheme()

  // TODO: Replace with typography tokens
  const textStyle = {
    ...fontDescription,
    color: theme.vadsColorForegroundDefault,
  }

  return (
    <Text aria-label={getA11yText(text)} style={textStyle}>
      {getDisplayText(text)}
    </Text>
  )
}
