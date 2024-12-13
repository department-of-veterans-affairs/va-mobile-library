import { Text as RNText } from 'react-native'
import { font } from '@department-of-veterans-affairs/mobile-tokens'
import { useTranslation } from 'react-i18next'
import React, { FC } from 'react'

import { StringOrTextWithA11y } from '../../types/common'
import { Text } from '../Text/Text'
import { getA11yLabel, getDisplayText, useTheme } from '../../utils'

type FormTextProps = {
  /** String to display or TextWithA11y object with string and a11y label */
  text?: StringOrTextWithA11y
}

/**
 * Fonts
 */
const { typography } = font

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
    <>
      <RNText role="heading" aria-label={ariaLabel} style={textStyle}>
        {getDisplayText(text)}
        {required && (
          <RNText style={requiredStyle}>{` (*${t('required')})`}</RNText>
        )}
      </RNText>
    </>
  )
}

/**
 * Hint text element commonly used in form components
 */
export const Hint: FC<FormTextProps> = ({ text }) => {
  if (!text) return null

  return (
    <>
      <Text
        variant="body"
        size="sm"
        a11yLabel={getA11yLabel(text)}
        tone="subtle"
        bottomSpacing="none">
        {getDisplayText(text)}
      </Text>
    </>
  )
}

/**
 * Error text element commonly used in form components
 */
export const Error: FC<FormTextProps> = ({ text }) => {
  const { t } = useTranslation()

  if (!text) return null

  return (
    <Text
      variant="body"
      bold
      size="sm"
      a11yLabel={`${t('error')}: ${getA11yLabel(text)}`}
      tone="error"
      bottomSpacing="none">
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
  const { t } = useTranslation()

  if (!text) return null

  return (
    <Text
      variant="body"
      size="lg"
      bottomSpacing="none"
      bold={error ? true : false}>
      {getDisplayText(text)}
      {required && (
        <Text
          variant="body"
          size="lg"
          tone="error"
          bottomSpacing="none"
          bold={error ? true : false}>{` (*${t('required')})`}</Text>
      )}
    </Text>
  )
}

/**
 * Description text element commonly used in form components
 */
export const Description: FC<FormTextProps> = ({ text }) => {
  if (!text) return null

  return (
    <Text variant="body" size="sm" bottomSpacing="none">
      {getDisplayText(text)}
    </Text>
  )
}
