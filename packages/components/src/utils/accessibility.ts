import { AccessibleText } from '../types/common'

// Export related hooks
export { useIsScreenReaderEnabled } from './hooks/useIsScreenReaderEnabled'

export const getDisplayText = (text?: AccessibleText): string | undefined => {
  if (text) {
    return typeof text === 'object' ? text.text : text
  }
}

export const getA11yText = (text?: AccessibleText): string | undefined => {
  if (text) {
    if (typeof text === 'object') {
      return text.a11y || text.text
    }

    return text
  }
}
