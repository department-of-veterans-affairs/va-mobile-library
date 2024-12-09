import {
  Text as RNText,
  TextProps as RNTextProps,
  TextStyle,
} from 'react-native'
import { font } from '@department-of-veterans-affairs/mobile-tokens'
import React, { FC } from 'react'

import { SpacerSize } from '../Spacer/Spacer'
import { getSpacingToken, useTheme } from '../../utils'

type TextSizes = 'xs' | 'sm' | 'md' | 'lg'

/** Declaring the BaseTones type like this allows us to reference this array in Text.stories */
export const baseToneValues = ['default', 'subtle', 'inverse'] as const

type BaseTones = (typeof baseToneValues)[number]

type BodyTones = BaseTones | 'error'

type BodyProps = {
  /**
   * Optionally set bottom spacing to none if typography style default isn't desired
   **/
  bottomSpacing?: 'none'
  /** Size: xs, sm, md, or lg. Defaults to 'md' for body and heading */
  size?: TextSizes
  /** Text color: default, subtle, inverse, error. Defaults to vadsColorForegroundDefault. */
  tone?: BodyTones
  /** Variant: body, heading, or display */
  variant?: 'body'
}

type HeadingProps = {
  /**
   * Optional bottom spacing if typography style default isn't desired.
   * @see {@link SpacerSize} for possible values
   **/
  bottomSpacing?: SpacerSize
  /** Size: xs, sm, md, or lg. Defaults to 'md' for body and heading */
  size?: TextSizes
  /** Text color: default, subtle, inverse. Defaults to vadsColorForegroundDefault. */
  tone?: BaseTones
  /** Variant: body, heading, or display */
  variant?: 'heading'
}

type DisplayProps = {
  /**
   * Optional bottom spacing if typography style default isn't desired.
   * @see {@link SpacerSize} for possible values
   **/
  bottomSpacing?: SpacerSize
  size?: never
  /** Text color: default, subtle, inverse. Defaults to vadsColorForegroundDefault. */
  tone?: BaseTones
  /** Variant: body, heading, or display */
  variant?: 'display'
}

export type TextProps = {
  children: React.ReactNode
  /** AccessibilityLabel for the text */
  a11yLabel?: string
} & (BodyProps | HeadingProps | DisplayProps)

export const Text: FC<TextProps> = ({
  a11yLabel,
  bottomSpacing,
  children,
  size = 'md',
  tone = 'default',
  variant = 'body',
}) => {
  const theme = useTheme()
  const { typography } = font
  let typographyKey, color

  const prefix = 'vadsFont'

  const sizeMap = {
    xs: 'Xsmall',
    sm: 'Small',
    md: 'Medium',
    lg: 'Large',
  }

  /** Build typography key based on variant and size props */
  switch (variant) {
    case 'display':
      typographyKey = `${prefix}Display`
      break
    case 'heading':
      typographyKey = `${prefix}Heading${sizeMap[size]}`
      break
    default:
      typographyKey = `${prefix}Body${sizeMap[size]}`
  }

  /** Set color based on tone */
  switch (tone) {
    case 'subtle':
      color = theme.vadsColorForegroundSubtle
      break
    case 'inverse':
      color = theme.vadsColorForegroundInverse
      break
    case 'error':
      color = theme.vadsColorForegroundError
      break
    default:
      color = theme.vadsColorForegroundDefault
  }

  const style: TextStyle = {
    ...typography[typographyKey as keyof typeof typography],
    color,
  }

  /** Set bottom margin to custom bottomSpacing if provided */
  if (bottomSpacing) {
    style.marginBottom = getSpacingToken(bottomSpacing)
  }

  const textProps: RNTextProps = {
    accessibilityLabel: a11yLabel,
    style,
    role: variant === 'heading' ? 'heading' : undefined,
  }

  return <RNText {...textProps}>{children}</RNText>
}
