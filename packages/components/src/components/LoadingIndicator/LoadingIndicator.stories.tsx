import { Meta, StoryObj } from '@storybook/react'
import { View } from 'react-native'
import React from 'react'

import { Link } from '../Link/Link'
import { LoadingIndicator, LoadingIndicatorProps } from './LoadingIndicator'
import { Spacer } from '../Spacer/Spacer'
import { generateDocs } from '../../utils/storybook'

const meta: Meta<LoadingIndicatorProps> = {
  title: 'LoadingIndicator',
  component: LoadingIndicator,
  decorators: [
    (Story) => (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Story />
      </View>
    ),
  ],
  parameters: {
    docs: generateDocs({
      name: 'LoadingIndicator',
      docUrl:
        'https://department-of-veterans-affairs.github.io/va-mobile-app/docs/Flagship%20design%20library/Components/Alerts%20and%20Progress/LoadingComponent',
    }),
  },
}

export default meta

type Story = StoryObj<LoadingIndicatorProps>

const children = (
  <>
    <Link type="call" text="000-000-0000" phoneNumber="000-000-0000" />
    <Spacer />
    <Link type="call TTY" text="TTY: 711" TTYnumber="711" />
  </>
)

export const _WithText: Story = {
  name: 'With Text',
  args: {
    text: 'Loading your appointments...',
  },
}

export const __WithChildren: Story = {
  name: 'With Text and Children',
  args: {
    text: 'Loading your appointments. Call one of the numbers below for support.',
    children,
  },
}
