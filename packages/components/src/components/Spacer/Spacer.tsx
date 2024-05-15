import { View } from 'react-native'
import React, { FC } from 'react'

export type SpacerProps = {
  /** Size of the spacer, default 10 */
  size?: number
  /** True for horizontal spacing */
  horizontal?: boolean
}

/**
 * Convenience component for handling spacing without managing margin/padding between elements
 * @param size - Size of the spacer, default 10
 * @param horizontal - True for horizontal spacing
 * @returns A non-visible component sized to provide appropriate spacing
 */
export const Spacer: FC<SpacerProps> = ({ size = 10, horizontal = false }) => {
  return (
    <View
      style={{
        width: horizontal ? size : 'auto',
        height: !horizontal ? size : 'auto',
      }}
    />
  )
}
