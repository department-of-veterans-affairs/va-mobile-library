import { Meta, StoryObj } from '@storybook/react'
import { View } from 'react-native'
import React from 'react'

import { Button, ButtonVariants } from '../Button/Button'
import { Icon } from '../Icon/Icon'
import { Link } from '../Link/Link'
import { Spacer, SpacerProps } from './Spacer'

const meta: Meta<SpacerProps> = {
  title: 'Spacer',
  component: Spacer,
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
      <View style={{ alignItems: 'center', flexDirection: 'row' }}>
        <Icon name="Info" preventScaling />
        <Story />
        <Link
          text="Link text after Spacer"
          type="custom"
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
      <View style={{ alignItems: 'center', flexDirection: 'column' }}>
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
