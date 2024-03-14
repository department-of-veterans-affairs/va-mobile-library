import { Alert, AlertProps } from './Alert'
import { Link } from '../Link/Link'
import { Meta, StoryObj } from '@storybook/react'
import { Spacer } from '../../utils/'
import { View } from 'react-native'
import React from 'react'

const meta: Meta<AlertProps> = {
  title: 'Alert',
  component: Alert,
  // argTypes: {
  //   onPress: {
  //     action: 'onPress event',
  //   },
  // },
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
      <Link type='call' text='000-000-0000' phoneNumber='000-000-0000' />
      <Spacer />
      <Link type='call TTY' text='TTY: 711' TTYnumber='711' />
    </>
  )

export const Info: Story = {
  args: {
    variant: 'info',
    header: 'header blah blah blah',
    description:
      'description blah blah blah description blah blah blah description blah blah blah',
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

// export const __Secondary: Story = {
//   name: 'Secondary',
//   args: {
//     buttonType: ButtonVariants.Secondary,
//     label: 'Button text',
//     a11yLabel: 'Alternate a11y text',
//     a11yHint: 'A brief description of the result of pressing this Button',
//   },
// }

// export const ___Base: Story = {
//   name: 'Base Primary',
//   args: {
//     buttonType: ButtonVariants.Base,
//     label: 'Button text',
//     a11yLabel: 'Alternate a11y text',
//     a11yHint: 'A brief description of the result of pressing this Button',
//   },
// }

// export const ____BaseSecondary: Story = {
//   name: 'Base Secondary',
//   args: {
//     buttonType: ButtonVariants.BaseSecondary,
//     label: 'Button text',
//     a11yLabel: 'Alternate a11y text',
//     a11yHint: 'A brief description of the result of pressing this Button',
//   },
// }

// export const _____Destructive: Story = {
//   name: 'Destructive',
//   args: {
//     buttonType: ButtonVariants.Destructive,
//     label: 'Button text',
//     a11yLabel: 'Alternate a11y text',
//     a11yHint: 'A brief description of the result of pressing this Button',
//   },
// }

// export const ______White: Story = {
//   name: 'White',
//   args: {
//     buttonType: ButtonVariants.White,
//     label: 'Button text',
//     a11yLabel: 'Alternate a11y text',
//     a11yHint: 'A brief description of the result of pressing this Button',
//   },
// }
