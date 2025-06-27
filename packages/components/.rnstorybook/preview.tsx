import type { Preview } from '@storybook/react-vite'
import { View } from 'react-native'

const preview: Preview = {
  parameters: {},
  decorators: [
    // Centers story components in the middle of the screen
    (Story) => (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Story />
      </View>
    ),
  ],
}

export default preview
