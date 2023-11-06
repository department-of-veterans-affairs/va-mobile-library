import { Meta, StoryObj } from '@storybook/react-native'
import { VAButton, VAButtonProps } from './VAButton'
import { View } from 'react-native'
import React from 'react'

const meta: Meta<VAButtonProps> = {
  title: 'VAButton',
  component: VAButton,
  argTypes: {
    onPress: {
      action: 'onPress event',
    },
  },

  decorators: [
    (Story) => (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Story />
      </View>
    ),
  ],
}

export default meta

type Story = StoryObj<VAButtonProps>

export const Primary: Story = {
  storyName: 'Primary',
  args: {
    text: 'Button text',
  },
}

export const Secondary: Story = {
  storyName: 'Secondary',
  args: {
    secondary: true,
    text: 'Button text',
  },
}

export const Destructive: Story = {
  storyName: 'Destructive',
  args: {
    destructive: true,
    text: 'Button text',
  },
}
