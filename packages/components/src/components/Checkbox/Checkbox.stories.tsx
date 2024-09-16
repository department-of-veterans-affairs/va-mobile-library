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
        url: 'REPLACE',
      },
      {
        name: 'Figma examples',
        type: 'figma',
        url: 'REPLACE',
      },
    ],
    docs: generateDocs({
      name: 'Checkbox',
      docUrl: 'REPLACE',
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

const header = 'Label Header',
  hint = 'Hint text',
  error = 'Error text',
  label = 'Label',
  description = 'Checkbox description'

export const Default: Story = {
  render: statefulComponentRenderer,
  args: {
    header,
    hint,
    label,
    description,
    required: true,
  },
}

export const Error: Story = {
  render: statefulComponentRenderer,
  args: {
    header,
    hint,
    error,
    label,
    description,
  },
}

export const LabelOnly: Story = {
  render: statefulComponentRenderer,
  args: {
    label,
  },
}

export const Tile: Story = {
  render: statefulComponentRenderer,
  args: {
    tile: true,
    header,
    hint,
    label,
    description,
  },
}

export const TileCheckboxOnly: Story = {
  render: statefulComponentRenderer,
  args: {
    label,
    tile: true,
  },
}
