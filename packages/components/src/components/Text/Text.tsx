import {
  Text as RNText,
  TextProps as RNTextProps,
  TextStyle,
} from 'react-native'
import { colors, font } from '@department-of-veterans-affairs/mobile-tokens'
import React, { FC } from 'react'

import { BaseColor, useTheme } from '../../utils'
import { SpacerSize, getSpacingToken } from '../Spacer/Spacer'

type TextSizes = 'xs' | 'sm' | 'md' | 'lg'
type BaseTones = 'default' | 'subtle' | 'inverse'
type BodyTones = BaseTones | 'error'

type BodyProps = {
  /** Variant: body, heading, display, or navigation */
  variant?: 'body'
  /** Text color: default, subtle, inverse, error. Defaults to vadsColorForegroundDefault. */
  tone?: BodyTones
  /** Size: xs, sm, md, or lg. Defaults to 'md' for body and heading */
  size?: TextSizes
}

type HeadingProps = {
  /** Variant: body, heading, display, or navigation */
  variant?: 'heading'
  /** Text color: default, subtle, inverse. Defaults to vadsColorForegroundDefault. */
  tone?: BaseTones
  /** Size: xs, sm, md, or lg. Defaults to 'md' for body and heading */
  size?: TextSizes
}

type DisplayProps = {
  /** Variant: body, heading, display, or navigation */
  variant?: 'display'
  /** Text color: default, subtle, inverse. Defaults to vadsColorForegroundDefault. */
  tone?: BaseTones
  size?: never
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
  children,
  a11yLabel,
  bottomSpacing,
  tone = 'default',
  size = 'md',
  variant = 'body',
}) => {
  const defaultColor = BaseColor()
  const theme = useTheme()
  let color

  /**
   * Convenience function to get typography token based on variant and size abbreviation
   */
  const getTypographyToken = (
    variant:
      | BodyProps['variant']
      | HeadingProps['variant']
      | DisplayProps['variant'],
    size: TextSizes,
  ) => {
    const { typography } = font

    const prefix = 'vadsFont'

    const sizeMap = {
      xs: 'Xsmall',
      sm: 'Small',
      md: 'Medium',
      lg: 'Large',
    }

    let key

    /** Build typography token key based on variant and size props */
    switch (variant) {
      case 'display':
        key = `${prefix}Display`
        break
      case 'heading':
        key = `${prefix}Heading${sizeMap[size as keyof typeof sizeMap]}`
        break
      default:
        key = `${prefix}Body${sizeMap[size as keyof typeof sizeMap]}`
    }

    return typography[key as keyof typeof typography]
  }

  const getColor = (tone: BodyProps['tone']): string => {
    switch (tone) {
      case 'subtle':
        return theme.vadsColorForegroundSubtle
      case 'inverse':
        return theme.vadsColorForegroundInverse
      case 'error':
        return theme.vadsColorForegroundError
      default:
        return theme.vadsColorForegroundDefault
    }
  }

  const style: TextStyle = {
    ...getTypographyToken(variant, size),
    color: getColor(tone),
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
