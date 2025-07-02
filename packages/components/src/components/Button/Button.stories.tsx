import type { Meta, StoryObj } from '@storybook/react-native-web-vite'

import { Button, ButtonVariants } from './Button'
import { fn } from 'storybook/test'

const meta = {
  title: 'Button',
  component: Button,
  args: { onPress: fn() },
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    label: 'Button text',
    a11yLabel: 'Alternate a11y text',
    a11yHint: 'A brief description of the result of pressing this Button',
  },
}

export const __Secondary: Story = {
  args: {
    buttonType: ButtonVariants.Secondary,
    label: 'Button text',
    a11yLabel: 'Alternate a11y text',
    a11yHint: 'A brief description of the result of pressing this Button',
  },
}

export const ___Base: Story = {
  name: 'Base Primary',
  args: {
    buttonType: ButtonVariants.Base,
    label: 'Button text',
    a11yLabel: 'Alternate a11y text',
    a11yHint: 'A brief description of the result of pressing this Button',
  },
}

export const ____BaseSecondary: Story = {
  args: {
    buttonType: ButtonVariants.BaseSecondary,
    label: 'Button text',
    a11yLabel: 'Alternate a11y text',
    a11yHint: 'A brief description of the result of pressing this Button',
  },
}

export const _____Destructive: Story = {
  args: {
    buttonType: ButtonVariants.Destructive,
    label: 'Button text',
    a11yLabel: 'Alternate a11y text',
    a11yHint: 'A brief description of the result of pressing this Button',
  },
}
