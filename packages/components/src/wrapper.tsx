import { View } from 'react-native'
import { I18nextProvider } from 'react-i18next'

import i18n from './utils/translation/i18n'

const App = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <View style={{ flex: 1, backgroundColor: 'red' }}>
        
      </View>
    </I18nextProvider>
  )
}

export default App
