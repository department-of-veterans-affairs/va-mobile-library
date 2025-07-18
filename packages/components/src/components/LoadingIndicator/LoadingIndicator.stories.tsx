import { Meta, StoryObj } from '@storybook/react-native-web-vite'

import { Link } from '../Link/Link'
import { LoadingIndicator, LoadingIndicatorProps } from './LoadingIndicator'
import { Spacer } from '../Spacer/Spacer'

const meta: Meta<LoadingIndicatorProps> = {
  title: 'Loading indicator',
  component: LoadingIndicator,
}

export default meta

type Story = StoryObj<LoadingIndicatorProps>

const children = (
  <>
    <Link type="call" text="000-000-0000" phoneNumber="000-000-0000" />
    <Spacer />
    <Link type="call TTY" text="TTY: 711" TTYnumber="711" />
  </>
)

export const WithText: Story = {
  args: {
    text: 'Loading your appointments...',
  },
}

export const _WithChildren: Story = {
  name: 'With Text and Children',
  args: {
    text: 'Loading your appointments. Call one of the numbers below for support.',
    children,
  },
}
