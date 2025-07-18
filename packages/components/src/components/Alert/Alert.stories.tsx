import { Meta, StoryObj } from '@storybook/react-native-web-vite'

import { Alert, AlertProps } from './Alert'
import { Link } from '../Link/Link'
import { Spacer } from '../Spacer/Spacer'

const meta: Meta<AlertProps> = {
  title: 'Alert',
  component: Alert,
}

export default meta

type Story = StoryObj<AlertProps>

const children = (
  <>
    <Link
      type="call"
      text="000-000-0000"
      phoneNumber="000-000-0000"
      variant="base"
    />
    <Spacer />
    <Link type="call TTY" text="TTY: 711" TTYnumber="711" variant="base" />
  </>
)

export const Info: Story = {
  args: {
    variant: 'info',
    header: 'Header',
    description: 'Description',
    children: children,
    analytics: {
      onExpand: () => console.log('expanded'),
      onCollapse: () => console.log('collapsed'),
    },
    primaryButton: {
      label: 'Button Text',
      onPress: () => console.log('primary press'),
    },
    secondaryButton: {
      label: 'Button Text',
      onPress: () => console.log('secondary press'),
    },
  },
}

export const _Success: Story = {
  args: {
    variant: 'success',
    header: 'Header',
    description: 'Description',
    children: children,
    analytics: {
      onExpand: () => console.log('expanded'),
      onCollapse: () => console.log('collapsed'),
    },
    primaryButton: {
      label: 'Button Text',
      onPress: () => console.log('primary press'),
    },
    secondaryButton: {
      label: 'Button Text',
      onPress: () => console.log('secondary press'),
    },
  },
}

export const __Warning: Story = {
  args: {
    variant: 'warning',
    header: 'Header',
    description: 'Description',
    children: children,
    analytics: {
      onExpand: () => console.log('expanded'),
      onCollapse: () => console.log('collapsed'),
    },
    primaryButton: {
      label: 'Button Text',
      onPress: () => console.log('primary press'),
    },
    secondaryButton: {
      label: 'Button Text',
      onPress: () => console.log('secondary press'),
    },
  },
}

export const ___Error: Story = {
  args: {
    variant: 'error',
    header: 'Header',
    description: 'Description',
    children: children,
    analytics: {
      onExpand: () => console.log('expanded'),
      onCollapse: () => console.log('collapsed'),
    },
    primaryButton: {
      label: 'Button Text',
      onPress: () => console.log('primary press'),
    },
    secondaryButton: {
      label: 'Button Text',
      onPress: () => console.log('secondary press'),
    },
  },
}
