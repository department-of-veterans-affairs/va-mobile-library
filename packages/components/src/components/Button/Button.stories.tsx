import { Button, ButtonProps, ButtonVariants } from './Button'
import { Meta, StoryObj } from '@storybook/react-native'
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
  parameters: {
    docs: generateDocs({
      name: 'Button',
      docUrl:
        'https://department-of-veterans-affairs.github.io/va-mobile-app/design/Components/Buttons%20and%20links/Button',
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

export const _Primary: Story = {
  storyName: 'Primary',
  args: {
    label: 'Button text',
    a11yLabel: 'Alternate a11y text',
    a11yHint: 'A brief description of the result of performing this Button',
  },
}

export const __Secondary: Story = {
  storyName: 'Secondary',
  args: {
    buttonType: ButtonVariants.Secondary,
    label: 'Button text',
    a11yLabel: 'Alternate a11y text',
    a11yHint: 'A brief description of the result of performing this Button',
  },
}

export const ___Base: Story = {
  storyName: 'Base Primary',
  args: {
    buttonType: ButtonVariants.Base,
    label: 'Button text',
    a11yLabel: 'Alternate a11y text',
    a11yHint: 'A brief description of the result of performing this Button',
  },
}

export const ____BaseSecondary: Story = {
  storyName: 'Base Secondary',
  args: {
    buttonType: ButtonVariants.BaseSecondary,
    label: 'Button text',
    a11yLabel: 'Alternate a11y text',
    a11yHint: 'A brief description of the result of performing this Button',
  },
}

export const _____Destructive: Story = {
  storyName: 'Destructive',
  args: {
    buttonType: ButtonVariants.Destructive,
    label: 'Button text',
    a11yLabel: 'Alternate a11y text',
    a11yHint: 'A brief description of the result of performing this Button',
  },
}

export const ______White: Story = {
  storyName: 'White',
  args: {
    buttonType: ButtonVariants.White,
    label: 'Button text',
    a11yLabel: 'Alternate a11y text',
    a11yHint: 'A brief description of the result of performing this Button',
  },
}
