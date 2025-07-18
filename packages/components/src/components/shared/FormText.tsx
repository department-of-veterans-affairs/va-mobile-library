import { FC } from 'react'
import { Text as RNText } from 'react-native'
import { font, spacing } from '@department-of-veterans-affairs/mobile-tokens'
import { useTranslation } from 'react-i18next'

import { StringOrTextWithA11y } from '../../types/common'
import { Text, TextProps } from '../Text/Text'
import { getA11yLabel, getDisplayText, useTheme } from '../../utils'

type FormTextProps = {
  /** String to display or TextWithA11y object with string and a11y label */
  text?: StringOrTextWithA11y
}

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
    marginBottom: spacing.vadsSpaceNone,
    color: theme.vadsColorForegroundDefault,
  }

  const requiredStyle = {
    color: theme.vadsColorFeedbackForegroundError,
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

  const bold = error ? true : false

  const textProps: TextProps = {
    variant: 'body',
    size: 'lg',
    bottomSpacing: 'none',
    bold,
  }

  return (
    <Text {...textProps}>
      {getDisplayText(text)}
      {required && (
        <Text {...textProps} tone="error">{` (*${t('required')})`}</Text>
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
