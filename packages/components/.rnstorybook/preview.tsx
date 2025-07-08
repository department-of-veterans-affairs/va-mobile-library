import type { Preview } from '@storybook/react-native'
import { View } from 'react-native'

const preview: Preview = {
  decorators: [
    // Flexes to fill space, centers story components horizontally, and adds padding
    (Story) => (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          padding: 12,
        }}>
        <Story />
      </View>
    ),
  ],
  parameters: {},
}

export default preview
