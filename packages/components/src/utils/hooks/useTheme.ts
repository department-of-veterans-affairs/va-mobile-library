import { ColorSchemeName } from 'react-native'
import { Theme, themes } from '@department-of-veterans-affairs/mobile-tokens'

import { useColorScheme } from '../style'

/** Returns light/dark theme based on useColorScheme */
export function useTheme(): Theme {
  const themeName: ColorSchemeName = useColorScheme() || 'light'
  return themes[themeName]
}
