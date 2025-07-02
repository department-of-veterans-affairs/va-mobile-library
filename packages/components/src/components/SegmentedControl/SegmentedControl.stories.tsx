import { Meta, StoryObj } from '@storybook/react-native-web-vite'
import React, { useState } from 'react'

import { SegmentedControl, SegmentedControlProps } from './SegmentedControl'

const meta = {
  title: 'Segmented control',
  component: SegmentedControl,
} satisfies Meta<typeof SegmentedControl>

export default meta

type Story = StoryObj<SegmentedControlProps>

const statefulComponentRenderer = (props: SegmentedControlProps) => {
  const { labels, a11yLabels, a11yHints } = props
  const [selectedSegment, setSelectedSegment] = useState(0)

  return (
    <SegmentedControl
      labels={labels}
      onChange={setSelectedSegment}
      selected={selectedSegment}
      a11yLabels={a11yLabels}
      a11yHints={a11yHints}
    />
  )
}

export const _2Segments: Story = {
  render: statefulComponentRenderer,
  args: {
    labels: ['Label 1', 'Label 2'],
    a11yLabels: ['Accessibility label override for label 1'],
    a11yHints: [
      'Accessibility hint for label 1',
      'Accessibility hint for label 2',
    ],
    testIDs: ['test-id-1', 'test-id-2'],
  },
}

export const _3Segments: Story = {
  render: statefulComponentRenderer,
  args: {
    labels: ['Label 1', 'Label 2', 'Label 3'],
  },
}

export const _4Segments: Story = {
  render: statefulComponentRenderer,
  args: {
    labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4'],
  },
}
