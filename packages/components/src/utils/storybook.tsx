import {
  ArgsTable,
  Description,
  Primary,
  Stories,
  Subtitle,
  Title,
} from '@storybook/addon-docs'
import { Linking, Text, View } from 'react-native'

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
      }}
    >
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
