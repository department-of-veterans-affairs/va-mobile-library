import { Alert, AlertProps } from './Alert'
import { Link } from '../Link/Link'
import { Meta, StoryObj } from '@storybook/react'
import { Spacer } from '../Spacer/Spacer'
import { View } from 'react-native'
import React from 'react'

import { generateDocs } from '../../utils/storybook'

export default {
  title: 'Alert',
  component: Alert,
  parameters: {
    docs: generateDocs({
      name: 'Alert',
      docUrl:
        'https://department-of-veterans-affairs.github.io/va-mobile-app/design/Components/Buttons%20and%20links/Button',
      // code: (<Alert variant='info' />)
    }),
  },
  decorators: [
    // @ts-ignore
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

// export default meta

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

// export const Info = () => {
//   return(
//       <Alert variant='info' header='Header' description='Desc' />
//   )
// }

export const Info: Story = {
  // render: () => <Alert variant='info' />,
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
