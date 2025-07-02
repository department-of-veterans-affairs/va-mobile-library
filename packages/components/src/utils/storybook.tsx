import {
  Controls,
  Description,
  IconGallery,
  IconItem,
  Primary,
  Stories,
  Subtitle,
  Title,
} from '@storybook/addon-docs/blocks'
import { Linking, Text, View } from 'react-native'
import React from 'react'

import { Icon } from '../components/Icon/Icon'
import { IconMap } from '../components/Icon/iconList'
import { useTheme } from '../utils/hooks/useTheme'

// Export related hooks
export { useWebStorybookColorScheme } from './hooks/useWebStorybookColorScheme'

type DocProps = {
  name?: string
  docUrl?: string
  icons?: typeof IconMap
}

/**
 *
 * @param name - Name of the component
 * @param docUrl - URL for the component's documentation on the docs site
 * @returns
 */
export const DocLink = ({ name, docUrl }: DocProps) => {
  if (!name || !docUrl) return null

  const theme = useTheme()

  return (
    <View style={{ marginVertical: 10 }}>
      <Text
        style={{
          color: theme.vadsColorActionForegroundDefault,
          textDecorationLine: 'underline',
          lineHeight: 20,
        }}
        onPress={() => {
          Linking.openURL(docUrl)
        }}>
        View guidance for the {name} component on the VA Design System
      </Text>
    </View>
  )
}

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
      <DocLink name={name} docUrl={docUrl} />
      <Description />
      <Primary />
      <Controls />
      {icons ? buildIconGallery(icons) : null}
      <Stories />
    </>
  ),
})

/**
 * Function to create a gallery of all icons for documentation
 * @returns JSX Element containing grid displaying all icons
 */
const buildIconGallery = (icons: typeof IconMap) => {
  const iconItems = []
  const iconMapArray = Object.keys(icons)

  for (const icon of iconMapArray) {
    iconItems.push(
      <IconItem name={icon} key={icon}>
        {/* @ts-ignore - Typed as string, but derived from IconMap names */}
        <Icon name={icon} />
      </IconItem>,
    )
  }

  return <IconGallery>{iconItems}</IconGallery>
}

export default generateDocs
