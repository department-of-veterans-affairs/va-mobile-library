import { Meta, StoryObj } from '@storybook/react'
import { View } from 'react-native'
import React, { useState } from 'react'

import { SegmentedControl, SegmentedControlProps } from './SegmentedControl'
import { generateDocs } from '../../utils/storybook'

const meta: Meta<SegmentedControlProps> = {
  title: 'SegmentedControl',
  component: SegmentedControl,
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
        url: 'https://www.figma.com/file/QVLPB3eOunmKrgQOuOt0SU/%F0%9F%93%90-DesignLibrary2.0---VAMobile?type=design&node-id=7332%3A11330&mode=design&t=IfpGfogEOoBtNhmN-1',
      },
      {
        name: 'Figma examples',
        type: 'figma',
        url: 'https://www.figma.com/file/QVLPB3eOunmKrgQOuOt0SU/%F0%9F%93%90-DesignLibrary2.0---VAMobile?type=design&node-id=7332%3A11331&mode=design&t=IfpGfogEOoBtNhmN-1',
      },
    ],
    docs: generateDocs({
      name: 'Segmented control',
      docUrl:
        'https://department-of-veterans-affairs.github.io/va-mobile-app/design/Components/Navigation/Secondary/SegmentedControl',
    }),
  },
}

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
