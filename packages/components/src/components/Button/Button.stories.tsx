import { Button, ButtonProps, ButtonVariants } from './Button'
import { Meta, StoryObj } from '@storybook/react-native'
import { View } from 'react-native'
import { generateDocs } from '../../utils'
import React from 'react'

const meta: Meta<ButtonProps> = {
  title: 'Button',
  component: Button,
  argTypes: {
    onPress: {
      action: 'onPress event',
    },
  },
  parameters: {
    docs: generateDocs({
      name: 'Button',
      docUrl:
        'https://department-of-veterans-affairs.github.io/va-mobile-app/docs/Flagship%20design%20library/Components/Buttons%20and%20Links/VAButton/',
    }),
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
    a11yLabel: 'A11y label override',
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
