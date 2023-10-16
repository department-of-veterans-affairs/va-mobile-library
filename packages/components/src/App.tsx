import * as SplashScreen from 'expo-splash-screen'
import { Appearance, NativeModules, View } from 'react-native'
import { I18nextProvider } from 'react-i18next'
import { registerRootComponent } from 'expo'
import { useDarkMode } from 'storybook-dark-mode'
import { useFonts } from 'expo-font'
import React, { useCallback, useEffect } from 'react'

import i18n from './utils/translation/i18n'

SplashScreen.preventAutoHideAsync()

export const initiateExpo = (expoApp: typeof App) => {
  // registerRootComponent calls AppRegistry.registerComponent('main', () => App);
  // It also ensures that whether you load the app in Expo Go or in a native build,
  // the environment is set up appropriately
  registerRootComponent(expoApp)
}

/** Function for web Storybook to override setting colorScheme based on UI toggle button */
function webStorybookColorSchemeOverride() {
  // If not web Storybook, no override
  if (!process.env.STORYBOOK) {
    return
  }

  const mode = useDarkMode() ? 'dark' : 'light'
  Appearance.setColorScheme('light')
  // NativeModules.Appearance.setColorScheme('light')
  console.log('useDarkModeToggledTo: ' + mode)
}

const App = () => {
  // Loads in custom fonts async
  const [fontsLoaded, fontError] = useFonts({
    'SourceSansPro-Bold': require('./assets/fonts/SourceSansPro/SourceSansPro-Bold.ttf'),
    'SourceSansPro-Regular': require('./assets/fonts/SourceSansPro/SourceSansPro-Regular.ttf'),
  })

  // useEffect(() => {
  //   console.log('test')
  //   webStorybookColorSchemeOverride()
  // })
  // console.log('test')
  // webStorybookColorSchemeOverride()

  // Holds rendering until custom fonts load
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded, fontError])

  if (!fontsLoaded && !fontError) {
    return null
  }

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const StorybookUI = require('../.storybook/native').default

  return (
    <I18nextProvider i18n={i18n}>
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <StorybookUI />
      </View>
    </I18nextProvider>
  )
}

export default App
