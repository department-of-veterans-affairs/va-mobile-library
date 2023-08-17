import React, { useState } from 'react'
import { View } from 'react-native'
import { Meta, StoryObj } from '@storybook/react-native'

import { SegmentedControl, SegmentedControlProps } from './SegmentedControl'

const meta: Meta<SegmentedControlProps> = {
  title: 'Segmented control',
  component: SegmentedControl,
  argTypes: {
    // labels: [],
    onChange: {
      action: 'onPress event',
    },
  },

  decorators: [
    (Story) => (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Story />
      </View>
    ),
  ],
}

export default meta

type Story = StoryObj<SegmentedControlProps>

const twoSegmentsLabels = ['Inbox (3)', "Folders"]
const [selectedSegment, setSelectedSegment] = useState(twoSegmentsLabels[0])

export const Basic: Story = {
  storyName: 'Two Segments',
  args: {
    labels: twoSegmentsLabels,
    onChange: setSelectedSegment,
    selected: twoSegmentsLabels.indexOf(selectedSegment)
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/QVLPB3eOunmKrgQOuOt0SU/%F0%9F%93%90-DesignLibrary2.0---VAMobile?type=design&node-id=7327%3A3032&mode=design&t=F0hXXm33PlK48vBm-1',
    },
  },
}

// export const Disabled: Story = {
//   args: {
//     disabled: true,
//     text: 'Disabled',
//   },
// }
