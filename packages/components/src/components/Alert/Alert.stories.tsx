import { Meta, StoryObj } from '@storybook/react-native-web-vite'

import { Alert, AlertProps } from './Alert'
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

/**
 * Circumvents Storybook's `Partial` typing of props causing TS errors due to scope narrowing
 * mutually exclusive props (expandable w/ header required vs non-expandable w/ header optional)
 */
type AlertSharedArgs = Omit<
  AlertProps,
  'expandable' | 'initializeExpanded' | 'dismissible'
>

const sharedArgs: AlertSharedArgs = {
  variant: 'info',
  header: 'Header',
  description: 'Description',
  children: children,
  analytics: {
    onExpand: () => console.log('expanded'),
    onCollapse: () => console.log('collapsed'),
    onDismiss: () => console.log('dismissed'),
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

export const ____Dismissible: Story = {
  args: {
    ...sharedArgs,
    dismissible: true,
  },
}

export const _____Expandable: Story = {
  args: {
    ...sharedArgs,
    expandable: true,
    initializeExpanded: false,
  },
}
