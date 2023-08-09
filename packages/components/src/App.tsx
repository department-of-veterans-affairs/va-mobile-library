import React from 'react'
import { registerRootComponent } from 'expo'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { I18nextProvider } from 'react-i18next'
import i18n from 'utils/translation/i18n'

const storybookEnabled = process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === 'true'

const App = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <SafeAreaView>
        <Text>Hello world</Text>
      </SafeAreaView>
    </I18nextProvider>
  )
}

let EntryPoint = App

if (storybookEnabled) {
  const StorybookUI = require('../.storybook/native').default
  EntryPoint = () => {
    return (
      <View style={{ flex: 1 }}>
        <StorybookUI />
      </View>
    )
  }
}

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(EntryPoint)
