import { Meta, StoryObj } from '@storybook/react-native-web-vite'
import { useState } from 'react'

import { CheckboxGroup, CheckboxGroupProps } from './CheckboxGroup'

const meta: Meta<CheckboxGroupProps> = {
  title: 'Checkbox group',
  component: CheckboxGroup,
}

export default meta

type Story = StoryObj<CheckboxGroupProps>

const statefulComponentRenderer = (props: CheckboxGroupProps) => {
  const { error, header, hint, items, required, tile } = props

  const [selectedItems, setSelectedItems] = useState<(string | number)[]>([])

  return (
    <CheckboxGroup
      items={items}
      selectedItems={selectedItems}
      error={error}
      header={header}
      hint={hint}
      onSelectionChange={(selected) => setSelectedItems(selected)}
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
