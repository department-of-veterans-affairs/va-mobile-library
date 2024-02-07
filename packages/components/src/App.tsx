import * as SplashScreen from 'expo-splash-screen'
import { ColorSchemeName, Platform, View } from 'react-native'
import { I18nextProvider } from 'react-i18next'
import { registerRootComponent } from 'expo'
import { useFonts } from 'expo-font'
import React, { useCallback, useSyncExternalStore } from 'react'

import StorybookUI from '../.storybook/native'
import i18n from './utils/translation/i18n'

SplashScreen.preventAutoHideAsync()

/** Function to initiate Expo/Storybook running of components package */
export const initiateExpo = (expoApp: typeof App) => {
  // registerRootComponent calls AppRegistry.registerComponent('main', () => App);
  // It also ensures that whether you load the app in Expo Go or in a native build,
  // the environment is set up appropriately
  registerRootComponent(expoApp)
}

/** Function to initialize listening to light/dark mode toggle in Web Storybook to set color scheme */
export const webStorybookColorScheme = () => {
  // Mimics RN useColorScheme hook, but listens to the parent body's class ('light'/'dark' from storybook-dark-mode)
  return useSyncExternalStore(
    (callback) => {
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

const App = () => {
  // Loads in custom fonts async conditionally based on OS. Loading from node
  // module seems to be broken on Android
  const [fontsLoaded, fontError] = useFonts({
    'SourceSansPro-Bold': require('@department-of-veterans-affairs/mobile-assets/fonts/SourceSansPro/SourceSansPro-Bold.ttf'),
    'SourceSansPro-Regular': require('@department-of-veterans-affairs/mobile-assets/fonts/SourceSansPro/SourceSansPro-Bold.ttf'),
  })

  // Holds rendering until custom fonts load
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded, fontError])

  if (!fontsLoaded && !fontError) {
    return null
  }

  return (
    <I18nextProvider i18n={i18n}>
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <StorybookUI />
      </View>
    </I18nextProvider>
  )
}

export default App
