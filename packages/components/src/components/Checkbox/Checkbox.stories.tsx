import { Meta, StoryObj } from '@storybook/react-native-web-vite'
import { useState } from 'react'

import { Checkbox } from './Checkbox'
import { CheckboxRadioProps } from '../../types'

const meta: Meta<CheckboxRadioProps> = {
  title: 'Checkbox',
  component: Checkbox,
}

export default meta

type Story = StoryObj<CheckboxRadioProps>

const statefulComponentRenderer = (props: CheckboxRadioProps) => {
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
