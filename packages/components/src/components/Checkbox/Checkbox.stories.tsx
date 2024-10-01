import { Meta, StoryObj } from '@storybook/react'
import { View } from 'react-native'
import React, { useState } from 'react'

import { Checkbox, CheckboxProps } from './Checkbox'
import { generateDocs } from '../../utils/storybook'

const meta: Meta<CheckboxProps> = {
  title: 'Checkbox',
  component: Checkbox,
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
      name: 'Checkbox',
      docUrl:
        'https://department-of-veterans-affairs.github.io/va-mobile-app/design/Components/Selection%20and%20Input/Checkbox/',
    }),
  },
}

export default meta

type Story = StoryObj<CheckboxProps>

const statefulComponentRenderer = (props: CheckboxProps) => {
  const {
    description,
    error,
    header,
    hint,
    indeterminate,
    label,
    required,
    tile,
  } = props

  const [checked, setChecked] = useState(false)

  return (
    <Checkbox
      checked={checked}
      description={description}
      error={error}
      header={header}
      hint={hint}
      indeterminate={indeterminate}
      label={label}
      onPress={() => setChecked(!checked)}
      required={required}
      tile={tile}
    />
  )
}

const header = 'Header'
const hint = { text: 'Hint text', a11yLabel: 'Accessibility override for hint' }
const error = {
  text: 'Error text',
  a11yLabel: 'Accessibility override for error',
}
const label = { text: 'Label', a11yLabel: 'Accessibility override for label' }
const description = {
  text: 'Description',
  a11yLabel: 'Accessibility override for description',
}

export const _Default: Story = {
  render: statefulComponentRenderer,
  args: {
    header,
    hint,
    label,
    description,
    required: true,
  },
}

export const __Tile: Story = {
  render: statefulComponentRenderer,
  args: {
    tile: true,
    header,
    hint,
    label,
    description,
  },
}

export const ___CheckboxOnly: Story = {
  render: statefulComponentRenderer,
  args: {
    label,
  },
}

export const ____Error: Story = {
  render: statefulComponentRenderer,
  args: {
    header,
    hint,
    error,
    label,
    description,
  },
}
