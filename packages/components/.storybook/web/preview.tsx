import React from 'react'
import { DocsContainer } from '@storybook/addon-docs'
import { addons } from '@storybook/preview-api'
import { themes } from '@storybook/theming'
import { useDarkMode } from 'storybook-dark-mode'

const channel = addons.getChannel()

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  darkMode: {
    stylePreview: true,
  },
  docs: {
    container: (props) => {
      const isDark = useDarkMode()
      const currentProps = { ...props }
      currentProps.theme = isDark ? themes.dark : themes.light
      return React.createElement(DocsContainer, currentProps)
    },
  },
}
