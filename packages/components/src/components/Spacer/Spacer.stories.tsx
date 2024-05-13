import { Meta, StoryObj } from '@storybook/react'
import { View, ViewStyle } from 'react-native'
import React from 'react'

import { Button } from '../Button/Button'
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
        <Button
          label="Button before Spacer"
          onPress={() => {
            null
          }}
        />
        <Story />
        <Button
          label="Button after Spacer"
          onPress={() => {
            null
          }}
        />
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
          onPress={() => {
            null
          }}
        />
      </View>
    ),
  ],
}
