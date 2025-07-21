import type { Preview } from '@storybook/react-native-web-vite'

import { DocsContainer } from '@storybook/addon-docs/blocks'
import { View } from 'react-native'
import { createElement } from 'react'
import { themes } from 'storybook/theming'

import { useWebStorybookColorScheme } from '../src/utils/hooks/useWebStorybookColorScheme.ts'

/**
 * Custom DocsContainer to update theme in Storybook according to the light/dark mode toggle
 */
const CustomDocsContainer = (props) => {
  const colorScheme = useWebStorybookColorScheme()
  const theme = colorScheme === 'dark' ? themes.dark : themes.light
  return createElement(DocsContainer, { ...props, theme })
}

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
    darkMode: { stylePreview: true },
    docs: {
      container: CustomDocsContainer,
      controls: { sort: 'requiredFirst' },
    },
    layout: 'padded', // Defaults story layout taking up the full space with some padding
  },
  tags: ['autodocs'],
}

export default preview
