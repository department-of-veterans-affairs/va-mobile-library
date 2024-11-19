import { IconGallery, IconItem } from '@storybook/blocks'
import { Meta, StoryObj } from '@storybook/react'
import { View } from 'react-native'
import React from 'react'

import { Icon, IconProps } from './Icon'
import { IconMap } from './iconList'
import { generateDocs } from '../../utils/storybook'
import CustomSVG from '../../assets/svgs/custom.svg'

/**
 * Function to create a gallery of all icons for documentation
 * @returns JSX Element containing grid displaying all icons
 */
const buildIconGallery = () => {
  const iconItems = []
  const iconMapArray = Object.keys(IconMap)

  for (const icon of iconMapArray) {
    iconItems.push(
      <IconItem name={icon} key={icon}>
        {/* @ts-ignore - Typed as string, but derived from IconMap names */}
        <Icon name={icon} />
      </IconItem>,
    )
  }

  return <IconGallery>{iconItems}</IconGallery>
}

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
    name: { options: ['none', ...Object.keys(IconMap)] },
  },
  parameters: {
    docs: generateDocs({
      name: 'Icon',
      docUrl:
        'https://department-of-veterans-affairs.github.io/va-mobile-app/design/Foundation/Icons/',
      icons: buildIconGallery(),
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
