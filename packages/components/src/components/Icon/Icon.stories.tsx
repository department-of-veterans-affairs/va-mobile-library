import * as DesignTokens from '@department-of-veterans-affairs/mobile-tokens'
import { Icon, IconProps } from './Icon'
import { Meta, StoryObj } from '@storybook/react-native'
import { View } from 'react-native'
import { generateDocs } from '../../utils/storybook'
import React from 'react'

const meta: Meta<IconProps> = {
  title: 'Icon',
  component: Icon,
  parameters: {
    docs: generateDocs({
      name: 'Icon',
      docUrl:
        'https://department-of-veterans-affairs.github.io/va-mobile-app/design/Components/Icons%20and%20links/Icon',
    }),
  },
  decorators: [
    (Story) => (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Story />
      </View>
    ),
  ],
}

export default meta

type Story = StoryObj<IconProps>

export const Example: Story = {
  storyName: 'Example',
  args: {
    width: 50,
    height: 50,
    fill: DesignTokens.colorGrayMedium,
    name: 'HomeUnselected',
  },
}
