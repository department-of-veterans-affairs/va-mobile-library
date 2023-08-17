import React from 'react'
import { View } from 'react-native'
import { MyButton, MyButtonProps } from './Button'
import { Meta, StoryObj } from '@storybook/react-native'
import { DocLink } from '../../utils'

const meta: Meta<MyButtonProps> = {
  title: 'Button',
  component: MyButton,
  argTypes: {
    onPress: {
      action: 'onPress event',
    },
  },

  decorators: [
    (Story) => (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <DocLink url="google.com"/>
        <Story />
      </View>
    ),
  ],
}

export default meta

type Story = StoryObj<MyButtonProps>

export const Basic: Story = {
  storyName: 'Basic',
  args: {
    disabled: false,
    text: 'Tap me',
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/LKQ4FJ4bTnCSjedbRpk931/Sample-File',
    },
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    text: 'Disabled',
  },
}
