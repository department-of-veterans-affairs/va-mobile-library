import { Meta, StoryObj } from '@storybook/react'
import { View } from 'react-native'
import React, { useState } from 'react'

import { CheckboxGroup, CheckboxGroupProps } from './CheckboxGroup'
import { generateDocs } from '../../utils/storybook'

const meta: Meta<CheckboxGroupProps> = {
  title: 'Checkbox group',
  component: CheckboxGroup,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {Story()}
      </View>
    ),
  ],
  parameters: {
    design: [
      {
        name: 'Figma component overview',
        type: 'figma',
        url: 'https://www.figma.com/design/mAMh8vyVgsevAOungfvGN6/%5BNEW%5D-Checkbox---%23427?node-id=1509-5372&t=eTj3nXLA5XBywjl0-4',
      },
      {
        name: 'Figma examples',
        type: 'figma',
        url: 'https://www.figma.com/design/mAMh8vyVgsevAOungfvGN6/%5BNEW%5D-Checkbox---%23427?node-id=1509-5373&t=bI5ocY9b39t81dX4-4',
      },
    ],
    docs: generateDocs({
      name: 'Checkbox group',
      docUrl:
        'https://department-of-veterans-affairs.github.io/va-mobile-app/design/Components/Selection%20and%20Input/Checkbox/',
    }),
  },
}

export default meta

type Story = StoryObj<CheckboxGroupProps>

const statefulComponentRenderer = (props: CheckboxGroupProps) => {
  const {
    description,
    descriptionA11y,
    error,
    errorA11y,
    header,
    headerA11y,
    hint,
    hintA11y,
    required,
    tile,
  } = props

  const [selectedItems, setSelectedItems] = useState<(string | number)[]>([])

  const items = [
    {
      label: 'Option 1',
      labelA11y: 'Accessibility override for option 1',
      value: '1',
    },
    { label: 'Option 2' },
    { label: 'Option 3' },
    { label: 'Option 4' },
    { label: 'Option 5' },
    { label: 'Option 6' },
  ]

  return (
    <CheckboxGroup
      items={items}
      selectedItems={selectedItems}
      description={description}
      descriptionA11y={descriptionA11y}
      error={error}
      errorA11y={errorA11y}
      header={header}
      headerA11y={headerA11y}
      hint={hint}
      hintA11y={hintA11y}
      onSelectionChange={(selected) => setSelectedItems(selected)}
      required={required}
      tile={tile}
    />
  )
}

const header = 'Label Header',
  headerA11y = 'Accessibility override for header',
  hint = 'Hint about this checkbox group',
  hintA11y = 'Accessibility override for hint',
  error = 'Error text',
  errorA11y = 'Accessibility override for error',
  description = 'Checkbox description',
  descriptionA11y = 'Accessibility override for description'

export const _Default: Story = {
  render: statefulComponentRenderer,
  args: {
    header,
    headerA11y,
    hint,
    hintA11y,
    description,
    descriptionA11y,
    required: true,
  },
}

export const __Tile: Story = {
  render: statefulComponentRenderer,
  args: {
    tile: true,
    header,
    headerA11y,
    hint,
    hintA11y,
    description,
    descriptionA11y,
  },
}

export const ___Error: Story = {
  render: statefulComponentRenderer,
  args: {
    error,
    errorA11y,
    header,
    headerA11y,
    hint,
    hintA11y,
    description,
    descriptionA11y,
    required: true,
  },
}
