import { Alert, AlertProps } from './Alert'
import { Meta, StoryObj } from '@storybook/react'
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
  parameters: {
    design: [
      {
        name: 'Figma component overview',
        type: 'figma',
        url: 'https://www.figma.com/file/Zzt8z60hCtdEzXx2GFWghH/%F0%9F%93%90-Component-Library?type=design&node-id=224-548&mode=design&t=LVehKHpWhqSKrQMW-4',
      },
      {
        name: 'Figma examples',
        type: 'figma',
        url: 'https://www.figma.com/file/Zzt8z60hCtdEzXx2GFWghH/%F0%9F%93%90-Component-Library?type=design&node-id=224-532&mode=design&t=LVehKHpWhqSKrQMW-4',
      },
    ],
  },
}

export default meta

type Story = StoryObj<AlertProps>

export const Info: Story = {
  args: {
    variant: 'info',
    header: 'header blah blah blah',
    description: 'description blah blah blah description blah blah blah description blah blah blah'
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
