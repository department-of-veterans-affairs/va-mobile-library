import { View } from 'react-native'
import React, { FC } from 'react'

import { spacing } from '@department-of-veterans-affairs/mobile-tokens'

export type SpacerProps = {
  /** Size of the spacer, default sm */
  size?:
    | 'none' // 0
    | '2xs' // 4
    | 'xs' // 8
    | 'sm' // 12
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl'
  /** True for horizontal spacing */
  horizontal?: boolean
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
  const index = `vadsSpace${size[0].toUpperCase()}${size.slice(1)}`
  console.log('key', index)
  const spacerSize: number = spacing[index as keyof typeof spacing]
  console.log('spacerSize', spacerSize)
  return (
    <View
      style={{
        width: horizontal ? spacerSize : 'auto',
        height: !horizontal ? spacerSize : 'auto',
      }}
    />
  )
}
