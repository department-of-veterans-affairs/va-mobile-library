import { spacing } from '@department-of-veterans-affairs/mobile-tokens'

import { SpacerSize } from '../components/Spacer/Spacer'

/**
 * Convenience function that accepts a spacing size abbreviation and returns the corresponding
 * spacing token
 */
export function getSpacingToken(size: SpacerSize): number {
  const key = `vadsSpace${size[0].toUpperCase()}${size.slice(1)}`
  return spacing[key as keyof typeof spacing]
}
