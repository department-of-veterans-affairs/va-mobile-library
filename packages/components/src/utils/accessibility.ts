import { StringOrTextWithA11y } from '../types'

// Export related hooks
export { useIsScreenReaderEnabled } from './hooks/useIsScreenReaderEnabled'
export { useA11yListPosition } from './hooks/useA11yListPosition'

/**
 * Returns text that should be displayed on the screen
 */
export const getDisplayText = (text: StringOrTextWithA11y): string =>
  typeof text === 'string' ? text : text.text

/**
 * Returns a11y override text or just text if a11y isn't provided
 */
export const getA11yLabel = (text: StringOrTextWithA11y): string =>
  typeof text === 'string' ? text : text.a11yLabel || text.text
