import { Meta, StoryObj } from '@storybook/react-native-web-vite'
import { Platform } from 'react-native'

import { Icon, IconProps } from './Icon'
import { IconMap } from './iconList'
import CustomSVG from '../../assets/svgs/custom.svg'

// Storybook 9 chokes on importing @storybook/addon-docs/blocks IconGallery/IconItem in mobile so limits to web
let genDocs
if (Platform.OS === 'web') {
  genDocs = require('../../utils/storybook') // eslint-disable-line
} else {
  genDocs = () => {}
}

const meta: Meta<IconProps> = {
  title: 'Icon',
  component: Icon,
  argTypes: {
    name: {
      control:
        Platform.OS === 'web'
          ? { type: 'select', search: true }
          : { type: 'radio' },
      options: ['none', ...Object.keys(IconMap)],
    },
  },
  parameters: {
    docs: genDocs({
      icons: IconMap,
    }),
  },
}

export default meta

type Story = StoryObj<IconProps>

export const _Preloaded: Story = {
  name: 'Preloaded Icons',
  args: {
    width: 50,
    height: 50,
    name: 'HomeOutlined',
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
