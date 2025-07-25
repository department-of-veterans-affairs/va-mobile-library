import {
  ColorSchemeName,
  useColorScheme as RNUseColorScheme,
} from 'react-native'

/** Handles return of color scheme based on platform */
export function useColorScheme(): ColorSchemeName {
  // If not web Storybook, set with RN useColorScheme hook
  if (!process.env.STORYBOOK_WEB) {
    return RNUseColorScheme()
  } else {
    try {
      const webStorybookColorScheme = require('./useWebStorybookColorScheme') // eslint-disable-line
      return webStorybookColorScheme()
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return null
    }
  }
}
