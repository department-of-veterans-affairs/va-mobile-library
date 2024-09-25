import { TextWithA11y } from '../types/common'

// Export related hooks
export { useIsScreenReaderEnabled } from './hooks/useIsScreenReaderEnabled'

/**
 * Returns text that should be displayed on the screen
 */
export const getDisplayText = (text: string | TextWithA11y): string =>
  typeof text === 'string' ? text : text.text

/**
 * Returns override text to be read by screen readers
 */
export const getA11yText = (text: string | TextWithA11y): string =>
  typeof text === 'string' ? text : text.a11y || text.text
