import {
  ArgsTable,
  Description,
  Primary,
  Stories,
  Subtitle,
  Title,
} from '@storybook/addon-docs'
import { ColorSchemeName, Linking, Text, View } from 'react-native'
import React, { useSyncExternalStore } from 'react'

type DocProps = {
  name: string
  docUrl: string
}

/**
 *
 * @param name - Name of the component
 * @param docUrl - URL for the component's documentation on the docs site
 * @returns
 */
export const DocLink = ({ name, docUrl }: DocProps): JSX.Element => (
  <View style={{ marginVertical: 10 }}>
    <Text
      style={{ color: 'blue', textDecorationLine: 'underline', lineHeight: 20 }}
      onPress={() => {
        Linking.openURL(docUrl)
      }}>
      View guidance for the {name} component on the VA Mobile Documentation Site
    </Text>
  </View>
)

/**
 *
 * @param name - Name of the component
 * @param docUrl - URL for the component's documentation on the docs site
 * @returns
 */
export const generateDocs = ({ name, docUrl }: DocProps) => ({
  page: () => (
    <>
      <Title />
      <Subtitle />
      <DocLink name={name} docUrl={docUrl} />
      <Description />
      <Primary />
      <ArgsTable />
      <Stories />
    </>
  ),
})

/** Function to initialize listening to light/dark mode toggle in Web Storybook to set color scheme */
export const webStorybookColorScheme = () => {
  // Mimics RN useColorScheme hook, but listens to the parent body's class ('light'/'dark' from storybook-dark-mode)
  return useSyncExternalStore(
    (callback: () => void) => {
      window.parent.addEventListener('click', callback)
      return () => window.parent.removeEventListener('click', callback)
    },
    (): ColorSchemeName => {
      const colorScheme = window.parent.document.body.className
      if (colorScheme !== 'light' && colorScheme !== 'dark') {
        return null
      }

      return colorScheme
    },
  )
}
