import { Text as RNText, TextStyle } from 'react-native'
import { colors, font } from '@department-of-veterans-affairs/mobile-tokens'
import React, { FC } from 'react'

import { BaseColor } from '../../utils'
import { Spacer, SpacerSize } from '../Spacer/Spacer'

type BodyOrHeadingProps = {
  /** Text variant. e.g. body, heading, display, or navigation */
  variant?: 'body' | 'heading'
  /** Text size. e.g. xs, sm, md, or lg */
  size: 'xs' | 'sm' | 'md' | 'lg'
}

type DisplayOrNavigationProps = {
  /** Text variant. e.g. body, heading, display, or navigation */
  variant?: 'display' | 'navigation'
  size?: never
}

export type TextProps = {
  children: React.ReactNode
  /**
   * Optional text color. See {@link colors}} for possible values
   */
  color?: keyof typeof colors
  /**
   * Optional bottom spacing if typography style default isn't desired.
   * @see {@link SpacerSize} for possible values
   **/
  bottomSpacing?: SpacerSize
} & (BodyOrHeadingProps | DisplayOrNavigationProps)

export const Text: FC<TextProps> = ({
  color,
  children,
  size,
  bottomSpacing,
  variant = 'body',
}) => {
  let style: TextStyle = {}
  const textColor = color ? colors[color] : BaseColor()
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

  style = { ...typography[key as keyof typeof typography], color: textColor }

  /** Set margin to 0 and use Spacer component if custom spacing provided */
  if (bottomSpacing) {
    style.marginBottom = 0
  }

  return (
    <>
      <RNText style={style}>{children}</RNText>
      <Spacer size={bottomSpacing ? bottomSpacing : 'none'} />
    </>
  )
}
