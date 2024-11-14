import {
  Text as RNText,
  TextProps as RNTextProps,
  TextStyle,
} from 'react-native'
import { font } from '@department-of-veterans-affairs/mobile-tokens'
import React, { FC } from 'react'

import { SpacerSize, getSpacingToken } from '../Spacer/Spacer'
import { useTheme } from '../../utils'

type TextSizes = 'xs' | 'sm' | 'md' | 'lg'
type BaseTones = 'default' | 'subtle' | 'inverse'
type BodyTones = BaseTones | 'error'

type BodyProps = {
  /** Size: xs, sm, md, or lg. Defaults to 'md' for body and heading */
  size?: TextSizes
  /** Text color: default, subtle, inverse, error. Defaults to vadsColorForegroundDefault. */
  tone?: BodyTones
  /** Variant: body, heading, or display */
  variant?: 'body'
}

type HeadingProps = {
  /** Size: xs, sm, md, or lg. Defaults to 'md' for body and heading */
  size?: TextSizes
  /** Text color: default, subtle, inverse. Defaults to vadsColorForegroundDefault. */
  tone?: BaseTones
  /** Variant: body, heading, or display */
  variant?: 'heading'
}

type DisplayProps = {
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
  /**
   * Optional bottom spacing if typography style default isn't desired.
   * @see {@link SpacerSize} for possible values
   **/
  bottomSpacing?: SpacerSize
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
      typographyKey = `${prefix}Heading${sizeMap[size as keyof typeof sizeMap]}`
      break
    default:
      typographyKey = `${prefix}Body${sizeMap[size as keyof typeof sizeMap]}`
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
