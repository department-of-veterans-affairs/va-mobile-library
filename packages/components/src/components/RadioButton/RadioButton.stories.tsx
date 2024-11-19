import { Meta, StoryObj } from '@storybook/react'
import { View } from 'react-native'
import React, { useState } from 'react'

import { RadioButton, RadioButtonProps } from './RadioButton'
import { generateDocs } from '../../utils/storybook'

const meta: Meta<RadioButtonProps> = {
  title: 'Radio button',
  component: RadioButton,
  decorators: [
    (Story) => (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          margin: 8,
        }}>
        {Story()}
      </View>
    ),
  ],
  parameters: {
    docs: generateDocs({
      name: 'Radio button',
      docUrl:
        'https://department-of-veterans-affairs.github.io/va-mobile-app/design/Components/Selection%20and%20Input/RadioButton/',
    }),
  },
}

export default meta

type Story = StoryObj<RadioButtonProps>

const statefulComponentRenderer = (props: RadioButtonProps) => {
  const { error, header, hint, items, required, tile } = props

  const [selectedItem, setSelectedItem] = useState<string | number>()

  return (
    <RadioButton
      items={items}
      selectedItem={selectedItem}
      error={error}
      header={header}
      hint={hint}
      onSelectionChange={(selected) => setSelectedItem(selected)}
      required={required}
      tile={tile}
    />
  )
}

const items = [
  { text: 'Option 1', description: 'Description for option 1' },
  {
    text: 'Option 2',
    a11yLabel: 'Accessibility override for option 2',
    value: '2',
    description: {
      text: 'Description for option 2',
      a11yLabel: 'Accessibility override for description',
    },
  },
  { text: 'Option 3' },
  { text: 'Option 4' },
  { text: 'Option 5' },
  { text: 'Option 6' },
]

const simpleItems = ['Option 1', 'Option 2', 'Option 3', 'Option 4']

const header = 'Header'
const hint = { text: 'Hint text', a11yLabel: 'Accessibility override for hint' }
const error = { text: 'Error text' }

export const _Default: Story = {
  render: statefulComponentRenderer,
  args: {
    header,
    hint,
    items,
    required: true,
  },
}

export const __Tile: Story = {
  render: statefulComponentRenderer,
  args: {
    header,
    hint,
    items: simpleItems,
    tile: true,
  },
}

export const ___Error: Story = {
  render: statefulComponentRenderer,
  args: {
    error,
    header,
    hint,
    items,
    required: true,
  },
}
