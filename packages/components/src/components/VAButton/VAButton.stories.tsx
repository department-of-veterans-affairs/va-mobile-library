import { Meta, StoryObj } from '@storybook/react-native'
import { VAButton, VAButtonProps, VAButtonVariants } from './VAButton'
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
    label: 'Button text',
    a11yHint: 'My hint',
  },
}

export const Secondary: Story = {
  storyName: 'Secondary',
  args: {
    buttonType: VAButtonVariants.Secondary,
    label: 'Button text',
  },
}

export const Destructive: Story = {
  storyName: 'Destructive',
  args: {
    buttonType: VAButtonVariants.Destructive,
    label: 'Button text',
  },
}
