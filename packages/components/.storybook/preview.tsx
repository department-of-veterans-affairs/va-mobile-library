import type { Preview } from '@storybook/react-native-web-vite'

import { DocsContainer } from '@storybook/addon-docs/blocks'
import { View } from 'react-native'
import { themes } from 'storybook/theming'
import React from 'react'

const preview: Preview = {
  decorators: [
    (Story) => (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Story />
      </View>
    ),
  ],
  parameters: {
    backgrounds: {}, // Show background color picker in the toolbar
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    darkMode: {
      stylePreview: true,
    },
    docs: {
      // Sets a custom container for the docs page so it toggles color scheme with Storybook UI and components
      container: (props) => {
        const webStorybookColorScheme = require('../src/utils/hooks/useWebStorybookColorScheme.ts')
        const currentProps = { ...props }
        currentProps.theme =
          webStorybookColorScheme() === 'dark' ? themes.dark : themes.light
        return React.createElement(DocsContainer, currentProps)
      },
      controls: {
        sort: 'requiredFirst',
      },
    },
    layout: 'padded', // Defaults story layout taking up the full space with some padding
  },
  tags: ['autodocs'],
}

export default preview
