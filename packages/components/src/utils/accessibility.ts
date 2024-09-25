import { AccessibleText } from '../types/common'

// Export related hooks
export { useIsScreenReaderEnabled } from './hooks/useIsScreenReaderEnabled'

/**
 * Returns text that should be displayed on the screen
 */
export const getDisplayText = (text: AccessibleText): string =>
  typeof text === 'string' ? text : text.text

/**
 * Returns override text to be read by screen readers
 */
export const getA11yText = (text: AccessibleText): string =>
  typeof text === 'string' ? text : text.a11y || text.text
