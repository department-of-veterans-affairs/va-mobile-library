import { Meta, StoryObj } from '@storybook/react-native'
import { View } from 'react-native'
import React, { useState } from 'react'

import { SegmentedControl, SegmentedControlProps } from './SegmentedControl'
import { generateDocs } from '../../utils'

const meta: Meta<SegmentedControlProps> = {
  title: 'Segmented control',
  component: SegmentedControl,
  parameters: {
    docs: generateDocs({
      name: 'Segmented control',
      docUrl:
        'https://department-of-veterans-affairs.github.io/va-mobile-app/design/Components/Navigation/Secondary/SegmentedControl',
    }),
  },
  decorators: [
    (Story) => (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {Story()}
      </View>
    ),
  ],
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

export const twoSegments: Story = {
  render: statefulComponentRenderer,
  args: {
    labels: ['Inbox (3)', 'Folders'],
    a11yLabels: ['Inbox'],
    a11yHints: [
      'You have 3 unread messages. Review messages in your inbox',
      'Review your folders',
    ],
    testIDs: ['test-id-1', 'test-id-2'],
  },
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
  },
}
