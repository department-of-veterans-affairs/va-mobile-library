import * as SplashScreen from 'expo-splash-screen'
import { I18nextProvider } from 'react-i18next'
import { View } from 'react-native'
import { registerRootComponent } from 'expo'
import { useFonts } from 'expo-font'
import React, { useCallback } from 'react'

import { SnackbarProviderWithSafeArea } from './components/Snackbar/SnackbarProvider'
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

const App = () => {
  // Loads in custom fonts async conditionally based on OS. Loading from node
  // module seems to be broken on Android
  const [fontsLoaded, fontError] = useFonts({
    'Bitter-Regular': require('@department-of-veterans-affairs/mobile-assets/fonts/Bitter/Bitter-Regular.ttf'),
    'SourceSansPro-Bold': require('@department-of-veterans-affairs/mobile-assets/fonts/SourceSansPro/SourceSansPro-Bold.ttf'),
    'SourceSansPro-Regular': require('@department-of-veterans-affairs/mobile-assets/fonts/SourceSansPro/SourceSansPro-Regular.ttf'),
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
      <SnackbarProviderWithSafeArea>
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
          <StorybookUI />
        </View>
      </SnackbarProviderWithSafeArea>
    </I18nextProvider>
  )
}

export default App
