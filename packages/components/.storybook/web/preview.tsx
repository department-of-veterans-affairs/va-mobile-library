import React from 'react'
import { DocsContainer } from '@storybook/addon-docs'
import { themes } from '@storybook/theming'
import { useDarkMode } from 'storybook-dark-mode'
import { DARK_MODE_EVENT_NAME } from 'storybook-dark-mode';
import { addons } from '@storybook/addons';

addons.getChannel().on(DARK_MODE_EVENT_NAME, isDarkMode => {
  console.log('GET CHANNEL DARK_MODE: ', isDarkMode);
  const iframe = document.querySelector(
    'iframe[src="https://department-of-veterans-affairs.github.io/va-mobile-library"]',
  );
  console.log('iframe: ', iframe);
  if (iframe) {
    iframe.contentWindow.postMessage(
      {
        key: 'storybook-channel',
        event: 'DARK_MODE',
        value: isDarkMode ? themes.dark : themes.light,
      },
      '*',
    );
  }
});

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
    controls: {
      sort: 'requiredFirst',
    },
  },
}
