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
    descriptionA11y,
    error,
    errorA11y,
    header,
    headerA11y,
    hint,
    hintA11y,
    indeterminate,
    label,
    labelA11y,
    required,
    tile,
  } = props

  const [checked, setChecked] = useState(false)

  return (
    <Checkbox
      checked={checked}
      description={description}
      descriptionA11y={descriptionA11y}
      error={error}
      errorA11y={errorA11y}
      header={header}
      headerA11y={headerA11y}
      hint={hint}
      hintA11y={hintA11y}
      indeterminate={indeterminate}
      label={label}
      labelA11y={labelA11y}
      onPress={() => setChecked(!checked)}
      required={required}
      tile={tile}
    />
  )
}

const header = 'Label Header',
  headerA11y = 'Accessibility override for header',
  hint = 'Hint text',
  hintA11y = 'Accessibility override for hint',
  error = 'Error text',
  errorA11y = 'Accessibility override for error',
  label = 'Label',
  labelA11y = 'Accessibility override for label',
  description = 'Checkbox description',
  descriptionA11y = 'Accessibility override for description'

export const _Default: Story = {
  render: statefulComponentRenderer,
  args: {
    header,
    headerA11y,
    hint,
    hintA11y,
    label,
    labelA11y,
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
    label,
    labelA11y,
    description,
    descriptionA11y,
  },
}

export const ___CheckboxOnly: Story = {
  render: statefulComponentRenderer,
  args: {
    label,
    labelA11y,
  },
}

export const ____Error: Story = {
  render: statefulComponentRenderer,
  args: {
    header,
    headerA11y,
    hint,
    hintA11y,
    error,
    errorA11y,
    label,
    labelA11y,
    description,
    descriptionA11y,
  },
}
