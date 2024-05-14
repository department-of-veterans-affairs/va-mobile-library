import { Meta, StoryObj } from '@storybook/react'
import { View, ViewStyle } from 'react-native'
import React from 'react'

import { Button, ButtonVariants } from '../Button/Button'
import { Icon } from '../Icon/Icon'
import { Link } from '../Link/Link'
import { Spacer, SpacerProps } from './Spacer'

const centerProps: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
}

const meta: Meta<SpacerProps> = {
  title: 'Spacer',
  component: Spacer,
  decorators: [
    (Story) => (
      <View style={centerProps}>
        <Story />
      </View>
    ),
  ],
}

export default meta

type Story = StoryObj<SpacerProps>

const iconViewStyle: ViewStyle = {
  flexDirection: 'row',
  // Below keeps icon aligned with first row of text, centered, and scalable
  alignSelf: 'flex-start',
  minHeight: 30,
  alignItems: 'center',
  justifyContent: 'center',
}

export const Horizontal: Story = {
  name: 'Horizontal',
  args: {
    horizontal: true,
  },
  decorators: [
    (Story) => (
      <View
        style={{
          ...centerProps,
          flexDirection: 'row',
        }}>
        <View {...iconViewStyle} >
          <Icon name="Info" preventScaling />
        </View>
        <Story />
        <Link text='Link text after Spacer' type='custom' onPress={() => { null }} />
      </View>
    ),
  ],
}

export const Vertical: Story = {
  name: 'Vertical',
  decorators: [
    (Story) => (
      <View
        style={{
          ...centerProps,
          flexDirection: 'column',
        }}>
        <Button
          label="Button before Spacer"
          onPress={() => {
            null
          }}
        />
        <Story />
        <Button
          label="Button after Spacer"
          buttonType={ButtonVariants.Secondary}
          onPress={() => {
            null
          }}
        />
      </View>
    ),
  ],
}
