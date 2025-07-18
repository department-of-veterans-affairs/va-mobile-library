import type { Preview } from '@storybook/react-native-web-vite'

import { DocsContainer } from '@storybook/addon-docs/blocks'
import { View } from 'react-native'
import { createElement, useState, useEffect } from 'react'
import { themes } from 'storybook/theming'

const CustomDocsContainer = (props) => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Function to safely check dark mode state
  const checkDarkMode = () => {
    try {
      // Try to access parent document (works when not in nested iframe)
      const parentBodyClass = window.parent.document.body.className
      return parentBodyClass === 'dark'
    } catch (error) {
      try {
        // Fallback: check current document's body class
        return document.body.className === 'dark'
      } catch (fallbackError) {
        // Final fallback: check system preference
        if (typeof window !== 'undefined' && window.matchMedia) {
          return window.matchMedia('(prefers-color-scheme: dark)').matches
        }
        return false
      }
    }
  }

  useEffect(() => {
    // Set initial state
    setIsDarkMode(checkDarkMode())

    // Set up listeners for dark mode changes
    const handleChange = () => {
      setIsDarkMode(checkDarkMode())
    }

    let parentCleanup: (() => void) | null = null
    let currentCleanup: (() => void) | null = null
    let mediaQueryCleanup: (() => void) | null = null

    try {
      // Listen to parent document changes (primary method)
      const parentDoc = window.parent.document
      const observer = new MutationObserver(handleChange)
      observer.observe(parentDoc.body, {
        attributes: true,
        attributeFilter: ['class'],
      })
      parentCleanup = () => observer.disconnect()
    } catch (error) {
      try {
        // Fallback: listen to current document changes
        const observer = new MutationObserver(handleChange)
        observer.observe(document.body, {
          attributes: true,
          attributeFilter: ['class'],
        })
        currentCleanup = () => observer.disconnect()
      } catch (fallbackError) {
        // Final fallback: listen to system preference changes
        if (typeof window !== 'undefined' && window.matchMedia) {
          const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
          mediaQuery.addEventListener('change', handleChange)
          mediaQueryCleanup = () =>
            mediaQuery.removeEventListener('change', handleChange)
        }
      }
    }

    // Cleanup function
    return () => {
      parentCleanup?.()
      currentCleanup?.()
      mediaQueryCleanup?.()
    }
  }, [])

  const currentProps = { ...props }
  currentProps.theme = isDarkMode ? themes.dark : themes.light
  return createElement(DocsContainer, currentProps)
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
      // Sets a custom container for the docs page so it toggles color scheme with Storybook UI and components
      // container: (props) => {
      //   // const webStorybookColorScheme = require('../src/utils/hooks/useWebStorybookColorScheme.ts')
      //   const currentProps = { ...props }
      //   currentProps.theme = themes.light
      //   // webStorybookColorScheme() === 'dark' ? themes.dark : themes.light
      //   return createElement(DocsContainer, currentProps)
      // },
      container: CustomDocsContainer, // Use the custom DocsContainer to handle dark mode
      controls: { sort: 'requiredFirst' },
    },
    layout: 'padded', // Defaults story layout taking up the full space with some padding
  },
  tags: ['autodocs'],
}

export default preview
