import React from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { I18nextProvider } from 'react-i18next'
import i18n from 'utils/translation/i18n'

const App = () => {
  const StorybookUI = require('../.storybook/native').default
  return (
    // <I18nextProvider i18n={i18n}>
        <View style={{ flex: 1 }}>
          <StorybookUI />
        </View>
    // </I18nextProvider>
  )
}

export default App
