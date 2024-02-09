import { Button, ButtonProps, ButtonVariants } from './Button'
import { Meta, StoryObj } from '@storybook/react'
import { View } from 'react-native'
import { generateDocs } from '../../utils/storybook'
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
        }}>
        <Story />
      </View>
    ),
  ],
}

export default meta

type Story = StoryObj<ButtonProps>

export const Primary: Story = {
  name: 'Primary',
  args: {
    label: 'Button text',
    a11yLabel: 'Alternate a11y text',
    a11yHint: 'A brief description of the result of pressing this Button',
  },
}

export const Secondary: Story = {
  name: 'Secondary',
  args: {
    buttonType: ButtonVariants.Secondary,
    label: 'Button text',
    a11yLabel: 'Alternate a11y text',
    a11yHint: 'A brief description of the result of pressing this Button',
  },
}

export const Base: Story = {
  name: 'Base Primary',
  args: {
    buttonType: ButtonVariants.Base,
    label: 'Button text',
    a11yLabel: 'Alternate a11y text',
    a11yHint: 'A brief description of the result of pressing this Button',
  },
}

export const BaseSecondary: Story = {
  name: 'Base Secondary',
  args: {
    buttonType: ButtonVariants.BaseSecondary,
    label: 'Button text',
    a11yLabel: 'Alternate a11y text',
    a11yHint: 'A brief description of the result of pressing this Button',
  },
}

export const Destructive: Story = {
  name: 'Destructive',
  args: {
    buttonType: ButtonVariants.Destructive,
    label: 'Button text',
    a11yLabel: 'Alternate a11y text',
    a11yHint: 'A brief description of the result of pressing this Button',
  },
}

export const White: Story = {
  name: 'White',
  args: {
    buttonType: ButtonVariants.White,
    label: 'Button text',
    a11yLabel: 'Alternate a11y text',
    a11yHint: 'A brief description of the result of pressing this Button',
  },
}
