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
      'Lorem ipsum odor amet, consectetuer adipiscing elit. Ex ultricies auctor per eros et nec mauris. Ut nibh risus ligula vivamus est nascetur class auctor. Faucibus facilisis integer hac ullamcorper vulputate.',
    variant: 'body',
    size: 'md',
  },
}

const children = 'Lorem ipsum dolor sit amet.'

export const _Heading: Story = {
  args: {
    children,
    variant: 'heading',
    size: 'md',
  },
}

export const __Display: Story = {
  args: {
    children,
    variant: 'display',
  },
}
