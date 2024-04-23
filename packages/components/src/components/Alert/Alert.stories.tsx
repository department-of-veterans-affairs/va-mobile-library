import { Alert, AlertProps } from './Alert'
import { Link } from '../Link/Link'
import { Meta, StoryObj } from '@storybook/react'
import { Spacer } from '../../utils/'
import { View } from 'react-native'
import React from 'react'

const meta: Meta<AlertProps> = {
  title: 'Alert',
  component: Alert,
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
    primaryButton: {
      label: 'Button Text',
      onPress: () => {
        null
      },
    },
    secondaryButton: {
      label: 'Button Text',
      onPress: () => {
        null
      },
    },
  },
}

export const Expandable: Story = {
  args: {
    variant: 'info',
    header: 'Header',
    description: 'Description',
    children: children,
    expandable: true,
    onExpand: () => console.log('expanded'),
    onCollapse: () => console.log('collapsed'),
    primaryButton: {
      label: 'Button Text',
      onPress: () => {
        console.log('primary button pressed')
      },
    },
    secondaryButton: {
      label: 'Button Text',
      onPress: () => {
        console.log('secondary button pressed')
      },
    },
  },
}
