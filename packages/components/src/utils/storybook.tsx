import { ColorSchemeName, Linking, Text, View } from 'react-native'
import {
  Controls,
  Description,
  Primary,
  Stories,
  Subtitle,
  Title,
} from '@storybook/addon-docs'
import React, { useSyncExternalStore } from 'react'

type DocProps = {
  name?: string
  docUrl?: string
  icons?: React.JSX.Element
}

/**
 *
 * @param name - Name of the component
 * @param docUrl - URL for the component's documentation on the docs site
 * @returns
 */
export const DocLink = ({
  name,
  docUrl,
}: Required<Pick<DocProps, 'name' | 'docUrl'>>): JSX.Element => (
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
 * @param icons - IconGallery documentation section passthrough
 * @returns
 */
export const generateDocs = ({ name, docUrl, icons }: DocProps) => ({
  page: () => (
    <>
      <Title />
      <Subtitle />
      {name && docUrl ? <DocLink name={name} docUrl={docUrl} /> : null}
      <Description />
      <Primary />
      <Controls />
      {icons ? icons : null}
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
