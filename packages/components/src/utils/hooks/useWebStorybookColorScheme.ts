import { ColorSchemeName } from 'react-native'
import { useSyncExternalStore } from 'react'

/** Function to initialize listening to light/dark mode toggle in Web Storybook to set color scheme */
export const useWebStorybookColorScheme = () => {
  /**
   * Subscribe to listening for clicks on the parent document
   */
  const subscribeForClicks = (callback: () => void) => {
    try {
      window.parent.addEventListener('click', callback)
      return () => window.parent.removeEventListener('click', callback)
    } catch {
      // Storybook composition (VADS Storybook) doesn't allow access to parent document, fail gracefully
      return () => null
    }
  }

  /**
   * Determine current color scheme from the parent document's body class
   */
  const currentColorScheme = (): ColorSchemeName => {
    try {
      const colorScheme = window.parent.document.body.className
      if (colorScheme !== 'light' && colorScheme !== 'dark') {
        return null
      }

      return colorScheme
    } catch {
      // Storybook composition (VADS Storybook) doesn't allow access to parent document, fail gracefully
      return null
    }
  }

  // Mimics RN useColorScheme hook, but listens to the parent body's class ('light'/'dark' from storybook-dark-mode)
  return useSyncExternalStore(subscribeForClicks, currentColorScheme)
}

export default useWebStorybookColorScheme
