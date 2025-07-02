import { Meta, StoryObj } from '@storybook/react-native-web-vite'
import React from 'react'

import { Text, TextProps, baseToneValues, bodyToneValues } from './Text'

const meta = {
  title: 'Text',
  component: Text,
  argTypes: {
    /** Conditionally show or hide props depending prop values */
    size: { if: { arg: 'variant', neq: 'display' } },
    bold: { if: { arg: 'variant', eq: 'body' } },
    tone: { control: 'radio', options: baseToneValues },
  },
} satisfies Meta<typeof Text>

export default meta

type Story = StoryObj<typeof meta>

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
    tone: 'default',
  },
  argTypes: {
    tone: { control: 'radio', options: bodyToneValues },
  },
}

const children = 'Lorem ipsum dolor sit amet.'

export const _Heading: Story = {
  args: {
    children,
    variant: 'heading',
    size: 'md',
    tone: 'default',
  },
}

export const __Display: Story = {
  args: {
    children,
    tone: 'default',
    variant: 'display',
  },
}
