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
          justifyContent: 'center',
          alignItems: 'center',
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
    tone: { if: { arg: 'variant', neq: 'display' } },
    size: { if: { arg: 'variant', neq: 'display' } },
    bold: { if: { arg: 'variant', eq: 'body' } },
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
  argTypes: {
    tone: { control: 'radio', options: baseToneValues },
  },
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
