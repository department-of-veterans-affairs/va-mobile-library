// import {
//   Controls,
//   Description,
//   Primary,
//   Stories,
//   Subtitle,
//   Title,
// } from '@storybook/addon-docs'
import { Linking, Platform, Text, View } from 'react-native'

// Only import doc components on web platform
let Controls, Description, Primary, Stories, Subtitle, Title
if (Platform.OS === 'web') {
  ;({
    Controls,
    Description,
    Primary,
    Stories,
    Subtitle,
    Title,
  } = require('@storybook/addon-docs'))
} else {
  // Provide empty component implementations for native
  Controls = Description = Primary = Stories = Subtitle = Title = () => null
}

// Export related hooks
export { useWebStorybookColorScheme } from './hooks/useWebStorybookColorScheme'

type DocProps = {
  name?: string
  docUrl?: string
  /** IconGallery documentation section passthrough */
  icons?: React.JSX.Element
}

/**
 *
 * @param name - Name of the component
 * @param docUrl - URL for the component's documentation on the docs site
 * @returns
 */
export const DocLink = ({ name, docUrl }: DocProps) => {
  if (!name || !docUrl) return null

  return (
    <View style={{ marginVertical: 10 }}>
      <Text
        style={{
          color: 'blue',
          textDecorationLine: 'underline',
          lineHeight: 20,
        }}
        onPress={() => {
          Linking.openURL(docUrl)
        }}>
        View guidance for the {name} component on the VA Mobile Documentation
        Site
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
export const generateDocs = ({ name, docUrl, icons }: DocProps) =>
  Platform.OS === 'web'
    ? {
        page: () => (
          <>
            <Title />
            <Subtitle />
            <DocLink name={name} docUrl={docUrl} />
            <Description />
            <Primary />
            <Controls />
            {icons ? icons : null}
            <Stories />
          </>
        ),
      }
    : {}
