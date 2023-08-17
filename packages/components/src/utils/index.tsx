import React from 'react'
import { Text, Linking } from 'react-native';

type DocLinkProps = {
  url: string
};

export const DocLink = ({ url }: DocLinkProps): JSX.Element => (
  <Text>Visit
    <Text
      style={{color: 'red'}}
      onPress={() => {Linking.openURL(url)}}
    >
      doc site
    </Text>.
  </Text>
)
