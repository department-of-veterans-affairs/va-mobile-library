import AsyncStorage from '@react-native-async-storage/async-storage'

import { view } from './storybook.requires'

const StorybookUIRoot = view.getStorybookUI({
  // Used to persist the selected story between reloads
  storage: {
    getItem: AsyncStorage.getItem,
    setItem: AsyncStorage.setItem,
  },
})

export default StorybookUIRoot
