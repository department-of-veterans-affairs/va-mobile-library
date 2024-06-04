import { Meta, StoryObj } from '@storybook/react'
import { View } from 'react-native'
import React from 'react'

import { LoadingIndicator, LoadingIndicatorProps } from './LoadingIndicator'
import { generateDocs } from '../../utils/storybook'

const meta: Meta<LoadingIndicatorProps> = {
  title: 'LoadingIndicator',
  component: LoadingIndicator,
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
    docs: generateDocs({}),
  },
}

export default meta

type Story = StoryObj<LoadingIndicatorProps>

export const _WithText: Story = {
  name: 'With Text',
  args: {
    text: 'Loading your appointments...',
  },
}
export const __WithoutText: Story = {
  name: 'Without Text',
}
