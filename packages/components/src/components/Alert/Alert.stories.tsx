import { Meta, StoryObj } from '@storybook/react-native-web-vite'

import { Alert } from './Alert'
import { Link } from '../Link/Link'
import { Spacer } from '../Spacer/Spacer'

const meta: Meta<typeof Alert> = {
  title: 'Alert',
  component: Alert,
}

export default meta

type Story = StoryObj<typeof Alert>

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

const sharedArgs: Story['args'] = {
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
}

export const Info: Story = {
  args: {
    ...sharedArgs,
    variant: 'info',
  },
}

export const _Success: Story = {
  args: {
    ...sharedArgs,
    variant: 'success',
  },
}

export const __Warning: Story = {
  args: {
    ...sharedArgs,
    variant: 'warning',
  },
}

export const ___Error: Story = {
  args: {
    ...sharedArgs,
    variant: 'error',
  },
}

export const ____Expandable: Story = {
  args: {
    ...sharedArgs,
    variant: 'info',
    expandable: true,
    initializeExpanded: false,
  },
}
