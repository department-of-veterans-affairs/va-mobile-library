import React from 'react'
import { View } from 'react-native'
import { I18nextProvider } from 'react-i18next'
import { useFonts } from 'expo-font'

import i18n from 'utils/translation/i18n'

const App = () => {
  // Loads in custom fonts async
  const [fontsLoaded, fontError] = useFonts({
    'SourceSansPro-Bold': require('./assets/fonts/SourceSansPro/SourceSansPro-Bold.ttf'),
    'SourceSansPro-Regular': require('./assets/fonts/SourceSansPro/SourceSansPro-Regular.ttf'),
  })

  const StorybookUI = require('../.storybook/native').default

  return (
    <I18nextProvider i18n={i18n}>
      <View style={{ flex: 1 }}>
        <StorybookUI />
      </View>
    </I18nextProvider>
  )
}

export default App
