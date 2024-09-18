import { ColorSchemeName } from 'react-native'
import { useSyncExternalStore } from 'react'

/** Function to initialize listening to light/dark mode toggle in Web Storybook to set color scheme */
export const useWebStorybookColorScheme = () => {
  // Mimics RN useColorScheme hook, but listens to the parent body's class ('light'/'dark' from storybook-dark-mode)
  return useSyncExternalStore(
    (callback: () => void) => {
      window.parent.addEventListener('click', callback)
      return () => window.parent.removeEventListener('click', callback)
    },
    (): ColorSchemeName => {
      const colorScheme = window.parent.document.body.className
      if (colorScheme !== 'light' && colorScheme !== 'dark') {
        return null
      }

      return colorScheme
    },
  )
}
