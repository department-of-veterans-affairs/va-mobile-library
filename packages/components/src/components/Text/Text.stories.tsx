import { Meta, StoryObj } from '@storybook/react'
import { View } from 'react-native'
import React from 'react'

import { Text, TextProps } from './Text'
import { generateDocs } from '../../utils/storybook'

const meta: Meta<TextProps> = {
  title: 'Text',
  component: Text,
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
  parameters: {
    docs: generateDocs({
      name: 'Text',
      // docUrl:
      //   'https://department-of-veterans-affairs.github.io/va-mobile-app/design/Components/Alerts%20and%20Progress/Text',
    }),
  },
}

export default meta

type Story = StoryObj<TextProps>

export const Body: Story = {
  render: (props: TextProps) => (
    <>
      <Text {...props} />
      <Text {...props} />
    </>
  ),
  args: {
    children:
      'Aenean sodales euismod metus non hendrerit. Integer vitae libero vel urna efficitur ornare. Ut mattis nec erat nec vulputate. Quisque quis erat tellus. Fusce vel felis ut augue commodo feugiat vel vitae lacus. Cras a augue ligula. Suspendisse vestibulum lobortis velit.',
    variant: 'body',
    size: 'md',
  },
}

export const _Heading: Story = {
  args: {
    children: 'Example heading text',
    variant: 'heading',
    size: 'md',
  },
}

export const __Display: Story = {
  args: {
    children: 'Example display text',
    variant: 'display',
  },
}

export const ___Navigation: Story = {
  args: {
    children: 'Example navigation text',
    variant: 'navigation',
  },
}
