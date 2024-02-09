import { Meta, StoryObj } from '@storybook/react'
import { View } from 'react-native'
import React from 'react'

import { Colors } from '@department-of-veterans-affairs/mobile-tokens'
import { Icon, IconProps } from './Icon'
import CustomSVG from '../../assets/svgs/custom.svg'

const meta: Meta<IconProps> = {
  title: 'Icon',
  component: Icon,
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

type Story = StoryObj<IconProps>

export const _Preloaded: Story = {
  name: 'Preloaded Icons',
  args: {
    width: 50,
    height: 50,
    fill: Colors.grayMedium,
    name: 'HomeUnselected',
  },
}
export const __Custom: Story = {
  name: 'Custom SVG',
  args: {
    width: 50,
    height: 50,
    fill: Colors.grayMedium,
    svg: CustomSVG,
  },
}
