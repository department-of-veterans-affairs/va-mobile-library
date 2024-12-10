import { Meta, StoryObj } from '@storybook/react'
import { View } from 'react-native'
import React from 'react'

import { Text, TextProps, baseToneValues } from './Text'
import { generateDocs } from '../../utils/storybook'

const meta: Meta<TextProps> = {
  title: 'Text',
  component: Text,
  decorators: [
    (Story) => (
      <View
        style={{
          flex: 1,
          margin: 12,
        }}>
        <Story />
      </View>
    ),
  ],
  parameters: {
    docs: generateDocs({
      name: 'Text',
      docUrl:
        'https://department-of-veterans-affairs.github.io/va-mobile-app/design/Components/Typography/Text',
    }),
  },
  argTypes: {
    /** The foollowing conditions hide the tone and size props if variant's value is 'display' */
    size: { if: { arg: 'variant', neq: 'display' } },
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

const baseToneArgs = {
  tone: { control: 'radio', options: baseToneValues },
}

export const _Heading: Story = {
  argTypes: baseToneArgs,
  args: {
    children,
    variant: 'heading',
    size: 'md',
  },
}

export const __Display: Story = {
  argTypes: baseToneArgs,
  args: {
    children,
    variant: 'display',
  },
}
