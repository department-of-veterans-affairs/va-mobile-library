import { Meta, StoryObj } from '@storybook/react'
import { View } from 'react-native'
import React from 'react'

import { Icon, IconProps } from './Icon'
import { IconMap } from '.'
import { generateDocs } from '../../utils/storybook'
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
  argTypes: {
    name: { options: Object.keys(IconMap) },
  },
  parameters: {
    docs: generateDocs({})
  }
}

export default meta

type Story = StoryObj<IconProps>

export const _Preloaded: Story = {
  name: 'Preloaded Icons',
  args: {
    width: 50,
    height: 50,
    name: 'HomeOutline',
  },
}
export const __Custom: Story = {
  name: 'Custom SVG',
  args: {
    width: 50,
    height: 50,
    fill: 'base',
    svg: CustomSVG,
  },
}
