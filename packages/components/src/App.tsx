import React from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const App = () => {
  const StorybookUI = require('../.storybook/native').default
  return (
    <View style={{ flex: 1 }}>
      <StorybookUI />
    </View>
  )
}

export default App

