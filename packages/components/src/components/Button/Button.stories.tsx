import { Button, ButtonProps, ButtonVariants } from './Button'
import { Meta, StoryObj } from '@storybook/react-native'
import { View } from 'react-native'
import React from 'react'

const meta: Meta<ButtonProps> = {
  title: 'Button',
  component: Button,
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

type Story = StoryObj<ButtonProps>

export const Base: Story = {
  storyName: 'Base',
  args: {
    buttonType: ButtonVariants.Base,
    label: 'Button text',
  },
}

export const BaseSecondary: Story = {
  storyName: 'Base Secondary',
  args: {
    buttonType: ButtonVariants.BaseSecondary,
    label: 'Button text',
  },
}

export const Destructive: Story = {
  storyName: 'Destructive',
  args: {
    buttonType: ButtonVariants.Destructive,
    label: 'Button text',
  },
}

export const Primary: Story = {
  storyName: 'Primary',
  args: {
    label: 'Button text',
  },
}

export const Secondary: Story = {
  storyName: 'Secondary',
  args: {
    buttonType: ButtonVariants.Secondary,
    label: 'Button text',
  },
}

export const White: Story = {
  storyName: 'White',
  args: {
    buttonType: ButtonVariants.White,
    label: 'Button text',
  },
}
