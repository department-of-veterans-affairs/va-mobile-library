import React from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { I18nextProvider } from 'react-i18next'
import i18n from 'utils/translation/i18n'

const App = () => {
  const StorybookUI = require('../.storybook/native').default
  return (
    <View style={{ flex: 1 }}>
      <StorybookUI />
    </View>
  )
}

export default App

