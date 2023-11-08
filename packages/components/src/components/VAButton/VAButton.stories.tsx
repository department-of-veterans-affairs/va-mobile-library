import { ButtonTypesConstants, VAButton, VAButtonProps } from './VAButton'
import { Meta, StoryObj } from '@storybook/react-native'
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
  },
}

export const Secondary: Story = {
  storyName: 'Secondary',
  args: {
    buttonType: ButtonTypesConstants.buttonSecondary,

    label: 'Button text',
  },
}

export const Destructive: Story = {
  storyName: 'Destructive',
  args: {
    buttonType: ButtonTypesConstants.buttonDestructive,
    label: 'Button text',
  },
}

export const White: Story = {
  storyName: 'White',
  args: {
    buttonType: ButtonTypesConstants.buttonWhite,
    label: 'Button text',
  },
}
