import {
  Text as RNText,
  TextProps as RNTextProps,
  TextStyle,
} from 'react-native'
import { colors, font } from '@department-of-veterans-affairs/mobile-tokens'
import React, { FC } from 'react'

import { BaseColor } from '../../utils'
import { SpacerSize, getSpacingToken } from '../Spacer/Spacer'

type BodyOrHeadingProps = {
  /** Variant: body, heading, display, or navigation */
  variant?: 'body' | 'heading'
  /** Size: xs, sm, md, or lg. Defaults to 'md' for body and heading */
  size?: 'xs' | 'sm' | 'md' | 'lg'
}

type DisplayOrNavigationProps = {
  /** Variant: body, heading, display, or navigation */
  variant?: 'display' | 'navigation'
  size?: never
}

export type TextProps = {
  children: React.ReactNode
  /** AccessibilityLabel for the text */
  a11yLabel?: string
  /**
   * Text color. Defaults to vadsColorForegroundDefault. See {@link colors} for possible values
   */
  color?: keyof typeof colors
  /**
   * Optional bottom spacing if typography style default isn't desired.
   * @see {@link SpacerSize} for possible values
   **/
  bottomSpacing?: SpacerSize
} & (BodyOrHeadingProps | DisplayOrNavigationProps)

export const Text: FC<TextProps> = ({
  children,
  a11yLabel,
  bottomSpacing,
  color,
  size = 'md',
  variant = 'body',
}) => {
  let style: TextStyle = {}
  const defaultColor = BaseColor()
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
    case 'navigation':
      key = `${prefix}Navigation`
      break
    case 'display':
      key = `${prefix}Display`
      break
    case 'heading':
      key = `${prefix}Heading${sizeMap[size as keyof typeof sizeMap]}`
      break
    default:
      key = `${prefix}Body${sizeMap[size as keyof typeof sizeMap]}`
  }

  style = {
    ...typography[key as keyof typeof typography],
    color: color ? colors[color] : defaultColor,
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
