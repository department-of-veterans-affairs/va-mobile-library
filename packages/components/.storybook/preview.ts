import type { Preview } from '@storybook/react-vite'

import { DocsContainer } from '@storybook/addon-docs/blocks'
import { themes } from 'storybook/theming'
import React from 'react'

const preview: Preview = {
  parameters: {
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
    },
    layout: 'padded', // Defaults story layout taking up the full space with some padding
  },
  tags: ['autodocs'],
  //
  // TODO: Add manual docs page unless there's an easy way to add a link to the docs site
  // See: https://storybook.js.org/docs/writing-docs/autodocs
  //
}

export default preview
