import { IconGallery, IconItem } from '@storybook/blocks'
import { Meta, StoryObj } from '@storybook/react'
import { ThemeProvider, ensure, themes } from '@storybook/theming'
import { View } from 'react-native'
import React from 'react'

import { Icon, IconProps } from './Icon'
import { IconMap } from './iconList'
import { generateDocs } from '../../utils/storybook'
import { useColorScheme } from '../../utils'
import CustomSVG from '../../assets/svgs/custom.svg'

const buildIconItems = () => {
  const iconItems = []
  const iconMapArray = Object.keys(IconMap)

  for (const icon of iconMapArray) {
    if (!icon) continue
    iconItems.push(
      <IconItem name={icon} >
        {/* @ts-ignore */}
        <Icon name={icon} />
      </IconItem>
    )
  }

  return iconItems
}

const iconGallery = (
  <IconGallery >
    {buildIconItems()}
  </IconGallery>
)

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
    docs: generateDocs({}),
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

export const ___IconGallery: Story = {
  name: 'Icon Gallery',
  render: () => {
    const colorScheme = useColorScheme()
    const isDarkMode = colorScheme === 'dark'

    const theme = ensure(isDarkMode ? themes.dark : themes.light)

    return(
      <ThemeProvider theme={theme} >
        {iconGallery}
      </ThemeProvider>
    )
  }
}
