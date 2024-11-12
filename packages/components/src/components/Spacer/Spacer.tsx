import { View } from 'react-native'
import React, { FC } from 'react'

import { spacing } from '@department-of-veterans-affairs/mobile-tokens'

/**
 * Represents the size of a spacer component. Corresponds to spacing tokens.
 * - 'none': 0
 * - '2xs': 4
 * - 'xs': 8
 * - 'sm': 12
 * - 'md': 16
 * - 'lg': 20
 * - 'xl': 24
 * - '2xl': 28
 * - '3xl': 32
 * - '4xl': 36
 * - '5xl': 40
 * - '6xl': 44
 */
export type SpacerSize =
  | 'none'
  | '2xs'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl'

export type SpacerProps = {
  /**
   * Size of the spacer, defaults to sm (12).
   * @see {@link SpacerSize} for possible values
   **/
  size?: SpacerSize

  /** True for horizontal spacing */
  horizontal?: boolean
}

/**
 * Convenience function that accepts a spacing size abbreviation and returns the corresponding
 * spacing token
 */
export function getSpacingToken(size: SpacerSize): number {
  const key = `vadsSpace${size[0].toUpperCase()}${size.slice(1)}`
  return spacing[key as keyof typeof spacing]
}

/**
 * Convenience component for handling spacing without managing margin/padding between elements
 * @param size - Size of the spacer, default sm (12)
 * @param horizontal - True for horizontal spacing
 * @returns A non-visible component sized to provide appropriate spacing
 */
export const Spacer: FC<SpacerProps> = ({
  size = 'sm',
  horizontal = false,
}) => {
  const spacerSize = getSpacingToken(size)

  return (
    <View
      style={{
        width: horizontal ? spacerSize : 'auto',
        height: !horizontal ? spacerSize : 'auto',
      }}
    />
  )
}
